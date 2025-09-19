"use client";
import React, { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import axios from "axios";

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

export default function LandingPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  async function getUser() {
    try {
      if (isLoaded && user) {
        await axios.post("/api/user", {
          name: user.firstName,
          email: user.primaryEmailAddress?.emailAddress,
        });
        router.push("/workspace");
      }
    } catch (err) {
      console.error("Error saving user:", err);
    }
  }

  // Optional: auto redirect when logged in
  useEffect(() => {
    if (isLoaded && user) {
      getUser();
    }
  }, [isLoaded, user]);

  if (!isLoaded) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-blue-100 text-gray-800 font-sans">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-lg font-semibold">Career Guidance</h1>
          <button
            className="rounded-md px-4 py-2 bg-blue-600 text-white shadow hover:bg-blue-700"
            onClick={getUser}
          >
            Get Started
          </button>
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
              <button
                className="inline-flex items-center justify-center rounded-lg bg-blue-600 text-white px-6 py-3 font-semibold shadow hover:scale-105 hover:bg-blue-700 transition transform"
                onClick={getUser}
              >
                Explore
              </button>
              <a
                href="#process"
                className="inline-flex items-center justify-center rounded-lg border border-blue-600 px-6 py-3 text-blue-600 hover:bg-blue-50 transition transform hover:scale-105"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
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
      <footer className="bg-white/80 backdrop-blur-md border-t mt-8">
        <div className="border-t px-6 py-4 text-xs text-gray-500 text-center">
          © {new Date().getFullYear()} Career Guidance • SIH Presentation
        </div>
      </footer>
    </div>
  );
}
