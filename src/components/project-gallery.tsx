"use client";

import { motion } from "framer-motion";
import { RESUME } from "@/data/resume";
import { ProjectCard } from "@/components/project-card";

export function ProjectGallery() {
  return (
    <section id="projects" className="py-32 w-full max-w-6xl px-4 sm:px-8 mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="space-y-16"
      >
        <div className="flex flex-col items-center text-center gap-6">
            <h2 className="text-5xl sm:text-6xl font-black tracking-tighter text-foreground">
              Selected <span className="text-primary">Works</span>
            </h2>
            <p className="text-muted-foreground/80 text-xl max-w-2xl font-medium leading-relaxed">
                A showcase of my recent backend and full-stack projects, built with performance and scalability in mind.
            </p>
            <div className="h-1.5 w-24 bg-primary rounded-full" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {RESUME.projects.map((project, index) => (
            <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
            >
                <ProjectCard
                title={project.title}
                description={project.description}
                techStack={project.techStack}
                link={project.link}
                />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
