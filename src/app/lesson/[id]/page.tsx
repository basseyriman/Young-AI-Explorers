import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Star, Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/Logo'
import { ALL_LESSONS } from '@/data/lessons'

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

  // Load lesson from static data — instant, works without database
  let lesson: any = null;

  if (id === 'intro') {
    lesson = {
      id: 'intro',
      topic_number: 0,
      title: "Welcome to the Future – Your AI Adventure Begins!",
      introduction: "Step into the magical tech laboratory where anything is possible! Maya and Alex were looking at a glowing holographic screen when a friendly, shiny robot named Vision Vee floated down to greet them. 'Welcome, young explorers!' Vee chirped. 'You are about to start a super exciting journey into Artificial Intelligence, Robotics, and the amazing technologies of tomorrow. Are you ready to see how AI is changing our world?'",
      main_lesson: "Artificial Intelligence (or AI) is like giving computers a special kind of 'brainpower' so they can help us solve problems, recognize pictures, understand our voices, and even create art! Just like you learn from reading books and playing games, computers can learn from patterns and information. Over the course of this journey, you'll visit different virtual islands and learn how AI makes cars drive themselves, helps doctors cure sickness, protects wild animals, and makes the future brighter for everyone.",
      examples: [{ type: "activity", content: "Look around your environment — from smart assistants to facial locks, AI is already here helping you every day. Can you spot 3 things powered by AI?" }],
      fun_facts: ["Did you know that the word 'robot' was first used in a play over 100 years ago? Today, real robots and AI are helping us explore deep space and the bottom of the ocean!"]
    };
  } else {
    const topicNum = parseInt(id);
    const staticLesson = ALL_LESSONS[topicNum];
    if (staticLesson) {
      lesson = { ...staticLesson, id: topicNum };
    }
  }

  if (!lesson) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
        <div className="p-8 rounded-2xl bg-white border border-slate-200 text-center max-w-md shadow-lg">
          <h1 className="text-2xl font-bold mb-2 text-slate-900">Lesson Not Found</h1>
          <p className="text-slate-500 mb-6">We couldn't find lesson #{id}.</p>
          <Link href="/dashboard/student">
            <Button className="bg-slate-900 text-white rounded-full px-8">Return to Dashboard</Button>
          </Link>
        </div>
      </div>
    )
  }

  // All static lessons are unlocked
  const isLocked = false;

  // Parse fields (static data is already arrays, but handle gracefully)
  let funFacts: string[] = []
  let examples: any[] = []
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

  const lessonImage = lesson.topic_number === 0 ? "cover_illustration.png" : (imageMap[lesson.topic_number] || null);

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
            {id === 'intro' ? 'Introduction' : `Chapter ${parseInt(id) < 10 ? '0' + id : id}`}
          </span>
          <Link href="/" className="hidden sm:flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="flex h-6 w-6 items-center justify-center rounded-md overflow-hidden bg-slate-100 border border-slate-200">
              <Logo size="sm" />
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
                {id === 'intro' ? 'Introduction' : `Chapter ${parseInt(id) < 10 ? '0' + id : id}`}
              </span>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-tight py-2 max-w-4xl mx-auto text-balance">
                {lesson.title}
              </h1>
            </div>

            {/* Main Illustration Hero */}
            {lessonImage && (
              <div className="relative w-full max-w-4xl mx-auto rounded-[32px] overflow-hidden shadow-2xl shadow-blue-900/10 border-4 border-white group bg-slate-100 aspect-[5/4] md:aspect-[4/3]">
                <img 
                  src={`/assets/${lessonImage}`} 
                  alt={lesson.title} 
                  className="w-full h-full object-cover object-[center_90%] transition-transform duration-1000 group-hover:scale-105" 
                />
              </div>
            )}

            {/* Story Time */}
            <section className="bg-white p-8 md:p-12 rounded-[24px] border border-slate-200 shadow-sm transition-shadow hover:shadow-md">
              <h2 className="text-2xl font-semibold text-slate-800 tracking-tight border-b border-slate-100 pb-4 mb-6">Introduction</h2>
              <p className="text-lg leading-relaxed text-slate-700">
                {lesson.introduction}
              </p>
            </section>

            {/* Core Lesson */}
            <section className="bg-white p-8 md:p-12 rounded-[24px] border border-slate-200 shadow-sm transition-shadow hover:shadow-md">
              <h2 className="text-2xl font-semibold text-slate-800 tracking-tight border-b border-slate-100 pb-4 mb-6">The Lesson</h2>
              <p className="text-lg leading-relaxed text-slate-700">
                {lesson.main_lesson}
              </p>
            </section>

            {/* Fun Fact */}
            {funFacts.length > 0 && (
              <section className="bg-slate-50 p-8 md:p-12 rounded-[24px] border border-slate-200 shadow-sm transition-shadow hover:shadow-md">
                <h3 className="text-xl font-semibold text-slate-800 tracking-tight border-b border-slate-200 pb-4 mb-6">Did You Know?</h3>
                <p className="text-lg leading-relaxed text-slate-700">
                  {funFacts[0]}
                </p>
              </section>
            )}

            {/* Interactive Quiz CTA */}
            <div className="bg-white border border-slate-200 p-10 md:p-14 rounded-[24px] shadow-sm text-center">
               <h3 className="text-2xl font-semibold text-slate-800 mb-4 tracking-tight">Ready to test your knowledge?</h3>
               <p className="text-slate-600 mb-8 max-w-lg mx-auto text-lg">
                 Show what you've learned and earn a new badge for your collection.
               </p>
               <Link href={`/quiz/${id}`}>
                 <Button size="lg" className="bg-slate-900 text-white hover:bg-slate-800 h-14 px-10 text-lg rounded-xl font-medium transition-colors">
                   Take the Quiz <ArrowRight className="ml-2 h-5 w-5" />
                 </Button>
               </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
