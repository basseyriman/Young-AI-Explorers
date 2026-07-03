import { createClient } from '@/utils/supabase/server'
import type { CurriculumSettings, CustomTopic, TopicId } from '@/data/curriculum'
import { DEFAULT_CURRICULUM, BOOK_LESSONS } from '@/data/curriculum'
import { ALL_COUNTRIES, mergeCountryLists } from '@/data/countries'
import type { CustomTopicRow } from '@/lib/custom-topic-content'
import { generateTopicContent } from '@/lib/vision-vee/generate-topic-content'
import { generateTopicIllustration } from '@/lib/vision-vee/generate-topic-illustration'
import type { DashboardRole } from '@/lib/auth/dashboard-access'

export interface CountryRow {
  code: string
  name: string
  flag_emoji: string
  is_featured: boolean
  explorer_count?: number
}

export interface TrendingRow {
  country_code: string
  topic_id: string
  topic_title: string
  explorers: number
  sample_idea: string | null
}

export interface ProfileRow {
  id: string
  role: string
  full_name: string | null
  nickname: string | null
  email: string | null
  country_code: string | null
  sharing_level: string
  allow_match_quiz: boolean
  parent_consent_at: string | null
  parent_email: string | null
  birth_year: number | null
}

export interface LinkedChildRow {
  child_id: string
  full_name: string | null
  nickname: string | null
  email: string | null
}

export interface PendingCustomTopicRow {
  id: string
  user_id: string
  title: string
  description: string | null
  created_by: string
  created_at: string
  child_name: string | null
  content_status: string | null
  badge_name: string | null
  lesson_content: { introduction?: string; main_lesson?: string; fun_facts?: string[] } | null
  quiz_content: { question: string; options: string[]; answer: string }[] | null
}

export async function getCountries(): Promise<CountryRow[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('country_explorer_counts')
    .select('code, name, flag_emoji, is_featured, explorer_count')
    .order('is_featured', { ascending: false })
    .order('explorer_count', { ascending: false })
    .order('name')

  if (!error && data?.length) {
    return mergeCountryLists(data as CountryRow[])
  }

  const { data: fallback } = await supabase
    .from('countries')
    .select('code, name, flag_emoji, is_featured')
    .order('is_featured', { ascending: false })
    .order('name')

  const rows = (fallback ?? []).map((c) => ({ ...c, explorer_count: 0 }))
  return mergeCountryLists(rows.length ? rows : ALL_COUNTRIES.map((c) => ({ ...c, explorer_count: 0 })))
}

export async function getCountryTrending(countryCode: string, limit = 5): Promise<TrendingRow[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('country_trending_topics')
    .select('*')
    .eq('country_code', countryCode)
    .limit(limit)

  if (error || !data?.length) return []
  return data as TrendingRow[]
}

/** Only include activity from users who opted into region/global sharing. */
export async function shouldRecordPublicActivity(userId: string): Promise<boolean> {
  const profile = await getProfile(userId)
  const sharing = profile?.sharing_level ?? 'region'
  return sharing === 'region' || sharing === 'global'
}

export async function getLinkedChildren(parentId: string): Promise<LinkedChildRow[]> {
  const supabase = await createClient()
  const { data: links } = await supabase
    .from('family_links')
    .select('child_id')
    .eq('parent_id', parentId)

  if (!links?.length) return []

  const childIds = links.map((l) => l.child_id)
  const { data: profiles } = await supabase
    .from('profiles')
    .select('id, full_name, nickname, email')
    .in('id', childIds)

  const profileById = new Map((profiles ?? []).map((p) => [p.id, p]))

  return childIds.map((child_id) => {
    const p = profileById.get(child_id)
    return {
      child_id,
      full_name: p?.full_name ?? null,
      nickname: p?.nickname ?? null,
      email: p?.email ?? null,
    }
  })
}

export async function parentCanManageChild(parentId: string, childId: string): Promise<boolean> {
  const supabase = await createClient()
  const { data: link } = await supabase
    .from('family_links')
    .select('id')
    .eq('parent_id', parentId)
    .eq('child_id', childId)
    .maybeSingle()
  if (link) return true

  const { data: settings } = await supabase
    .from('curriculum_settings')
    .select('managed_by')
    .eq('user_id', childId)
    .maybeSingle()
  return settings?.managed_by === parentId
}

export async function syncCurriculumToChild(
  parentId: string,
  childId: string,
  settings: CurriculumSettings
) {
  const supabase = await createClient()

  await supabase.from('profiles').update({
    country_code: settings.countryCode,
    sharing_level: settings.sharingLevel,
    allow_match_quiz: settings.allowMatchQuiz,
    updated_at: new Date().toISOString(),
  }).eq('id', childId)

  await supabase.from('curriculum_settings').upsert({
    user_id: childId,
    disabled_topic_ids: settings.disabledTopics,
    allow_match_quiz: settings.allowMatchQuiz,
    sharing_level: settings.sharingLevel,
    managed_by: parentId,
    updated_at: new Date().toISOString(),
  })
}

export async function syncCurriculumToLinkedChildren(parentId: string, settings: CurriculumSettings) {
  const children = await getLinkedChildren(parentId)
  for (const child of children) {
    await syncCurriculumToChild(parentId, child.child_id, settings)
  }
}

/** Link parent ↔ student when student.parent_email matches parent account email. */
export async function syncFamilyLinksByEmail(userId: string): Promise<void> {
  const supabase = await createClient()
  const { error } = await supabase.rpc('sync_family_links_for_user', { p_user_id: userId })
  if (!error) return

  const admin = (await import('@/utils/supabase/admin')).createAdminClient()
  if (!admin) return

  const { data: profile } = await admin
    .from('profiles')
    .select('role, email, parent_email')
    .eq('id', userId)
    .maybeSingle()
  if (!profile) return

  if (profile.role === 'student' && profile.parent_email?.trim()) {
    const parentEmail = profile.parent_email.trim().toLowerCase()
    const { data: parents } = await admin
      .from('profiles')
      .select('id')
      .in('role', ['parent', 'admin'])
      .ilike('email', parentEmail)
    for (const parent of parents ?? []) {
      await admin.from('family_links').upsert(
        { parent_id: parent.id, child_id: userId },
        { onConflict: 'parent_id,child_id', ignoreDuplicates: true }
      )
    }
    return
  }

  if ((profile.role === 'parent' || profile.role === 'admin') && profile.email?.trim()) {
    const parentEmail = profile.email.trim().toLowerCase()
    const { data: students } = await admin
      .from('profiles')
      .select('id, parent_email')
      .eq('role', 'student')
    for (const student of students ?? []) {
      if (student.parent_email?.trim().toLowerCase() === parentEmail) {
        await admin.from('family_links').upsert(
          { parent_id: userId, child_id: student.id },
          { onConflict: 'parent_id,child_id', ignoreDuplicates: true }
        )
      }
    }
  }
}

export async function getPendingCustomTopicsForParent(parentId: string): Promise<PendingCustomTopicRow[]> {
  const supabase = await createClient()
  const children = await getLinkedChildren(parentId)
  const childIds = children.map((c) => c.child_id)
  if (!childIds.length) return []

  const { data } = await supabase
    .from('custom_topics')
    .select('id, user_id, title, description, created_by, created_at, content_status, badge_name, lesson_content, quiz_content')
    .in('user_id', childIds)
    .eq('is_approved', false)
    .order('created_at', { ascending: false })

  const nameById = new Map(children.map((c) => [c.child_id, c.nickname ?? c.full_name ?? 'Explorer']))
  return (data ?? []).map((t) => ({
    ...t,
    child_name: nameById.get(t.user_id) ?? null,
  })) as PendingCustomTopicRow[]
}

function mapCustomTopicRow(t: {
  id: string
  title: string
  description: string | null
  created_by: string
  created_at: string
  world_id?: string | null
  content_status?: string | null
  badge_name?: string | null
  illustration_url?: string | null
}): CustomTopic {
  return {
    id: t.id,
    title: t.title,
    description: t.description ?? '',
    createdBy: t.created_by as CustomTopic['createdBy'],
    createdAt: t.created_at,
    worldId: t.world_id ?? undefined,
    contentStatus: (t.content_status as CustomTopic['contentStatus']) ?? undefined,
    badgeName: t.badge_name ?? undefined,
    illustrationUrl: t.illustration_url ?? undefined,
  }
}

export async function getApprovedCustomTopicsForLinkedChildren(parentId: string): Promise<CustomTopic[]> {
  const supabase = await createClient()
  const children = await getLinkedChildren(parentId)
  const childIds = children.map((c) => c.child_id)
  if (!childIds.length) return []

  const { data } = await supabase
    .from('custom_topics')
    .select('id, title, description, created_by, created_at, world_id, content_status, badge_name, illustration_url')
    .in('user_id', childIds)
    .eq('is_approved', true)
    .order('created_at', { ascending: false })

  return (data ?? []).map(mapCustomTopicRow)
}

export async function getCustomTopicForViewer(
  topicId: string,
  viewerId: string,
  role: DashboardRole,
  options?: { requireApproved?: boolean }
): Promise<CustomTopicRow | null> {
  const requireApproved = options?.requireApproved ?? true
  const supabase = await createClient()

  let query = supabase.from('custom_topics').select('*').eq('id', topicId)
  if (requireApproved) {
    query = query.eq('is_approved', true)
  }
  const { data: topic } = await query.maybeSingle()

  const authorize = async (row: CustomTopicRow): Promise<CustomTopicRow | null> => {
    if (role === 'student') {
      return row.user_id === viewerId ? row : null
    }
    if (role === 'parent') {
      if (row.user_id === viewerId) return row
      return (await parentCanManageChild(viewerId, row.user_id)) ? row : null
    }
    if (role === 'teacher' || role === 'admin') {
      return row
    }
    return null
  }

  if (topic) {
    return authorize(topic as CustomTopicRow)
  }

  const admin = (await import('@/utils/supabase/admin')).createAdminClient()
  if (!admin || (role !== 'parent' && role !== 'admin')) return null

  let adminQuery = admin.from('custom_topics').select('*').eq('id', topicId)
  if (requireApproved) {
    adminQuery = adminQuery.eq('is_approved', true)
  }
  const { data: adminTopic } = await adminQuery.maybeSingle()
  if (!adminTopic) return null

  return authorize(adminTopic as CustomTopicRow)
}

export async function getProfile(userId: string): Promise<ProfileRow | null> {
  const supabase = await createClient()
  const { data } = await supabase.from('profiles').select('*').eq('id', userId).single()
  return data as ProfileRow | null
}

export async function getCurriculumFromDb(userId: string): Promise<CurriculumSettings> {
  const supabase = await createClient()
  const profile = await getProfile(userId)

  const { data: settings } = await supabase
    .from('curriculum_settings')
    .select('*')
    .eq('user_id', userId)
    .single()

  // 1. Fetch classrooms student is enrolled in
  const { data: enrollments } = await supabase
    .from('classroom_students')
    .select('classroom_id')
    .eq('student_id', userId)

  const teacherIds: string[] = []
  if (enrollments && enrollments.length > 0) {
    const classIds = enrollments.map((e) => e.classroom_id)
    const { data: classes } = await supabase
      .from('classrooms')
      .select('teacher_id')
      .in('id', classIds)
    if (classes) {
      classes.forEach((c) => {
        if (c.teacher_id) teacherIds.push(c.teacher_id)
      })
    }
  }

  // 2. Query custom topics belonging to student OR their teachers
  let customTopicsQuery = supabase
    .from('custom_topics')
    .select('*')
    .eq('is_approved', true)

  if (teacherIds.length > 0) {
    customTopicsQuery = customTopicsQuery.or(`user_id.eq.${userId},user_id.in.(${teacherIds.join(',')})`)
  } else {
    customTopicsQuery = customTopicsQuery.eq('user_id', userId)
  }

  const { data: customTopics } = await customTopicsQuery.order('created_at', { ascending: false })

  return {
    region: profile?.country_code ?? 'GB',
    countryCode: profile?.country_code ?? 'GB',
    disabledTopics: (settings?.disabled_topic_ids as TopicId[]) ?? [],
    customTopics: (customTopics ?? []).map((t) => ({
      id: t.id,
      title: t.title,
      description: t.description ?? '',
      createdBy: t.created_by as CustomTopic['createdBy'],
      createdAt: t.created_at,
      worldId: t.world_id ?? undefined,
      contentStatus: t.content_status ?? undefined,
      badgeName: t.badge_name ?? undefined,
      illustrationUrl: t.illustration_url ?? undefined,
    })),
    sharingLevel: (settings?.sharing_level ?? profile?.sharing_level ?? 'region') as CurriculumSettings['sharingLevel'],
    allowMatchQuiz: settings?.allow_match_quiz ?? profile?.allow_match_quiz ?? true,
  }
}

export async function saveCurriculumToDb(userId: string, settings: CurriculumSettings, managedBy?: string) {
  const supabase = await createClient()

  await supabase.from('profiles').update({
    country_code: settings.countryCode,
    sharing_level: settings.sharingLevel,
    allow_match_quiz: settings.allowMatchQuiz,
    updated_at: new Date().toISOString(),
  }).eq('id', userId)

  await supabase.from('curriculum_settings').upsert({
    user_id: userId,
    disabled_topic_ids: settings.disabledTopics,
    allow_match_quiz: settings.allowMatchQuiz,
    sharing_level: settings.sharingLevel,
    managed_by: managedBy ?? null,
    updated_at: new Date().toISOString(),
  })

  return { success: true }
}

export async function profileExists(userId: string): Promise<boolean> {
  const supabase = await createClient()
  const { data } = await supabase.from('profiles').select('id').eq('id', userId).maybeSingle()
  return !!data
}

/** Create profiles + curriculum_settings for the signed-in user if missing (legacy accounts). */
export async function ensureOwnProfile(): Promise<{ ok: true } | { error: string }> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  if (await profileExists(user.id)) return { ok: true }

  const meta = user.user_metadata ?? {}
  const role = (meta.role as string) ?? 'student'
  const { error: profileErr } = await supabase.from('profiles').upsert({
    id: user.id,
    email: user.email ?? null,
    full_name: (meta.full_name as string) ?? '',
    role,
    country_code: (meta.country_code as string) ?? 'GB',
    nickname: (meta.nickname as string) ?? 'Explorer',
    sharing_level: role === 'student' ? 'private' : 'region',
    allow_match_quiz: role !== 'student',
  })

  if (profileErr) return { error: profileErr.message }

  await supabase.from('curriculum_settings').upsert({
    user_id: user.id,
    sharing_level: role === 'student' ? 'private' : 'region',
    allow_match_quiz: role !== 'student',
  })

  await syncFamilyLinksByEmail(user.id)

  return { ok: true }
}

export type ResolveOwnerResult = { ownerId: string } | { error: string }

export async function resolveCustomTopicOwnerId(actorId: string, role: string): Promise<ResolveOwnerResult> {
  if (role === 'parent') {
    const children = await getLinkedChildren(actorId)
    if (children.length > 0) {
      return { ownerId: children[0].child_id }
    }
    if (!(await profileExists(actorId))) {
      return { error: 'Your account profile is not set up yet. Sign out and sign in again, then link your child in the Parent Dashboard.' }
    }
    return {
      error: 'Link your child\'s account in the Parent Dashboard before adding custom topics — topics are saved to your explorer\'s journey.',
    }
  }

  if (!(await profileExists(actorId))) {
    const ensured = await ensureOwnProfile()
    if ('error' in ensured) return ensured
    if (!(await profileExists(actorId))) {
      return { error: 'Your learning profile is not set up yet. Sign out and sign in again to continue.' }
    }
  }

  return { ownerId: actorId }
}

export async function getCustomTopicById(topicId: string, userId: string): Promise<CustomTopicRow | null> {
  return getCustomTopicForViewer(topicId, userId, 'student', { requireApproved: true })
}

export async function generateCustomTopicContent(topicId: string): Promise<{ error?: string }> {
  const supabase = await createClient()
  const { data: topic } = await supabase.from('custom_topics').select('*').eq('id', topicId).single()
  if (!topic) return { error: 'Topic not found' }

  await supabase.from('custom_topics').update({ content_status: 'generating' }).eq('id', topicId)

  // Query user's preferred language
  const { data: profile } = await supabase
    .from('profiles')
    .select('preferred_language')
    .eq('id', topic.user_id)
    .single()

  const locale = profile?.preferred_language ?? 'en'

  const generated = await generateTopicContent(topic.title, topic.description ?? topic.title, locale)

  const illustration = await generateTopicIllustration(
    topicId,
    topic.title,
    topic.description ?? topic.title,
    generated.lesson.introduction
  )

  const payload = {
    lesson_content: generated.lesson,
    quiz_content: generated.quiz,
    badge_name: generated.badgeName,
    illustration_url: illustration.illustrationUrl,
    illustration_prompt: illustration.illustrationPrompt,
    content_status: 'ready' as const,
    generated_at: new Date().toISOString(),
  }

  const { error } = await supabase.from('custom_topics').update(payload).eq('id', topicId)

  if (error) {
    const admin = (await import('@/utils/supabase/admin')).createAdminClient()
    if (admin) {
      const { error: adminErr } = await admin.from('custom_topics').update(payload).eq('id', topicId)
      if (!adminErr) return {}
    }
    await supabase.from('custom_topics').update({ content_status: 'failed' }).eq('id', topicId)
    return { error: error.message }
  }

  return {}
}

export async function addCustomTopicToDb(
  userId: string,
  topic: { title: string; description: string; createdBy: 'parent' | 'vision_vee' | 'student' },
  options?: { isApproved?: boolean; generateContent?: boolean }
) {
  const supabase = await createClient()
  const isApproved = options?.isApproved ?? topic.createdBy === 'parent'
  const { data, error } = await supabase.from('custom_topics').insert({
    user_id: userId,
    title: topic.title,
    description: topic.description,
    created_by: topic.createdBy,
    is_approved: isApproved,
    content_status: 'pending',
  }).select().single()

  if (error) return { error: error.message }

  const shouldGenerate = options?.generateContent !== false
  if (shouldGenerate && data?.id) {
    await generateCustomTopicContent(data.id)
  }

  return { success: true, topic: data }
}

export async function regenerateCustomTopicContent(parentId: string, topicId: string) {
  const supabase = await createClient()
  const { data: topic } = await supabase
    .from('custom_topics')
    .select('user_id')
    .eq('id', topicId)
    .single()

  if (!topic) return { error: 'Topic not found' }
  if (!(await parentCanManageChild(parentId, topic.user_id))) {
    return { error: 'Not authorized to regenerate this topic' }
  }

  return generateCustomTopicContent(topicId)
}

export async function approveCustomTopic(parentId: string, topicId: string) {
  const supabase = await createClient()
  const { data: topic } = await supabase
    .from('custom_topics')
    .select('user_id')
    .eq('id', topicId)
    .single()

  if (!topic) return { error: 'Topic not found' }
  if (!(await parentCanManageChild(parentId, topic.user_id))) {
    return { error: 'Not authorized to approve this topic' }
  }

  const { error } = await supabase.from('custom_topics').update({ is_approved: true }).eq('id', topicId)
  if (error) return { error: error.message }

  const { data: fullTopic } = await supabase.from('custom_topics').select('content_status').eq('id', topicId).single()
  if (fullTopic?.content_status !== 'ready') {
    await generateCustomTopicContent(topicId)
  }

  return { success: true }
}

export async function rejectCustomTopic(parentId: string, topicId: string) {
  const supabase = await createClient()
  const { data: topic } = await supabase
    .from('custom_topics')
    .select('user_id')
    .eq('id', topicId)
    .single()

  if (!topic) return { error: 'Topic not found' }
  if (!(await parentCanManageChild(parentId, topic.user_id))) {
    return { error: 'Not authorized to reject this topic' }
  }

  const { error } = await supabase.from('custom_topics').delete().eq('id', topicId)
  if (error) return { error: error.message }
  return { success: true }
}

export async function removeCustomTopicFromDb(userId: string, topicId: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('custom_topics').delete().eq('id', topicId).eq('user_id', userId)
  if (error) return { error: error.message }
  return { success: true }
}

export async function getUserBadges(userId: string): Promise<(string | number)[]> {
  const supabase = await createClient()
  const { data } = await supabase.from('user_badges').select('topic_id').eq('user_id', userId)
  if (!data?.length) return []
  return data.map((b) => {
    const id = b.topic_id
    if (id === 'intro') return 'intro'
    const num = parseInt(id, 10)
    return isNaN(num) ? id : num
  })
}

export async function saveBadgeToDb(userId: string, topicId: string | number) {
  const supabase = await createClient()
  const topicKey = String(topicId)
  let title = BOOK_LESSONS.find((l) => String(l.id) === topicKey)?.title ?? topicKey

  if (topicKey.includes('-')) {
    const { data: custom } = await supabase
      .from('custom_topics')
      .select('title')
      .eq('id', topicKey)
      .maybeSingle()
    if (custom?.title) title = custom.title
  }

  await supabase.from('user_badges').upsert({
    user_id: userId,
    topic_id: topicKey,
    awarded_at: new Date().toISOString(),
  })

  await supabase.from('user_progress').upsert({
    user_id: userId,
    topic_id: topicKey,
    status: 'completed',
    completed_at: new Date().toISOString(),
  })

  const profile = await getProfile(userId)
  const sharing = profile?.sharing_level ?? 'region'
  const canSharePublicly = sharing === 'region' || sharing === 'global'

  if (canSharePublicly && profile?.country_code) {
    await supabase.from('topic_activity').upsert(
      { country_code: profile.country_code, topic_id: topicKey, topic_title: title, activity_count: 1, last_active: new Date().toISOString() },
      { onConflict: 'country_code,topic_id', ignoreDuplicates: false }
    )
  }
}

export async function markTopicStarted(userId: string, topicId: string | number) {
  const supabase = await createClient()
  const topicKey = String(topicId)

  // Check if already completed to avoid overriding progress
  const { data: existing } = await supabase
    .from('user_progress')
    .select('status')
    .eq('user_id', userId)
    .eq('topic_id', topicKey)
    .maybeSingle()

  if (existing?.status === 'completed') {
    return
  }

  await supabase.from('user_progress').upsert({
    user_id: userId,
    topic_id: topicKey,
    status: 'in_progress',
    completed_at: null
  })
}

export async function postCommunityIdea(
  userId: string,
  countryCode: string,
  topicTitle: string,
  ideaText: string,
  nickname: string
) {
  const supabase = await createClient()
  const profile = await getProfile(userId)
  const sharing = profile?.sharing_level ?? 'region'

  if (sharing === 'private') {
    return { error: 'Community sharing is disabled. Set sharing to Region or Global in your Parent Dashboard to share ideas.' }
  }

  const { error } = await supabase.from('community_ideas').insert({
    user_id: userId,
    country_code: countryCode,
    topic_title: topicTitle,
    idea_text: ideaText,
    nickname,
    is_public: true,
  })
  if (error) return { error: error.message }
  return { success: true }
}

export async function joinMatchQueue(userId: string, countryCode: string, nickname: string, topicId?: string) {
  const supabase = await createClient()
  await supabase.from('match_quiz_queue').delete().eq('user_id', userId)
  const { error } = await supabase.from('match_quiz_queue').insert({
    user_id: userId,
    country_code: countryCode,
    nickname,
    topic_id: topicId,
  })
  if (error) return { error: error.message }

  const { data: waiting } = await supabase
    .from('match_quiz_queue')
    .select('*')
    .eq('country_code', countryCode)
    .neq('user_id', userId)
    .order('joined_at', { ascending: true })
    .limit(1)
    .maybeSingle()

  if (waiting) {
    const topic = topicId ?? waiting.topic_id ?? '11'
    const { data: session, error: sessionErr } = await supabase.from('match_quiz_sessions').insert({
      player_a: userId,
      player_b: waiting.user_id,
      country_code: countryCode,
      topic_id: topic,
      status: 'active',
    }).select().single()

    await supabase.from('match_quiz_queue').delete().eq('user_id', waiting.user_id)
    await supabase.from('match_quiz_queue').delete().eq('user_id', userId)

    if (sessionErr) return { error: sessionErr.message }
    return { matched: true, session, opponentNickname: waiting.nickname }
  }

  return { matched: false, waiting: true }
}

export async function leaveMatchQueue(userId: string) {
  const supabase = await createClient()
  await supabase.from('match_quiz_queue').delete().eq('user_id', userId)
}

export async function linkChildToParent(parentId: string, childEmail: string, settings?: CurriculumSettings) {
  const supabase = await createClient()
  const normalizedEmail = childEmail.trim().toLowerCase()

  if (!normalizedEmail.includes('@')) {
    return { error: 'Please enter a valid child email address.' }
  }

  const { data: childRows, error: lookupErr } = await supabase
    .rpc('lookup_student_by_email', { child_email: normalizedEmail })

  const childProfile = Array.isArray(childRows) ? childRows[0] : childRows

  if (lookupErr) return { error: lookupErr.message }

  if (!childProfile) {
    return {
      success: true,
      pending: true,
      message: `No student account found for ${childEmail} yet. When they sign up with this email, link them again from this dashboard.`,
    }
  }

  if (childProfile.id === parentId) {
    return { error: 'You cannot link your own account as a child.' }
  }

  const { error: linkErr } = await supabase.from('family_links').upsert(
    { parent_id: parentId, child_id: childProfile.id },
    { onConflict: 'parent_id,child_id', ignoreDuplicates: true }
  )

  if (linkErr && !linkErr.message.includes('duplicate')) {
    return { error: linkErr.message }
  }

  if (settings) {
    await syncCurriculumToChild(parentId, childProfile.id, settings)
  }

  const childName = childProfile.nickname ?? childProfile.full_name ?? 'your child'
  return {
    success: true,
    message: `Linked to ${childName} (${childEmail}). Your curriculum settings now apply to their account.`,
  }
}

export function mergeCurriculumWithFallback(
  dbSettings: CurriculumSettings | null,
  metadata: Record<string, unknown> | undefined
): CurriculumSettings {
  if (dbSettings && dbSettings.customTopics !== undefined) return dbSettings
  const meta = metadata?.curriculum_settings
  if (meta && typeof meta === 'object') {
    const m = meta as Partial<CurriculumSettings>
    return {
      ...DEFAULT_CURRICULUM,
      countryCode: m.countryCode ?? m.region ?? 'GB',
      region: m.countryCode ?? m.region ?? 'GB',
      disabledTopics: m.disabledTopics ?? [],
      customTopics: m.customTopics ?? [],
      sharingLevel: m.sharingLevel ?? 'region',
      allowMatchQuiz: m.allowMatchQuiz ?? true,
    }
  }
  return { ...DEFAULT_CURRICULUM, countryCode: 'GB', region: 'GB' }
}

export interface SchoolInquiryRow {
  id: string
  inquiry_type: 'demo' | 'workshop' | 'pilot'
  school_name: string
  contact_name: string
  contact_email: string
  country_code: string | null
  message: string | null
  preferred_date: string | null
  student_count: number | null
  created_at: string
}

export async function getSchoolInquiries(limit = 50): Promise<SchoolInquiryRow[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('school_inquiries')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error || !data) return []
  return data as SchoolInquiryRow[]
}
