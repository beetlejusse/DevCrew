"use client";

import React, { useState, useRef } from "react";
import { Sparkles, ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import CTA from "@/components/custom-components/CTA";
import Footer from "@/components/custom-components/Footer";
import Working from "@/components/custom-components/Working";
import SignupPage from "@/app/(auth)/sign-up/page";
import SignIn from "@/app/(auth)/sign-in/page";

const Landingpage = () => {
  const [openSignupModal, setOpenSignupModal] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const workingRef = useRef<HTMLDivElement>(null);

  const scrollToWorking = () => {
    if (workingRef.current) {
      workingRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <section className="relative py-20 md:py-32 overflow-hidden">
        {/* Background Gradient Circles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-[30%] -left-[10%] w-[70%] h-[70%] rounded-full bg-[#3B82F6]/10 blur-[120px] animate-pulse-slow"></div>
          <div className="absolute -bottom-[30%] -right-[10%] w-[70%] h-[70%] rounded-full bg-[#3B82F6]/10 blur-[120px] animate-pulse-slow animation-delay-2000"></div>
          <div className="absolute top-[20%] right-[10%] w-[40%] h-[40%] rounded-full bg-[#8B5CF6]/10 blur-[120px] animate-pulse-slow animation-delay-1000"></div>
        </div>

        {/* Main Container */}
        <div className="container relative z-10">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center px-3 py-1 mb-6 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm animate-fade-in-down">
              <Sparkles className="h-4 w-4 mr-2 text-[#3B82F6] animate-pulse" />
              <span className="text-sm font-medium text-white/80">
                Find your perfect team in minutes
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight font-space-grotesk mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70 animate-fade-in-up">
              Build Something{" "}
              <span className="text-[#3B82F6] animate-gradient-x">Amazing</span>{" "}
              Together
            </h1>

            <p className="max-w-[600px] text-lg text-white/70 mb-10 animate-fade-in-up animation-delay-300">
              Connect with talented developers, designers, and innovators who
              share your passion for building groundbreaking projects.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-500">
              <Button
                size="lg"
                onClick={() => setOpenSignupModal(true)}
                className="bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-full px-8 h-14 text-base transition-all duration-300 hover:shadow-glow hover:scale-105"
              >
                Get started{" "}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                onClick={scrollToWorking}
                className="text-white border-white/20 hover:bg-white/10 rounded-full px-8 h-14 text-base transition-all duration-300"
              >
                Learn More
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mt-20 max-w-4xl mx-auto">
            <div className="flex flex-col items-center p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 transition-all duration-500 hover:bg-white/10 hover:scale-105 hover:shadow-glow animate-fade-in-up animation-delay-600">
              <span
                className="text-3xl md:text-4xl font-bold font-space-grotesk text-white mb-1 animate-count-up"
                data-value="5000"
              >
                5K+
              </span>
              <span className="text-sm text-white/60">Developers</span>
            </div>
            <div className="flex flex-col items-center p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 transition-all duration-500 hover:bg-white/10 hover:scale-105 hover:shadow-glow animate-fade-in-up animation-delay-700">
              <span
                className="text-3xl md:text-4xl font-bold font-space-grotesk text-white mb-1 animate-count-up"
                data-value="200"
              >
                200+
              </span>
              <span className="text-sm text-white/60">Hackathons</span>
            </div>
            <div className="flex flex-col items-center p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 transition-all duration-500 hover:bg-white/10 hover:scale-105 hover:shadow-glow animate-fade-in-up animation-delay-800">
              <span
                className="text-3xl md:text-4xl font-bold font-space-grotesk text-white mb-1 animate-count-up"
                data-value="1200"
              >
                1.2K
              </span>
              <span className="text-sm text-white/60">Teams Formed</span>
            </div>
            <div className="flex flex-col items-center p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 transition-all duration-500 hover:bg-white/10 hover:scale-105 hover:shadow-glow animate-fade-in-up animation-delay-900">
              <span
                className="text-3xl md:text-4xl font-bold font-space-grotesk text-white mb-1 animate-count-up"
                data-value="98"
              >
                98%
              </span>
              <span className="text-sm text-white/60">Success Rate</span>
            </div>
          </div>
        </div>

        <div className="fixed bottom-5 right-5 z-50">
          <a
            href="https://github.com/beetlejusse/DevCrew"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white text-sm font-medium backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
          >
            <Star className="h-4 w-4 mr-2 text-[#3B82F6] animate-pulse" />
            Star on GitHub
          </a>
        </div>
      </section>

      {/* Working Section Reference for Smooth Scroll */}
      <div ref={workingRef}>
        <Working />
      </div>

      <CTA onOpenSignInModal={() => setShowSignIn(true)} />
      <Footer />

      <SignIn open={showSignIn} onClose={() => setShowSignIn(false)} onSwitchToSignUp={() => setOpenSignupModal(true)} />
      <SignupPage
        open={openSignupModal}
        onClose={() => setOpenSignupModal(false)}
        onSwitchToSignIn={() => setShowSignIn(true)}
      />
    </>
  );
};

export default Landingpage;
