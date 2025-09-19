"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { useRouter } from "next/navigation";
export default function LandingPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  async function getUser() {
    if (isLoaded && user) {
      const log = await axios.post("/api/user", {
        name: user?.firstName,
        email: user?.primaryEmailAddress?.emailAddress,
      });
      router.push("/workspace");
    }
  }
  return (
    isLoaded && (
      <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-blue-100 text-gray-800 font-sans">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-800 font-bold text-sm shadow">
                CG
              </div>
              <div>
                <h1 className="text-lg font-semibold tracking-wide">
                  Career Guidance
                </h1>
                <p className="text-xs text-gray-500">
                  Navigate Your Future with Smart Career Choices
                </p>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
              <a
                href="#about"
                className="hover:text-blue-700 transition-colors duration-200"
              >
                About
              </a>
              <a
                href="#process"
                className="hover:text-blue-700 transition-colors duration-200"
              >
                Process
              </a>
              <a
                href="#contact"
                className="hover:text-blue-700 transition-colors duration-200"
              >
                Contact
              </a>
              <button
                className="ml-2 rounded-md px-4 py-2 bg-blue-600 text-white text-sm shadow hover:bg-blue-700 transition transform hover:scale-105"
                onClick={() => router.push("/workspace")}
              >
                Get Started
              </button>
            </nav>

            <div className="md:hidden">
              <button className="px-3 py-2 rounded-md border border-gray-300 shadow-sm hover:bg-blue-50 transition">
                Menu
              </button>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="bg-transparent text-gray-900">
          <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28 flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1">
              <h2 className="text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight">
                Empowering Students with Smart Career Guidance
              </h2>
              <p className="mt-4 text-lg sm:text-xl text-gray-600 max-w-xl">
                Discover your strengths, explore career paths, and take the next
                step towards a brighter future with AI-powered guidance.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <div
                  className="inline-flex items-center justify-center rounded-lg
                  bg-blue-600 text-white px-6 py-3 font-semibold shadow
                  hover:scale-105 hover:bg-blue-700 transition transform"
                  onClick={getUser}
                >
                  Explore
                </div>
                <a
                  href="#process"
                  className="inline-flex items-center justify-center rounded-lg border border-blue-600 px-6 py-3 text-blue-600 hover:bg-blue-50 transition transform hover:scale-105"
                >
                  Learn More
                </a>
              </div>
            </div>

            <div className="flex-1 w-full">
              <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-xl max-w-md mx-auto text-gray-800 border border-gray-200 transition transform hover:scale-105">
                <h3 className="font-semibold text-lg">
                  Career Dashboard Preview
                </h3>
                <div className="mt-4 border rounded-lg p-3 bg-white/80 backdrop-blur-sm shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-blue-100 flex items-center justify-center text-sm">
                      🎯
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">Personalized Path</div>
                      <div className="text-xs text-gray-500">
                        Based on skills & interests
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2 bg-white/80 rounded shadow-sm hover:shadow-md transition">
                      🤖 AI Resume Analyzer
                      <div className="text-[10px] text-gray-500 mt-1">
                        Matches you with best-fit careers
                      </div>
                    </div>

                    <div className="p-2 bg-white/80 rounded shadow-sm hover:shadow-md transition">
                      🗺️ AI Roadmap Agent
                      <div className="text-[10px] text-gray-500 mt-1">
                        Provides a step-by-step career plan
                      </div>
                    </div>

                    <div className="p-2 bg-white/80 rounded shadow-sm hover:shadow-md transition">
                      📊 Aptitude Test
                      <div className="text-[10px] text-gray-500 mt-1">
                        Helps assess skills and real-world opportunities
                      </div>
                    </div>

                    <div className="p-2 bg-white/80 rounded shadow-sm hover:shadow-md transition">
                      🎓 AI Career Coach
                      <div className="text-[10px] text-gray-500 mt-1">
                        Provides personalized guidance and mentorship
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-sm text-gray-500">
                  Preview of tools available for students to shape their career
                  path.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="max-w-7xl mx-auto px-6 py-16">
          <h3 className="text-2xl font-bold tracking-wide">
            Why Career Guidance?
          </h3>
          <p className="mt-2 text-gray-600 max-w-2xl leading-relaxed">
            Choosing the right career is one of the most important decisions in
            a student’s life. Our platform helps students make informed choices
            using AI-driven insights and real-world data.
          </p>
        </section>

        {/* Process */}
        <section id="process" className="max-w-7xl mx-auto px-6 py-16">
          <h3 className="text-2xl font-bold tracking-wide">How It Works</h3>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {STEPS.map((s, idx) => (
              <div
                key={s.title}
                className="bg-white/70 backdrop-blur-md rounded-xl p-6 shadow hover:shadow-lg transition transform hover:scale-105 border border-gray-200"
              >
                <div className="flex items-center gap-4">
                  <div className="rounded-full w-10 h-10 flex items-center justify-center bg-blue-100 text-gray-700 font-bold">
                    {idx + 1}
                  </div>
                  <div className="font-semibold">{s.title}</div>
                </div>
                <div className="mt-3 text-sm text-gray-500">{s.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer
          id="contact"
          className="bg-white/80 backdrop-blur-md border-t mt-8"
        >
          <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-bold tracking-wide">Career Guidance</h4>
              <p className="mt-2 text-sm text-gray-600">
                Helping students navigate career paths with AI-powered insights.
              </p>
            </div>

            <div>
              <h4 className="font-semibold tracking-wide">Quick links</h4>
              <ul className="mt-3 text-sm text-gray-600 space-y-2">
                <li>
                  <a href="#about" className="hover:text-blue-700 transition">
                    About
                  </a>
                </li>
                <li>
                  <a href="#process" className="hover:text-blue-700 transition">
                    Process
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold tracking-wide">Contact</h4>
              <div className="mt-3 text-sm text-gray-600">
                Email: hello@careerguidance.com
              </div>
              <div className="mt-2 text-sm text-gray-600">
                Phone: +91 99999 99999
              </div>
            </div>
          </div>

          <div className="border-t px-6 py-4 text-xs text-gray-500 text-center">
            © {new Date().getFullYear()} Career Guidance • SIH Presentation
          </div>
        </footer>
      </div>
    )
  );
}

const STEPS = [
  {
    title: "Assessment",
    desc: "Students complete a quick skills & interests test.",
  },
  {
    title: "AI Matching",
    desc: "Our system maps students to suitable careers.",
  },
  {
    title: "Guided Roadmap",
    desc: "Get a step-by-step plan with resources to achieve goals.",
  },
];
