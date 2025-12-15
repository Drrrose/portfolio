"use client";

import { motion } from "framer-motion";
import { Mail, MessageSquare } from "lucide-react";
import Link from "next/link";
import { RESUME } from "@/data/resume";

export function Contact() {
  return (
    <section id="contact" className="py-20 w-full max-w-3xl mx-auto px-4 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="space-y-6 bg-card border border-border rounded-3xl p-8 sm:p-12 shadow-sm"
      >
        <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Get in Touch</h2>
            <p className="text-muted-foreground text-lg">
                Interested in working together? Feel free to reach out for collaborations or just a friendly hello.
            </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
             <Link
                href={`mailto:${RESUME.contact.email}`}
                className="inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors w-full sm:w-auto"
             >
                <Mail className="w-5 h-5 mr-2" />
                {RESUME.contact.email}
             </Link>
             <Link
                 href={RESUME.contact.social.LinkedIn.url}
                 target="_blank"
                 className="inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-full border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors w-full sm:w-auto"
             >
                <MessageSquare className="w-5 h-5 mr-2" />
                Connect on LinkedIn
             </Link>
        </div>
      </motion.div>
    </section>
  );
}
