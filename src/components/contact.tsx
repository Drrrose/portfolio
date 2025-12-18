"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import Link from "next/link";
import { RESUME } from "@/data/resume";
import { WhatsappIcon } from "@/components/icons/whatsapp-icon";

export function Contact() {
  return (
    <section id="contact" className="py-32 w-full max-w-4xl mx-auto px-4 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative space-y-8 bg-white/5 border border-white/10 backdrop-blur-xl rounded-[2.5rem] p-10 sm:p-20 shadow-2xl overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 pointer-events-none" />
        
        <div className="relative space-y-4">
            <h2 className="text-4xl sm:text-5xl font-black tracking-tighter text-foreground">
              Let&apos;s Build Something <span className="text-primary italic">Epic</span>
            </h2>
            <p className="text-muted-foreground/80 text-xl max-w-xl mx-auto font-medium">
                Whether you have a project in mind or just want to say hi, my inbox is always open.
            </p>
        </div>

        <div className="relative flex flex-col sm:flex-row items-center justify-center gap-6 pt-6">
             <Link
                href={`mailto:${RESUME.contact.email}`}
                className="group relative inline-flex items-center justify-center px-10 py-5 text-lg font-bold rounded-full bg-primary text-primary-foreground hover:shadow-[0_0_30px_-10px_hsl(var(--primary))] transition-all duration-300 w-full sm:w-auto overflow-hidden"
             >
                <Mail className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                {RESUME.contact.email}
             </Link>
             <Link
                 href={RESUME.contact.social.WhatsApp.url}
                 target="_blank"
                 className="group inline-flex items-center justify-center px-10 py-5 text-lg font-bold rounded-full border-2 border-white/10 bg-white/5 backdrop-blur-md hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 w-full sm:w-auto"
             >
                <WhatsappIcon className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
                WhatsApp
             </Link>
        </div>
      </motion.div>
    </section>
  );
}
