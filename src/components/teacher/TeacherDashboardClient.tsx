"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  BookOpen, Download, Globe, Users, GraduationCap,
  ArrowRight, Swords, Compass, Calendar, Plus, Trophy, Award, School,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { SignOutButton } from "@/components/SignOutButton";
import { BOOK_LESSONS, TOPIC_MARKETING } from "@/data/curriculum";
import { createClassroomAction, getClassroomsWithStudentsAction } from "@/app/dashboard/teacher/actions";
import { toast } from "sonner";

interface StudentProgress {
  id: string;
  full_name: string | null;
  nickname: string | null;
  email: string | null;
  country_code: string | null;
  lessonsCount: number;
  quizzesCount: number;
  avgQuizScore: number | null;
  badgeNames: string[];
}

interface ClassroomEnriched {
  id: string;
  name: string;
  class_code: string;
  created_at: string;
  students: StudentProgress[];
}

interface Props {
  userEmail: string;
  userName: string;
  countryName?: string;
  countryFlag?: string;
}

export function TeacherDashboardClient({ userEmail, userName, countryName, countryFlag }: Props) {
  const [classrooms, setClassrooms] = useState<ClassroomEnriched[]>([]);
  const [loading, setLoading] = useState(true);
  const [newClassName, setNewClassName] = useState("");
  const [creating, setCreating] = useState(false);
  const [selectedClassId, setSelectedClassId] = useState<string | null>(null);

  const categories = [...new Set(BOOK_LESSONS.map((l) => l.category))];

  useEffect(() => {
    fetchClassrooms();
  }, []);

  const fetchClassrooms = async () => {
    setLoading(true);
    try {
      const res = await getClassroomsWithStudentsAction();
      if (res.success && res.classrooms) {
        setClassrooms(res.classrooms);
        if (res.classrooms.length > 0 && !selectedClassId) {
          setSelectedClassId(res.classrooms[0].id);
        }
      } else if (res.error) {
        toast.error("Failed to load classrooms: " + res.error);
      }
    } catch (e) {
      toast.error("Failed to load classrooms.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateClass = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClassName.trim()) return;
    setCreating(true);
    try {
      const res = await createClassroomAction(newClassName);
      if (res.success && res.classroom) {
        toast.success("Classroom created successfully!");
        setNewClassName("");
        fetchClassrooms();
      } else if (res.error) {
        toast.error(res.error);
      }
    } catch (e) {
      toast.error("Failed to create classroom.");
    } finally {
      setCreating(false);
    }
  };

  const selectedClass = classrooms.find((c) => c.id === selectedClassId);

  return (
    <div className="min-h-screen bg-brand-gradient dark:bg-brand-gradient-dark text-brand-purple dark:text-brand-cream selection:bg-brand-gold/30">
      <header className="border-b border-brand-purple/10 dark:border-brand-gold/10 bg-brand-surface/80 dark:bg-brand-purple-dark/60 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/"><Logo showWordmark size="md" /></Link>
          <div className="flex items-center gap-4">
            {countryName && (
              <span className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-purple/5 dark:bg-brand-gold/5 border border-brand-purple/10 text-sm">
                {countryFlag} {countryName}
              </span>
            )}
            <span className="text-sm text-brand-purple/60 dark:text-brand-cream/60 hidden sm:block">{userEmail}</span>
            <SignOutButton />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12 max-w-6xl space-y-10 relative z-10">
        {/* Welcome Section */}
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/20 mb-4 text-xs font-semibold uppercase tracking-wider text-brand-gold shadow-sm">
            <GraduationCap className="h-3.5 w-3.5" /> Educator Portal
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-2">
            Welcome, <span className="text-gradient">{userName}</span>
          </h1>
          <p className="text-brand-purple/60 dark:text-brand-cream/60 text-lg">
            Manage your classroom pilots, track AI literacy progress, and access resources.
          </p>
        </div>

        {/* Core Actions Navigation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: Download, label: "Curriculum Guide", href: "/school/curriculum", desc: "Printable PDF" },
            { icon: Calendar, label: "Book Workshop", href: "/school/workshop", desc: "Interactive sessions" },
            { icon: Users, label: "Request Demo", href: "/school/demo", desc: "School pilot programme" },
            { icon: Globe, label: "Community", href: "/community", desc: countryName ?? "Global explorers" },
          ].map(({ icon: Icon, label, href, desc }) => (
            <Link key={label} href={href} className="p-6 rounded-2xl bg-brand-surface dark:bg-brand-purple-dark border border-brand-purple/10 hover:border-brand-gold/30 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 group">
              <Icon className="h-6 w-6 text-brand-gold mb-3 animate-pulse" strokeWidth={1.5} />
              <div className="font-bold text-sm mb-1">{label}</div>
              <div className="text-xs text-brand-purple/50 dark:text-brand-cream/50">{desc}</div>
              <ArrowRight className="h-4 w-4 mt-3 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </Link>
          ))}
        </div>

        {/* B2B School Portal / Classrooms Analytics & Roster Section */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Classrooms Selector & Creator */}
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-brand-surface dark:bg-brand-purple-dark border border-brand-purple/10 dark:border-brand-gold/15 shadow-sm space-y-6">
              <h2 className="text-xl font-heading font-bold flex items-center gap-2 text-brand-purple dark:text-brand-cream">
                <School className="h-5 w-5 text-brand-gold" /> My Classrooms
              </h2>
              
              <form onSubmit={handleCreateClass} className="space-y-3">
                <div className="text-xs font-semibold text-brand-purple/50 dark:text-brand-cream/50 uppercase tracking-wider">Create a Classroom</div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g., Year 5 AI Stars"
                    value={newClassName}
                    onChange={(e) => setNewClassName(e.target.value)}
                    className="flex-1 bg-brand-warm/30 dark:bg-brand-purple-dark border border-brand-purple/15 dark:border-brand-gold/20 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:border-brand-gold"
                  />
                  <Button type="submit" disabled={creating} size="icon" className="bg-brand-purple dark:bg-brand-gold text-brand-cream dark:text-brand-purple-dark rounded-full shrink-0">
                    <Plus className="h-5 w-5" />
                  </Button>
                </div>
              </form>

              {loading ? (
                <div className="text-sm text-brand-purple/55 dark:text-brand-cream/55 text-center py-4">Loading classes...</div>
              ) : classrooms.length === 0 ? (
                <div className="text-sm text-brand-purple/55 dark:text-brand-cream/55 text-center py-8 bg-brand-warm/10 rounded-2xl border border-dashed border-brand-purple/10">
                  No classrooms yet. Create one above to get started!
                </div>
              ) : (
                <div className="space-y-2">
                  {classrooms.map((cls) => (
                    <button
                      key={cls.id}
                      onClick={() => setSelectedClassId(cls.id)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all flex justify-between items-center ${
                        selectedClassId === cls.id
                          ? "bg-brand-gold/10 border-brand-gold/40 text-brand-purple dark:text-brand-cream font-semibold shadow-sm"
                          : "bg-transparent border-brand-purple/10 dark:border-brand-gold/10 text-brand-purple/70 dark:text-brand-cream/70 hover:bg-brand-warm/30"
                      }`}
                    >
                      <div>
                        <div className="text-sm leading-snug">{cls.name}</div>
                        <div className="text-xs text-brand-purple/55 dark:text-brand-cream/55 font-mono mt-1 uppercase tracking-wide">
                          Code: {cls.class_code}
                        </div>
                      </div>
                      <span className="text-xs rounded-full bg-brand-purple/10 dark:bg-brand-gold/15 px-2.5 py-1 font-bold text-brand-purple dark:text-brand-gold">
                        {cls.students.length} pupils
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Promotion box */}
            <div className="p-6 rounded-3xl bg-brand-gold/5 border border-brand-gold/20 shadow-sm space-y-4">
              <h3 className="font-heading font-bold text-base text-brand-purple dark:text-brand-cream">School Pilot License</h3>
              <p className="text-xs text-brand-purple/70 dark:text-brand-cream/70 leading-relaxed">
                You are currently on a free pilot tier. To upgrade your school, unlock custom teacher mapping PDFs, and receive unlimited custom badges, request an institutional upgrade.
              </p>
              <Link href="/school/pilot">
                <Button className="w-full bg-brand-purple dark:bg-brand-gold text-brand-cream dark:text-brand-purple-dark rounded-full font-bold hover:opacity-90 transition-opacity">
                  Upgrade School License
                </Button>
              </Link>
            </div>
          </div>

          {/* Student Analytics & Roster list */}
          <div className="lg:col-span-2 space-y-6">
            {selectedClass ? (
              <div className="p-6 md:p-8 rounded-3xl bg-brand-surface dark:bg-brand-purple-dark border border-brand-purple/10 dark:border-brand-gold/15 shadow-sm space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-brand-purple/10 dark:border-brand-gold/10 pb-6">
                  <div>
                    <h2 className="text-2xl font-heading font-bold text-brand-purple dark:text-brand-cream">{selectedClass.name}</h2>
                    <p className="text-xs text-brand-purple/50 dark:text-brand-cream/50 mt-1">
                      Enrolled: {selectedClass.students.length} pupils · Created: {new Date(selectedClass.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="bg-brand-purple/5 dark:bg-brand-gold/5 border border-brand-purple/10 dark:border-brand-gold/15 px-4 py-3 rounded-2xl text-center sm:text-right shrink-0">
                    <span className="text-xs text-brand-purple/50 dark:text-brand-cream/50 uppercase tracking-wider block font-semibold mb-0.5">Class Invite Code</span>
                    <span className="text-lg font-mono font-bold tracking-widest text-brand-gold uppercase">{selectedClass.class_code}</span>
                  </div>
                </div>

                {/* Class Analytics Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { 
                      icon: BookOpen, 
                      label: "Avg. Lessons Completed", 
                      value: selectedClass.students.length
                        ? Math.round(selectedClass.students.reduce((acc, s) => acc + s.lessonsCount, 0) / selectedClass.students.length)
                        : 0 
                    },
                    { 
                      icon: Trophy, 
                      label: "Avg. Quiz Score", 
                      value: (() => {
                        const studentsWithScores = selectedClass.students.filter(s => s.avgQuizScore !== null);
                        return studentsWithScores.length
                          ? `${Math.round(studentsWithScores.reduce((acc, s) => acc + (s.avgQuizScore ?? 0), 0) / studentsWithScores.length)}%`
                          : "N/A"
                      })()
                    },
                    { 
                      icon: Award, 
                      label: "Total Badges Earned", 
                      value: selectedClass.students.reduce((acc, s) => acc + s.badgeNames.length, 0) 
                    },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="p-4 rounded-2xl bg-brand-warm/20 dark:bg-brand-purple-dark/40 border border-brand-purple/10 dark:border-brand-gold/10">
                      <Icon className="h-5 w-5 text-brand-gold mb-2" />
                      <div className="text-lg font-bold">{value}</div>
                      <div className="text-xs text-brand-purple/50 dark:text-brand-cream/50">{label}</div>
                    </div>
                  ))}
                </div>

                {/* Student Roster Table */}
                <div className="space-y-4">
                  <h3 className="font-heading font-bold text-lg">Student Roster</h3>
                  
                  {selectedClass.students.length === 0 ? (
                    <div className="text-center py-10 bg-brand-warm/5 rounded-2xl border border-dashed border-brand-purple/10 text-brand-purple/60 dark:text-brand-cream/60">
                      <p className="font-semibold text-sm mb-1">No students linked yet</p>
                      <p className="text-xs max-w-sm mx-auto">
                        Share class code <span className="font-mono font-bold text-brand-gold">{selectedClass.class_code}</span> with your students. They can input it under "Join Class" in their dashboard.
                      </p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto border border-brand-purple/10 dark:border-brand-gold/10 rounded-2xl">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-brand-warm/20 dark:bg-brand-purple-dark/80 text-xs font-semibold text-brand-purple/60 dark:text-brand-cream/60 border-b border-brand-purple/10 dark:border-brand-gold/10">
                            <th className="p-4">Name / Nickname</th>
                            <th className="p-4 text-center">Lessons</th>
                            <th className="p-4 text-center">Quizzes</th>
                            <th className="p-4 text-center">Avg Score</th>
                            <th className="p-4">Badges</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-brand-purple/5 dark:divide-brand-gold/5 text-sm">
                          {selectedClass.students.map((student) => (
                            <tr key={student.id} className="hover:bg-brand-warm/10 dark:hover:bg-brand-purple-dark/40 transition-colors">
                              <td className="p-4 font-semibold">
                                <div>{student.full_name ?? student.nickname}</div>
                                <div className="text-[10px] font-mono text-brand-purple/40 dark:text-brand-cream/40 mt-0.5">{student.email}</div>
                              </td>
                              <td className="p-4 text-center tabular-nums">{student.lessonsCount}</td>
                              <td className="p-4 text-center tabular-nums">{student.quizzesCount}</td>
                              <td className="p-4 text-center tabular-nums font-semibold text-brand-gold">
                                {student.avgQuizScore ? `${student.avgQuizScore}%` : "-"}
                              </td>
                              <td className="p-4">
                                <div className="flex flex-wrap gap-1">
                                  {student.badgeNames.length === 0 ? (
                                    <span className="text-xs text-brand-purple/45 dark:text-brand-cream/45 italic">None</span>
                                  ) : (
                                    student.badgeNames.slice(0, 3).map((badge) => (
                                      <span key={badge} className="text-[10px] font-bold bg-brand-gold/15 text-brand-gold border border-brand-gold/25 rounded-md px-1.5 py-0.5">
                                        {badge}
                                      </span>
                                    ))
                                  )}
                                  {student.badgeNames.length > 3 && (
                                    <span className="text-[10px] font-bold text-brand-purple/40 dark:text-brand-cream/40">
                                      +{student.badgeNames.length - 3}
                                    </span>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="p-8 text-center rounded-3xl border border-brand-purple/10 dark:border-brand-gold/15 bg-brand-surface/40 dark:bg-brand-purple-dark/20 text-brand-purple/65 dark:text-brand-cream/65">
                Select or create a classroom on the left to see analytics.
              </div>
            )}
          </div>
        </section>

        {/* Curriculum Overview (Category/Lesson explorer) */}
        <section className="space-y-6">
          <h2 className="text-2xl font-heading font-bold flex items-center gap-3">
            <Compass className="h-6 w-6 text-brand-gold" /> Curriculum Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <div key={cat} className="rounded-3xl border border-brand-purple/10 dark:border-brand-gold/10 bg-brand-surface/90 dark:bg-brand-purple-dark/80 p-6 shadow-sm">
                <h3 className="font-heading font-bold text-lg mb-4 text-brand-purple dark:text-brand-cream border-b border-brand-purple/10 dark:border-brand-gold/10 pb-2">{cat}</h3>
                <ul className="space-y-2.5">
                  {BOOK_LESSONS.filter((l) => l.category === cat).map((lesson) => (
                    <li key={String(lesson.id)}>
                      <Link href={`/lesson/${lesson.id}`} className="text-sm text-brand-purple/70 dark:text-brand-cream/70 hover:text-brand-gold transition-colors flex items-center gap-2 group/link">
                        <BookOpen className="h-4 w-4 shrink-0 text-brand-purple/40 group-hover/link:text-brand-gold transition-colors" />
                        <span className="truncate">{lesson.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Classroom Tools Sidebar widgets */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/match-quiz" className="block p-6 rounded-3xl bg-brand-surface dark:bg-brand-purple-dark border border-brand-purple/10 hover:border-brand-gold/30 hover:shadow-lg transition-all group">
            <Swords className="h-7 w-7 text-brand-gold mb-3" />
            <div className="font-bold text-base mb-1">Match Quiz Arena</div>
            <p className="text-xs text-brand-purple/50 dark:text-brand-cream/50 mt-1 leading-relaxed">
              Launch a live classroom quiz game. Pupils join using nicknames only for child-safe identity protection.
            </p>
          </Link>
          <Link href="/dashboard/student" className="block p-6 rounded-3xl bg-brand-surface dark:bg-brand-purple-dark border border-brand-purple/10 hover:border-brand-gold/30 hover:shadow-lg transition-all group">
            <Compass className="h-7 w-7 text-brand-gold mb-3" />
            <div className="font-bold text-base mb-1">Student Preview</div>
            <p className="text-xs text-brand-purple/50 dark:text-brand-cream/50 mt-1 leading-relaxed">
              Experience the islands, complete lessons, and query Vision Vee exactly as your students do.
            </p>
          </Link>
        </div>
      </main>
    </div>
  );
}
