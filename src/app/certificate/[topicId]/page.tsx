import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Printer, Award, ShieldAlert } from "lucide-react";
import { createClient } from "@/utils/supabase/server";
import { requireRole } from "@/lib/auth/dashboard-access";
import { getProfile } from "@/lib/db/platform";
import { BOOK_LESSONS } from "@/data/curriculum";

interface Props {
  params: Promise<{
    topicId: string;
  }>;
}

export default async function CertificatePage({ params }: Props) {
  const { topicId } = await params;
  const { user } = await requireRole(["student", "teacher", "admin"]);
  const supabase = await createClient();

  // 1. Verify user completed the topic by checking badges
  const { data: badge } = await supabase
    .from("user_badges")
    .select("topic_id, awarded_at")
    .eq("user_id", user.id)
    .eq("topic_id", topicId)
    .maybeSingle();

  if (!badge) {
    return (
      <div className="min-h-screen bg-brand-gradient dark:bg-brand-gradient-dark flex flex-col items-center justify-center p-6 text-center">
        <ShieldAlert className="h-16 w-16 text-red-500 mb-4 animate-bounce" />
        <h1 className="text-2xl font-bold mb-2">Certificate Locked</h1>
        <p className="text-brand-purple/60 dark:text-brand-cream/60 max-w-md mb-6">
          You haven&apos;t earned this certificate yet! Please complete the quizzes and challenges for this chapter to unlock it.
        </p>
        <Link href="/dashboard/student" className="px-6 py-3 bg-brand-purple dark:bg-brand-gold text-brand-cream dark:text-brand-purple-dark rounded-full font-semibold">
          Back to Dashboard
        </Link>
      </div>
    );
  }

  // 2. Fetch student name and topic title
  const profile = await getProfile(user.id);
  const studentName = profile?.nickname ?? profile?.full_name ?? "AI Explorer";

  let topicTitle = "Artificial Intelligence";
  const coreLesson = BOOK_LESSONS.find(l => String(l.id) === String(topicId));
  if (coreLesson) {
    topicTitle = coreLesson.title;
  } else {
    // Check custom topics
    const { data: custom } = await supabase
      .from("custom_topics")
      .select("title")
      .eq("id", topicId)
      .maybeSingle();
    if (custom?.title) {
      topicTitle = custom.title;
    }
  }

  const awardedDate = badge.awarded_at 
    ? new Date(badge.awarded_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
    : new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

  return (
    <div className="min-h-screen bg-brand-warm dark:bg-brand-purple-dark/20 flex flex-col items-center justify-center p-8 select-none">
      
      {/* Action Header (Hidden during Print) */}
      <div className="w-full max-w-4xl flex items-center justify-between mb-8 print:hidden">
        <Link href="/dashboard/student" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-purple/70 dark:text-brand-cream/70 hover:text-brand-gold transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Dashboard
        </Link>
        
        <button 
          onClick={{
            // Inline HTML print trigger is easiest and bulletproof
          } as any}
          // We will use standard HTML printing on client side below
          className="inline-flex items-center gap-2 px-6 py-3 bg-brand-purple dark:bg-brand-gold text-brand-cream dark:text-brand-purple-dark rounded-full font-bold text-sm shadow-md hover:opacity-90 transition-opacity"
          id="print-btn"
        >
          <Printer className="h-4 w-4" /> Print / Save PDF
        </button>
      </div>

      {/* Printable Certificate Frame */}
      <div className="w-full max-w-4xl aspect-[1.414/1] bg-white border-[16px] border-double border-brand-purple/20 p-12 md:p-16 flex flex-col justify-between items-center text-center relative shadow-2xl rounded-sm print:shadow-none print:border-brand-purple">
        
        {/* Certificate Decorative Corners */}
        <div className="absolute top-4 left-4 w-12 h-12 border-t-4 border-l-4 border-brand-gold"></div>
        <div className="absolute top-4 right-4 w-12 h-12 border-t-4 border-r-4 border-brand-gold"></div>
        <div className="absolute bottom-4 left-4 w-12 h-12 border-b-4 border-l-4 border-brand-gold"></div>
        <div className="absolute bottom-4 right-4 w-12 h-12 border-b-4 border-r-4 border-brand-gold"></div>

        {/* Certificate Body */}
        <div className="space-y-4">
          <Award className="h-14 w-14 text-brand-gold mx-auto mb-2" />
          <h2 className="text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase text-brand-purple/40">Young AI Explorers</h2>
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-brand-purple tracking-wide">Certificate of Achievement</h1>
          <div className="w-24 h-0.5 bg-brand-gold mx-auto my-4"></div>
        </div>

        <div className="space-y-3">
          <p className="font-serif italic text-brand-purple/50 text-sm md:text-base">This is proudly awarded to</p>
          <p className="text-3xl md:text-5xl font-sans font-bold text-brand-purple border-b border-brand-purple/10 pb-2 px-12 inline-block">
            {studentName}
          </p>
        </div>

        <div className="space-y-4 max-w-xl">
          <p className="text-sm md:text-base text-brand-purple/65 leading-relaxed">
            for successfully mastering all quizzes, interactive workshops, and lesson challenges in the Artificial Intelligence learning module:
          </p>
          <p className="text-lg md:text-2xl font-bold text-brand-gold uppercase tracking-wider font-heading">
            {topicTitle}
          </p>
        </div>

        <div className="w-full flex justify-between items-end border-t border-brand-purple/10 pt-8 mt-6">
          <div className="flex flex-col items-center">
            <span className="text-xs font-bold text-brand-purple">{awardedDate}</span>
            <span className="w-32 h-px bg-brand-purple/20 my-1"></span>
            <span className="text-[10px] text-brand-purple/40 uppercase tracking-wider">Date Awarded</span>
          </div>

          {/* Gold Seal Graphic */}
          <div className="relative w-16 h-16 md:w-20 md:h-20 shrink-0">
            <svg viewBox="0 0 100 100" className="w-full h-full text-brand-gold fill-current">
              <path d="M50 0 L58 15 L74 8 L74 26 L91 26 L84 42 L100 50 L84 58 L91 74 L74 74 L74 92 L58 85 L50 100 L42 85 L26 92 L26 74 L9 74 L16 58 L0 50 L16 42 L9 26 L26 26 L26 8 L42 15 Z" />
              <circle cx="50" cy="50" r="30" className="text-white fill-current" />
              <circle cx="50" cy="50" r="26" className="text-brand-gold fill-current" />
              <text x="50" y="55" textAnchor="middle" className="text-white font-extrabold text-[11px] fill-current uppercase tracking-wider font-sans">SEAL</text>
            </svg>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-xs font-serif italic text-brand-purple">Vision Vee</span>
            <span className="w-32 h-px bg-brand-purple/20 my-1"></span>
            <span className="text-[10px] text-brand-purple/40 uppercase tracking-wider">AI Companion</span>
          </div>
        </div>
      </div>

      {/* Javascript to support print trigger */}
      <script dangerouslySetInnerHTML={{
        __html: `
          document.getElementById('print-btn').addEventListener('click', function() {
            window.print();
          });
        `
      }} />

      {/* Print css override */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @media print {
            body {
              background: #fff;
              padding: 0;
            }
            .print\\:hidden {
              display: none !important;
            }
            .max-w-4xl {
              max-width: 100% !important;
              box-shadow: none !important;
              border: 8px double #4A2D6E !important;
            }
          }
        `
      }} />

    </div>
  );
}
