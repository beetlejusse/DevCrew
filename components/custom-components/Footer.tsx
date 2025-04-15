"use client";

import { Code, GithubIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import {motion} from "framer-motion";

const Footer = () => {
  return (
    <footer className="border-t border-white/10 py-12 bg-[#050A14]">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div className="mb-8 md:mb-0 animate-fade-in-up">
            <div className="flex items-center gap-2 mb-4">
              <Code className="h-6 w-6 text-[#3B82F6] animate-pulse-slow" />
              <span className="text-xl font-bold font-space-grotesk">
                DevCrew
              </span>
            </div>
            <p className="text-white/60 max-w-[300px]">
              Connecting talented individuals to build amazing projects
              together.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div className="animate-fade-in-up animation-delay-300">
              <h3 className="font-semibold mb-3 font-space-grotesk">Product</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-white/60 hover:text-[#3B82F6] transition-colors duration-300 hover:translate-x-1 inline-block"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-white/60 hover:text-[#3B82F6] transition-colors duration-300 hover:translate-x-1 inline-block"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-white/60 hover:text-[#3B82F6] transition-colors duration-300 hover:translate-x-1 inline-block"
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div className="animate-fade-in-up animation-delay-400">
              <h3 className="font-semibold mb-3 font-space-grotesk">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-white/60 hover:text-[#3B82F6] transition-colors duration-300 hover:translate-x-1 inline-block"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-white/60 hover:text-[#3B82F6] transition-colors duration-300 hover:translate-x-1 inline-block"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-white/60 hover:text-[#3B82F6] transition-colors duration-300 hover:translate-x-1 inline-block"
                  >
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
            <div className="animate-fade-in-up animation-delay-500">
              <h3 className="font-semibold mb-3 font-space-grotesk">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-white/60 hover:text-[#3B82F6] transition-colors duration-300 hover:translate-x-1 inline-block"
                  >
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-white/60 hover:text-[#3B82F6] transition-colors duration-300 hover:translate-x-1 inline-block"
                  >
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 mt-12 pt-8 text-center text-white/60 animate-fade-in-up animation-delay-600">
          <p>© {new Date().getFullYear()} DevCrew. All rights reserved.</p>
          <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-6 text-center text-foreground/40 text-sm"
        >
          Made with ❤️ by{" "}
          <a href="https://github.com/beetlejusse" target="_blank" className="underline hover:text-vibrant-accent">
            beetlejusse
          </a>{" "}
          <GithubIcon className="inline w-4 h-4 ml-1" />
        </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
