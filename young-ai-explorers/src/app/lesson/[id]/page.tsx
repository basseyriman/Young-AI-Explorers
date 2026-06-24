import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, BookOpen, Star, Zap, BrainCircuit, Activity, Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/Logo'

export default async function LessonPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect('/login')
  }

  // Fetch the specific lesson
  const { data: lesson, error } = await supabase
    .from('lessons')
    .select('*')
    .eq('topic_number', parseInt(id))
    .single()

  if (error || !lesson) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-white bg-slate-950">
        <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 text-center max-w-md">
          <BrainCircuit className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Lesson Not Found</h1>
          <p className="text-slate-400 mb-6">We couldn't find the lesson you were looking for. It might not exist yet.</p>
          
          <div className="bg-red-950/50 border border-red-500/50 p-4 rounded-lg mb-6 text-left text-sm text-red-200 break-all overflow-auto">
            <p className="font-bold mb-1">Debug Info:</p>
            <p>ID trying to fetch: {id}</p>
            <p>Error: {error ? JSON.stringify(error) : 'No error, just no data returned.'}</p>
            <p>User ID: {user?.id}</p>
          </div>

          <Link href="/dashboard/student">
            <Button className="w-full bg-blue-600 hover:bg-blue-700">Return to Dashboard</Button>
          </Link>
        </div>
      </div>
    )
  }

  // Check if it's a locked/placeholder chapter
  const isLocked = lesson.introduction.includes('currently locked')

  // Parse JSON fields safely
  let funFacts = []
  let examples = []
  try {
    funFacts = typeof lesson.fun_facts === 'string' ? JSON.parse(lesson.fun_facts) : lesson.fun_facts || []
    examples = typeof lesson.examples === 'string' ? JSON.parse(lesson.examples) : lesson.examples || []
  } catch (e) {
    console.error('Error parsing JSON fields', e)
  }

  // Image Mapping
  const imageMap = [
    "", // 0
    "computer_vision.png", // 1
    "speech_recognition.png", // 2
    "ai_translation.png", // 3
    "ai_decision_making.png", // 4
    "ai_healthcare.png", // 5
    "ai_games.png", // 6
    "self_driving_cars.png", // 7
    "ai_space.png", // 8
    "neural_networks.png", // 9
    "ai_environment.png", // 10
    "machine_learning.png", // 11
    "nlp.png", // 12
    "robotics.png", // 13
    "recommendation_systems.png", // 14
    "facial_recognition.png", // 15
    "virtual_assistants.png", // 16
    "ai_art.png", // 17
    "ai_music.png", // 18
    "ai_sports.png", // 19
    "ai_agriculture.png", // 20
    "ai_weather.png", // 21
    "ai_education.png", // 22
    "ai_transportation.png", // 23
    "ai_banking.png", // 24
    "ai_shopping.png", // 25
    "ai_social_media.png", // 26
    "ai_ethics.png", // 27
    "ai_manufacturing.png", // 28
    "ai_cybersecurity.png", // 29
    "ai_photography.png", // 30
    "ai_food.png", // 31
    "ai_fashion.png", // 32
    "ai_movies.png", // 33
    "deep_learning.png", // 34
    "ai_chatbots.png", // 35
    "ai_emergency_services.png", // 36
    "ai_archaeology.png" // 37
  ];

  const lessonImage = imageMap[lesson.topic_number] || null;

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 font-sans text-slate-900 selection:bg-blue-500/30">
      {/* Premium Light Background setup */}
      <div className="fixed inset-0 z-0 bg-slate-50">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(219,234,254,0.7),rgba(255,255,255,0))]" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMCwwLDAsMC4wNSkiLz48L3N2Zz4=')] opacity-50" />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between border-b border-slate-200 bg-white/80 px-6 py-4 backdrop-blur-xl">
        <div className="flex items-center gap-6">
          <Link 
            href="/dashboard/student"
            className="flex items-center gap-2 text-sm font-semibold text-slate-500 transition-colors hover:text-blue-600"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Back to Dashboard</span>
            <span className="sm:hidden">Back</span>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold tracking-wider uppercase text-blue-600 border border-blue-200 shadow-sm">
            Chapter {lesson.topic_number}
          </span>
          <Link href="/" className="hidden sm:flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="flex h-6 w-6 items-center justify-center rounded-md overflow-hidden bg-slate-100 border border-slate-200">
              <Logo className="h-4 w-4 text-blue-600" />
            </div>
            <span className="font-heading text-sm font-bold text-slate-800">Young AI Explorers</span>
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 mx-auto w-full max-w-4xl flex-1 px-6 py-12">
        {isLocked ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            {lessonImage ? (
              <div className="relative w-64 h-64 mb-8">
                <img src={`/assets/${lessonImage}`} alt={lesson.title} className="w-full h-full object-cover rounded-[32px] opacity-40 grayscale shadow-xl" />
                <div className="absolute inset-0 flex items-center justify-center">
                   <Lock className="h-16 w-16 text-slate-600 drop-shadow-lg" />
                </div>
              </div>
            ) : (
              <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-[24px] bg-slate-100 border-2 border-slate-200 shadow-lg">
                <Lock className="h-10 w-10 text-slate-400" />
              </div>
            )}
            <h1 className="font-heading text-4xl font-bold tracking-tight text-slate-900 mb-4">
              {lesson.title}
            </h1>
            <p className="text-xl text-slate-600 max-w-lg mx-auto mb-8 font-medium leading-relaxed">
              {lesson.introduction}
            </p>
            <Link href="/dashboard/student">
              <Button variant="outline" className="border-2 border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300 rounded-full px-8 h-12 font-bold shadow-sm transition-all duration-300 hover:-translate-y-1">
                Explore Available Lessons
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-12">
            {/* Header Section */}
            <div className="text-center space-y-6">
              <span className="inline-flex items-center rounded-full bg-blue-50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-600 border border-blue-200 shadow-sm">
                <Star className="w-4 h-4 mr-2" />
                Chapter {lesson.topic_number}
              </span>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-tight py-2 max-w-4xl mx-auto text-balance">
                {lesson.title}
              </h1>
            </div>

            {/* Main Illustration Hero */}
            {lessonImage && (
              <div className="relative w-full max-w-4xl mx-auto rounded-[32px] overflow-hidden shadow-2xl shadow-blue-900/10 border-4 border-white group bg-slate-900 aspect-[4/3] md:aspect-[16/10] flex justify-center items-center">
                {/* Blurred Background to fill wide aspect */}
                <div className="absolute inset-0 z-0">
                  <img 
                    src={`/assets/${lessonImage}`} 
                    alt="" 
                    className="w-full h-full object-cover blur-3xl opacity-50 scale-125" 
                  />
                  <div className="absolute inset-0 bg-slate-900/20"></div>
                </div>
                {/* Uncropped Full Image */}
                <img 
                  src={`/assets/${lessonImage}`} 
                  alt={lesson.title} 
                  className="w-full h-full object-contain relative z-10 transition-transform duration-1000 group-hover:scale-105 shadow-2xl" 
                />
              </div>
            )}

            {/* Story Time */}
            <section className="relative overflow-hidden rounded-[32px] border-l-8 border-l-blue-400 border-y-2 border-r-2 border-y-slate-100 border-r-slate-100 bg-white p-10 md:p-14 shadow-xl transition-all duration-500 hover:shadow-2xl hover:shadow-blue-900/5 hover:-translate-y-1">
              <div className="absolute top-0 right-0 p-10 opacity-5 transition-transform duration-700 group-hover:rotate-12 group-hover:scale-110">
                <Star className="w-48 h-48 text-blue-500" />
              </div>
              <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-blue-50 rounded-full blur-[100px] opacity-80"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-xl shadow-blue-500/30 transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                    <Star className="w-7 h-7 fill-white/20" />
                  </div>
                  <h2 className="font-heading text-3xl font-bold text-slate-900 tracking-tight">Meet Vision Vee</h2>
                </div>
                <p className="text-xl md:text-2xl leading-relaxed text-slate-700 font-medium italic">
                  "{lesson.introduction}"
                </p>
              </div>
            </section>

            {/* Core Lesson */}
            <section className="relative overflow-hidden rounded-[32px] border-l-8 border-l-purple-400 border-y-2 border-r-2 border-y-slate-100 border-r-slate-100 bg-white p-10 md:p-14 shadow-xl transition-all duration-500 hover:shadow-2xl hover:shadow-purple-900/5 hover:-translate-y-1">
              <div className="absolute top-0 right-0 p-10 opacity-5 transition-transform duration-700 group-hover:-rotate-12 group-hover:scale-110">
                <BrainCircuit className="w-48 h-48 text-purple-500" />
              </div>
              <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-purple-50 rounded-full blur-[100px] opacity-80"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-fuchsia-600 text-white shadow-xl shadow-purple-500/30 transform transition-all duration-500 group-hover:scale-110 group-hover:-rotate-6">
                    <BrainCircuit className="w-7 h-7" />
                  </div>
                  <h2 className="font-heading text-3xl font-bold text-slate-900 tracking-tight">The Lesson</h2>
                </div>
                <p className="text-lg md:text-xl leading-relaxed text-slate-700 font-medium">
                  {lesson.main_lesson}
                </p>
              </div>
            </section>

            {/* Fun Fact */}
            {funFacts.length > 0 && (
              <section className="relative overflow-hidden rounded-[32px] border-l-8 border-l-pink-400 border-y-2 border-r-2 border-y-slate-100 border-r-slate-100 bg-white p-10 md:p-14 shadow-xl transition-all duration-500 hover:shadow-2xl hover:shadow-pink-900/5 hover:-translate-y-1">
                 <div className="absolute top-0 right-0 p-10 opacity-5 transition-transform duration-700 group-hover:scale-125">
                  <Zap className="w-48 h-48 text-pink-500" />
                </div>
                <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-pink-50 rounded-full blur-[100px] opacity-80"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 text-white shadow-xl shadow-pink-500/30 transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                      <Zap className="w-7 h-7 fill-white/20" />
                    </div>
                    <h3 className="font-heading text-3xl font-bold text-slate-900 tracking-tight">Mind-Blowing Fact</h3>
                  </div>
                  <p className="text-lg md:text-xl leading-relaxed text-slate-700 font-medium">
                    {funFacts[0]}
                  </p>
                </div>
              </section>
            )}

            {/* Interactive Quiz CTA */}
            <div className="relative overflow-hidden rounded-[32px] border-4 border-emerald-100 bg-emerald-50 p-10 md:p-16 shadow-xl text-center transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-900/10 hover:-translate-y-2">
               <div className="relative z-10 flex flex-col items-center">
                  <div className="p-4 rounded-3xl bg-emerald-500 shadow-lg shadow-emerald-500/30 text-white mb-8 transition-transform duration-500 hover:scale-110">
                    <Activity className="w-10 h-10" />
                  </div>
                  <h3 className="font-heading text-3xl md:text-4xl font-black text-slate-900 mb-4 tracking-tight">Ready to test your knowledge?</h3>
                  <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-lg font-medium leading-relaxed">
                    Show what you've learned and earn a shiny new badge for your collection!
                  </p>
                  <Link href={`/quiz/${lesson.id}`} className="w-full sm:w-auto">
                    <Button size="lg" className="w-full sm:w-auto bg-emerald-500 text-white hover:bg-emerald-600 shadow-xl shadow-emerald-500/20 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/30 hover:-translate-y-1 h-16 px-12 text-xl rounded-full font-bold border-2 border-transparent">
                      Take the Quiz & Earn a Badge! <ArrowRight className="ml-3 h-6 w-6" />
                    </Button>
                  </Link>
               </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
