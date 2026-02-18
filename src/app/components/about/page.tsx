"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { SplitText } from "gsap/dist/SplitText";
import { User, Sparkles } from "lucide-react";

function About() {
  const descriptionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!descriptionRef.current) return;

    gsap.registerPlugin(SplitText, ScrollTrigger);

    const split = new SplitText(descriptionRef.current, {
      type: "words",
    });

    gsap.from(split.words, {
      opacity: 0,
      y: 30,
      rotateX: -45,
      stagger: 0.015,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: descriptionRef.current,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    return () => split.revert();
  }, { dependencies: [], revertOnUpdate: true });

  return (
    <div id="about" className="relative py-16 lg:py-24 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/4 -left-20 w-[400px] h-[400px] bg-[#61DAFB]/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-[400px] h-[400px] bg-[#20232A]/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="w-full flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3 text-[#61DAFB] mb-2">
              <div className="w-10 h-10 rounded-xl bg-[#61DAFB]/10 flex items-center justify-center">
                <User className="w-5 h-5 shadow-[0_0_15px_rgba(97, 218, 251, 0.3)]" />
              </div>
              <span className="text-sm font-bold uppercase tracking-[0.3em]">
                Discovery
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
              About{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#61DAFB] to-[#282C34]">
                The Architect
              </span>
            </h2>
          </div>

          <div className="relative group p-8 lg:p-10 rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-3xl overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-700">
              <Sparkles className="w-24 h-24 text-[#61DAFB]" />
            </div>

            <div
              ref={descriptionRef}
              className="about-description text-slate-300 text-lg lg:text-xl leading-relaxed text-justify font-medium italic"
            >
              I&apos;m Driss Laaziri, a Full-Stack Developer based in Montreal
              specializing in React, Next.js, TypeScript, C#, and .NET. I
              build responsive, scalable web and mobile applications from
              concept to deployment. With hands-on experience across frontend,
              backend, and database layers, I focus on writing clean code that
              solves real problems. I&apos;m currently a Computer Science
              student at LaSalle College, actively seeking software development
              internships to grow and contribute to real-world projects.
            </div>

            {/* Decorative Accent */}
            <div className="absolute w-1 h-20 bg-gradient-to-b from-[#61DAFB] to-transparent left-0 top-10 rounded-full" />
          </div>

          <div className="flex flex-wrap justify-center items-center gap-8 mt-4 w-full text-center">
            <div className="flex flex-col items-center">
              <span className="text-3xl font-black text-white">2+</span>
              <span className="text-xs text-slate-500 uppercase tracking-widest font-bold">
                Years Experience
              </span>
            </div>
            <div className="hidden sm:block w-[1px] h-10 bg-white/10" />
            <div className="flex flex-col items-center">
              <span className="text-3xl font-black text-white">20+</span>
              <span className="text-xs text-slate-500 uppercase tracking-widest font-bold">
                Global Projects
              </span>
            </div>
            <div className="hidden sm:block w-[1px] h-10 bg-white/10" />
            <div className="flex flex-col items-center">
              <span className="text-3xl font-black text-white">10+</span>
              <span className="text-xs text-slate-500 uppercase tracking-widest font-bold">
                Tech Mastered
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
