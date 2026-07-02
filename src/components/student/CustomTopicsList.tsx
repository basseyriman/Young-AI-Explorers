"use client";

import { useState } from "react";
import { PlayCircle, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface CustomTopic {
  id: string;
  title: string;
  description: string;
  contentStatus?: string;
  badgeName?: string | null;
}

interface CustomTopicsListProps {
  customTopics: CustomTopic[];
  earnedBadges: (string | number)[];
  userProgress: { topic_id: string; status: string }[];
  badgesLabel: string;
  completedLabel: string;
  preparingLabel: string;
  startLabel: string;
  continueLabel: string;
  reviewLabel: string;
  titleLabel: string;
}

export function CustomTopicsList({
  customTopics,
  earnedBadges,
  userProgress,
  badgesLabel,
  completedLabel,
  preparingLabel,
  startLabel,
  continueLabel,
  reviewLabel,
  titleLabel,
}: CustomTopicsListProps) {
  const [showAll, setShowAll] = useState(false);

  const displayedTopics = showAll ? customTopics : customTopics.slice(0, 3);
  const hasMore = customTopics.length > 3;

  return (
    <div className="rounded-2xl border border-brand-gold/20 bg-brand-gold/5 p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-heading font-bold flex items-center gap-2">
          <span aria-hidden>✨</span> {titleLabel}
        </h3>
        {hasMore && (
          <span className="text-xs text-brand-purple/50 dark:text-brand-cream/65 font-medium">
            Showing {displayedTopics.length} of {customTopics.length}
          </span>
        )}
      </div>

      <div className="space-y-3">
        {displayedTopics.map((tCustom) => {
          const isReady = tCustom.contentStatus === "ready";
          const isDone = earnedBadges.map(String).includes(tCustom.id);
          const progressRow = userProgress.find((p) => String(p.topic_id) === String(tCustom.id));
          const isInProgress = progressRow?.status === "in_progress" && !isDone;

          return (
            <div
              key={tCustom.id}
              className="p-4 rounded-xl bg-brand-surface dark:bg-brand-purple-dark border border-brand-gold/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex-1">
                <div className="font-semibold text-sm flex items-center gap-2 text-brand-purple dark:text-brand-cream">
                  {tCustom.title}
                  {isDone && (
                    <span className="text-[10px] uppercase text-emerald-600 font-bold">
                      {completedLabel}
                    </span>
                  )}
                  {isInProgress && (
                    <span className="text-[10px] uppercase text-amber-500 font-bold">
                      In Progress
                    </span>
                  )}
                </div>
                <div className="text-xs text-brand-purple/70 dark:text-brand-cream/85 mt-1 leading-relaxed">
                  {tCustom.description}
                </div>
                {tCustom.badgeName && isReady && (
                  <div className="text-[10px] uppercase tracking-wider text-brand-gold mt-1">
                    {badgesLabel}: {tCustom.badgeName}
                  </div>
                )}

                {/* Progress Bar / Indicator */}
                {isReady && (
                  <div className="mt-2.5 max-w-xs">
                    {isInProgress ? (
                      <>
                        <div className="flex justify-between items-center text-[10px] font-semibold text-amber-600 dark:text-amber-400 mb-1">
                          <span>In Progress</span>
                          <span>50%</span>
                        </div>
                        <div className="w-full h-1.5 bg-brand-purple/10 dark:bg-brand-gold/10 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-500 rounded-full w-1/2" />
                        </div>
                      </>
                    ) : isDone ? (
                      <>
                        <div className="flex justify-between items-center text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 mb-1">
                          <span>Completed</span>
                          <span>100%</span>
                        </div>
                        <div className="w-full h-1.5 bg-brand-purple/10 dark:bg-brand-gold/10 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500 rounded-full w-full" />
                        </div>
                      </>
                    ) : null}
                  </div>
                )}
              </div>

              {isReady ? (
                <Link href={`/lesson/${tCustom.id}`} className="shrink-0">
                  <Button
                    size="sm"
                    className={`rounded-full shrink-0 w-full sm:w-auto ${
                      isDone
                        ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                        : isInProgress
                        ? "bg-amber-500 hover:bg-amber-600 text-white"
                        : "bg-brand-purple dark:bg-brand-gold text-brand-cream dark:text-brand-purple-dark"
                    }`}
                  >
                    <PlayCircle className="h-4 w-4 mr-1.5" />{" "}
                    {isDone ? reviewLabel : isInProgress ? continueLabel : startLabel}
                  </Button>
                </Link>
              ) : (
                <span className="text-xs text-brand-purple/45 italic shrink-0">
                  {preparingLabel}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {hasMore && (
        <div className="flex justify-center pt-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setShowAll(!showAll)}
            className="text-xs font-bold text-brand-purple/65 dark:text-brand-gold hover:bg-brand-purple/5 hover:text-brand-purple dark:hover:bg-brand-gold/10 rounded-full"
          >
            {showAll ? (
              <>
                <ChevronUp className="h-4 w-4 mr-1" /> Show Less
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4 mr-1" /> Show More ({customTopics.length - 3} more)
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
