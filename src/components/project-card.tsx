"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

interface ProjectCardProps {
  title: string;
  description: string;
  techStack: readonly string[];
  link?: { label: string; href: string };
}

export function ProjectCard({ title, description, techStack, link }: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/5 bg-white/5 backdrop-blur-md text-card-foreground shadow-2xl transition-all h-full"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative p-8 z-10 flex flex-col h-full">
        <div className="mb-6 flex items-start justify-between">
            <div className="space-y-1">
                <h3 className="font-bold leading-tight tracking-tight text-2xl group-hover:text-primary transition-colors duration-300">
                  {title}
                </h3>
            </div>
            {link && (
                 <Link 
                  href={link.href} 
                  target="_blank" 
                  className="p-2 rounded-full bg-white/5 text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 transform group-hover:rotate-12"
                 >
                    <ArrowUpRight className="h-5 w-5" />
                 </Link>
            )}
        </div>
        <p className="text-muted-foreground/80 leading-relaxed mb-8 font-medium">
          {description}
        </p>
        <div className="flex flex-wrap gap-2 mt-auto">
          {techStack.map((tech) => (
            <Badge
              key={tech}
              variant="secondary"
              className="bg-white/5 border-white/10 text-xs font-bold uppercase tracking-wider px-3 py-1 hover:bg-primary/20 hover:text-primary transition-colors"
            >
              {tech}
            </Badge>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
