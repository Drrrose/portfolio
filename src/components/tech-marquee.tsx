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
      <div className="relative flex w-full overflow-x-hidden py-4">
        <div className="animate-marquee whitespace-nowrap flex gap-12">
            {/* Double the list for seamless loop */}
          {[...RESUME.skills, ...RESUME.skills, ...RESUME.skills].map((skill, index) => (
            <div
              key={index}
              className="group relative inline-flex items-center justify-center px-8 py-4 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-sm text-foreground transition-all duration-300 hover:border-primary/50 hover:bg-white/10"
            >
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 blur-xl transition-opacity" />
              <span className="relative text-xl font-bold tracking-tight opacity-70 group-hover:opacity-100 transition-opacity">{skill}</span>
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
