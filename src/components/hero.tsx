"use client";

import { motion } from "framer-motion";
import { ArrowRight, FileText } from "lucide-react";
import Link from "next/link";
import { RESUME } from "@/data/resume";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section className="min-h-[90vh] flex flex-col justify-center items-start space-y-10 px-4 sm:px-8 max-w-5xl mx-auto relative">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="space-y-6"
      >
        <div className="inline-flex items-center space-x-2 px-3 py-1 bg-primary/10 rounded-full border border-primary/20 backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          <span className="text-xs font-semibold tracking-wide uppercase text-primary">
            Available for new opportunities
          </span>
        </div>
        
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter text-foreground leading-[0.9]">
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="block"
          >
            I&apos;m {RESUME.name}
          </motion.span>
          <motion.span 
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.4 }}
             className="text-primary block"
          >
            Backend Developer
          </motion.span>
        </h1>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="text-xl sm:text-2xl text-muted-foreground/80 max-w-2xl leading-relaxed font-medium"
      >
        {RESUME.about}
      </motion.p>
      
      <motion.div
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.8, delay: 0.8 }}
         className="flex flex-wrap gap-6"
      >
        <Link
          href="#contact"
          className={cn(
            "group relative inline-flex items-center justify-center rounded-full text-base font-bold transition-all duration-300",
            "bg-primary text-primary-foreground hover:shadow-[0_0_30px_-5px_hsl(var(--primary))]",
            "h-14 px-10 overflow-hidden"
          )}
        >
          <span className="relative z-10 flex items-center">
            Let&apos;s Talk <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </span>
        </Link>
        <Link
          href="https://drrrose.github.io/Mostafa-Ali-Cv/"
          target="_blank" 
          className={cn(
            "group inline-flex items-center justify-center rounded-full text-base font-bold transition-all duration-300",
            "border-2 border-border bg-background/50 backdrop-blur-md hover:border-primary hover:text-primary",
            "h-14 px-10"
          )}
        >
           Resume <FileText className="ml-2 h-5 w-5 opacity-50 group-hover:opacity-100 transition-opacity" />
        </Link>
      </motion.div>
    </section>
  );
}
