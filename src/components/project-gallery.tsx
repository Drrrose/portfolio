"use client";

import { motion } from "framer-motion";
import { RESUME } from "@/data/resume";
import { ProjectCard } from "@/components/project-card";

export function ProjectGallery() {
  return (
    <section id="projects" className="py-20 w-full max-w-5xl px-4 sm:px-8 mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="space-y-12"
      >
        <div className="flex flex-col items-start gap-4">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
            Featured Projects
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl">
                A selection of projects demonstrating backend expertise and full-stack capabilities.
            </p>
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
