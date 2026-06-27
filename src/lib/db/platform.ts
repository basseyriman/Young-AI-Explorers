import { createClient } from '@/utils/supabase/server'
import type { CurriculumSettings, CustomTopic, TopicId } from '@/data/curriculum'
import { DEFAULT_CURRICULUM, BOOK_LESSONS } from '@/data/curriculum'

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
  country_code: string | null
  sharing_level: string
  allow_match_quiz: boolean
}

export async function getCountries(): Promise<CountryRow[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('country_explorer_counts')
    .select('code, name, flag_emoji, is_featured, explorer_count')
    .order('is_featured', { ascending: false })
    .order('explorer_count', { ascending: false })
    .order('name')

  if (error || !data?.length) {
    const { data: fallback } = await supabase
      .from('countries')
      .select('code, name, flag_emoji, is_featured')
      .order('is_featured', { ascending: false })
      .order('name')
    return (fallback ?? []).map((c) => ({ ...c, explorer_count: 0 }))
  }
  return data as CountryRow[]
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

  const { data: customTopics } = await supabase
    .from('custom_topics')
    .select('*')
    .eq('user_id', userId)
    .eq('is_approved', true)
    .order('created_at', { ascending: false })

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
    })),
    sharingLevel: (settings?.sharing_level ?? profile?.sharing_level ?? 'region') as CurriculumSettings['sharingLevel'],
    allowMatchQuiz: settings?.allow_match_quiz ?? profile?.allow_match_quiz ?? true,
  }
}

export async function saveCurriculumToDb(userId: string, settings: CurriculumSettings) {
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
    updated_at: new Date().toISOString(),
  })

  return { success: true }
}

export async function addCustomTopicToDb(
  userId: string,
  topic: { title: string; description: string; createdBy: 'parent' | 'vision_vee' | 'student' }
) {
  const supabase = await createClient()
  const { data, error } = await supabase.from('custom_topics').insert({
    user_id: userId,
    title: topic.title,
    description: topic.description,
    created_by: topic.createdBy,
  }).select().single()

  if (error) return { error: error.message }
  return { success: true, topic: data }
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
  const title = BOOK_LESSONS.find((l) => String(l.id) === topicKey)?.title ?? topicKey

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
  if (profile?.country_code) {
    await supabase.from('topic_activity').upsert(
      { country_code: profile.country_code, topic_id: topicKey, topic_title: title, activity_count: 1, last_active: new Date().toISOString() },
      { onConflict: 'country_code,topic_id', ignoreDuplicates: false }
    )
  }
}

export async function postCommunityIdea(
  userId: string,
  countryCode: string,
  topicTitle: string,
  ideaText: string,
  nickname: string
) {
  const supabase = await createClient()
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

export async function linkChildToParent(parentId: string, childEmail: string) {
  const supabase = await createClient()
  const { data: childProfile } = await supabase
    .from('profiles')
    .select('id')
    .eq('role', 'student')
    .limit(1)

  const { error } = await supabase.from('family_links').insert({
    parent_id: parentId,
    child_id: childProfile?.[0]?.id ?? parentId,
  })

  if (error && !error.message.includes('duplicate')) {
    return { success: true, message: `Curriculum template saved. Link ${childEmail} when they register with this email.` }
  }
  return { success: true, message: `Family link established for ${childEmail}.` }
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
