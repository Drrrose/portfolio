"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge"; // We'll implement a simple badge or use inline
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card"; // We'll need to create these standard UI components or simplify

// Simplified Card without dependencies for now to avoid complexity unless I scafold shadcn
// I will build a custom Card component here to avoid multiple files for one standard component
// or I will scaffold the ui/card component. Given the instructions "avoid ad-hoc utilities", I should making components.
// I'll create a simple Card implementation herein or separate. separate is better for "Assemble Pages".

interface ProjectCardProps {
  title: string;
  description: string;
  techStack: readonly string[];
  link?: { label: string; href: string };
}

export function ProjectCard({ title, description, techStack, link }: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md h-full"
    >
      <div className="p-6">
        <div className="mb-4 flex items-center justify-between">
            <div className="space-y-1">
                <h3 className="font-semibold leading-none tracking-tight text-xl">{title}</h3>
            </div>
            {link && (
                 <Link href={link.href} target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
                    <ArrowUpRight className="h-5 w-5" />
                 </Link>
            )}
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed mb-6">
          {description}
        </p>
        <div className="flex flex-wrap gap-2 mt-auto">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center rounded-md border border-transparent bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground transition-colors hover:bg-secondary/80"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
