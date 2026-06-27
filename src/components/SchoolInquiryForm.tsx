"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { ArrowLeft, Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/Logo";
import { submitSchoolInquiry, type InquiryType } from "@/app/school/actions";

interface Props {
  type: InquiryType;
  title: string;
  description: string;
  showDate?: boolean;
  showStudentCount?: boolean;
}

export function SchoolInquiryForm({ type, title, description, showDate, showStudentCount }: Props) {
  const [message, setMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [pending, startTransition] = useTransition();

  const handleSubmit = (formData: FormData) => {
    formData.set("inquiryType", type);
    startTransition(async () => {
      const result = await submitSchoolInquiry(formData);
      if ("error" in result && result.error) {
        setMessage(result.error);
        setSuccess(false);
      } else {
        setSuccess(true);
        setMessage(null);
      }
    });
  };

  return (
    <div className="min-h-screen bg-brand-gradient dark:bg-brand-gradient-dark text-brand-purple dark:text-brand-cream">
      <header className="border-b border-brand-purple/10 dark:border-brand-gold/10 bg-brand-surface/80 dark:bg-brand-purple-dark/60">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/"><Logo showWordmark size="md" /></Link>
          <Link href="/" className="text-sm font-medium text-brand-purple/60 dark:text-brand-cream/60 hover:text-brand-gold inline-flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Home
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12 max-w-lg">
        <h1 className="text-3xl font-heading font-bold mb-2">{title}</h1>
        <p className="text-brand-purple/60 dark:text-brand-cream/60 mb-8">{description}</p>

        {success ? (
          <div className="rounded-2xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/30 p-8 text-center">
            <CheckCircle2 className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Request received!</h2>
            <p className="text-sm text-brand-purple/60 dark:text-brand-cream/60 mb-6">
              Our team will contact you within 2 business days.
            </p>
            <Link href="/" className="text-brand-gold font-semibold hover:underline">Back to homepage</Link>
          </div>
        ) : (
          <form action={handleSubmit} className="space-y-4 rounded-2xl border border-brand-purple/10 dark:border-brand-gold/10 bg-brand-surface dark:bg-brand-purple-dark p-6">
            {message && (
              <p className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 p-3 rounded-xl">{message}</p>
            )}
            <div className="space-y-2">
              <Label htmlFor="schoolName">School / Organisation *</Label>
              <Input id="schoolName" name="schoolName" required placeholder="e.g. Oakwood Primary School" className="h-12 rounded-xl" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactName">Your Name *</Label>
              <Input id="contactName" name="contactName" required placeholder="Full name" className="h-12 rounded-xl" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactEmail">Email *</Label>
              <Input id="contactEmail" name="contactEmail" type="email" required placeholder="you@school.edu" className="h-12 rounded-xl" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="countryCode">Country Code</Label>
              <Input id="countryCode" name="countryCode" defaultValue="GB" placeholder="GB, NG, US…" className="h-12 rounded-xl" />
            </div>
            {showStudentCount && (
              <div className="space-y-2">
                <Label htmlFor="studentCount">Approx. number of students</Label>
                <Input id="studentCount" name="studentCount" type="number" min={1} placeholder="30" className="h-12 rounded-xl" />
              </div>
            )}
            {showDate && (
              <div className="space-y-2">
                <Label htmlFor="preferredDate">Preferred date / term</Label>
                <Input id="preferredDate" name="preferredDate" placeholder="e.g. Autumn term 2026" className="h-12 rounded-xl" />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="message">Additional details</Label>
              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder="Tell us about your goals, year groups, or any questions…"
                className="flex w-full rounded-xl border border-brand-purple/15 dark:border-brand-gold/15 bg-brand-warm dark:bg-brand-purple-dark/50 px-3 py-2 text-sm"
              />
            </div>
            <Button type="submit" disabled={pending} className="w-full h-12 rounded-full bg-brand-purple dark:bg-brand-gold text-brand-cream dark:text-brand-purple-dark font-semibold">
              <Send className="h-4 w-4 mr-2" /> {pending ? "Sending…" : "Submit Request"}
            </Button>
          </form>
        )}
      </main>
    </div>
  );
}
