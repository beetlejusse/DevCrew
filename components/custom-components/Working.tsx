"use client";

import React from "react";

const Working = () => {
  return (
    <section id="how-it-works" className="py-20 relative">
      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold font-space-grotesk mb-4">
              How DevCrew Works
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Our platform makes it easy to find the perfect teammates for your
              next hackathon or project
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative animate-fade-in-left">
              <div className="absolute -top-4 -left-4 w-20 h-20 bg-[#3B82F6]/10 rounded-full blur-xl animate-pulse-slow"></div>
              <div className="relative z-10 p-6 rounded-xl bg-white/5 border border-white/10 h-full flex flex-col transition-all duration-500 hover:bg-white/10 hover:scale-105 hover:shadow-glow">
                <div className="h-12 w-12 rounded-full bg-[#3B82F6]/20 flex items-center justify-center mb-4 animate-float">
                  <span className="text-xl font-bold font-space-grotesk text-[#3B82F6]">
                    1
                  </span>
                </div>
                <h3 className="text-xl font-bold font-space-grotesk mb-2">
                  Create Your Profile
                </h3>
                <p className="text-white/70 flex-grow">
                  Showcase your skills, experience, and the hackathons you're
                  interested in.
                </p>
              </div>
            </div>

            <div className="relative mt-8 md:mt-12 animate-fade-in-up animation-delay-300">
              <div className="absolute -top-4 -left-4 w-20 h-20 bg-[#3B82F6]/10 rounded-full blur-xl animate-pulse-slow animation-delay-1000"></div>
              <div className="relative z-10 p-6 rounded-xl bg-white/5 border border-white/10 h-full flex flex-col transition-all duration-500 hover:bg-white/10 hover:scale-105 hover:shadow-glow">
                <div className="h-12 w-12 rounded-full bg-[#3B82F6]/20 flex items-center justify-center mb-4 animate-float animation-delay-1000">
                  <span className="text-xl font-bold font-space-grotesk text-[#3B82F6]">
                    2
                  </span>
                </div>
                <h3 className="text-xl font-bold font-space-grotesk mb-2">
                  Match With Teams
                </h3>
                <p className="text-white/70 flex-grow">
                  Our AI matches you with potential teammates based on skills,
                  interests, and goals.
                </p>
              </div>
            </div>

            <div className="relative mt-8 md:mt-24 animate-fade-in-right animation-delay-600">
              <div className="absolute -top-4 -left-4 w-20 h-20 bg-[#3B82F6]/10 rounded-full blur-xl animate-pulse-slow animation-delay-2000"></div>
              <div className="relative z-10 p-6 rounded-xl bg-white/5 border border-white/10 h-full flex flex-col transition-all duration-500 hover:bg-white/10 hover:scale-105 hover:shadow-glow">
                <div className="h-12 w-12 rounded-full bg-[#3B82F6]/20 flex items-center justify-center mb-4 animate-float animation-delay-2000">
                  <span className="text-xl font-bold font-space-grotesk text-[#3B82F6]">
                    3
                  </span>
                </div>
                <h3 className="text-xl font-bold font-space-grotesk mb-2">
                  Collaborate & Win
                </h3>
                <p className="text-white/70 flex-grow">
                  Connect through our platform, build your project, and achieve
                  success together.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Working;
