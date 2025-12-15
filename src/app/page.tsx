import { Hero } from "@/components/hero";
import { TechMarquee } from "@/components/tech-marquee";
import { ProjectGallery } from "@/components/project-gallery";
import { Contact } from "@/components/contact";


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 sm:p-24 overflow-hidden relative">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex"></div>
      <Hero />
      <TechMarquee />
      <ProjectGallery />
      <Contact />
    </main>
  );
}
