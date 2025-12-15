"use client";

import { motion } from "framer-motion";
import { RESUME } from "@/data/resume";

export function TechMarquee() {
  return (
    <section className="py-20 w-full overflow-hidden">
        <div className="mb-8 text-center">
            <h2 className="text-2xl font-semibold tracking-tighter sm:text-3xl text-muted-foreground">
                Technologies
            </h2>
        </div>
      <div className="relative flex w-full overflow-x-hidden">
        <div className="animate-marquee whitespace-nowrap flex gap-8">
            {/* Double the list for seamless loop */}
          {[...RESUME.skills, ...RESUME.skills].map((skill, index) => (
            <div
              key={index}
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl border border-border bg-card text-card-foreground shadow-sm"
            >
              <span className="text-lg font-medium">{skill}</span>
            </div>
          ))}
           {[...RESUME.skills, ...RESUME.skills].map((skill, index) => (
            <div
              key={`dup-${index}`}
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl border border-border bg-card text-card-foreground shadow-sm"
            >
              <span className="text-lg font-medium">{skill}</span>
            </div>
          ))}
        </div>
        
        {/* Gradients for fade effect */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background to-transparent"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background to-transparent"></div>
      </div>
    </section>
  );
}
