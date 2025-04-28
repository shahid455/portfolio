"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";

const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center bg-[#121212]">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Left Content */}
        <div className="col-span-7 flex flex-col justify-center text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600">
            Hello, I'm Shahidul Hasan
          </h1>

          <div className="text-white text-3xl sm:text-4xl lg:text-6xl font-extrabold mb-6 h-16 flex items-center justify-center md:justify-start">
            <TypeAnimation
              sequence={[
                "Cybersecurity Engineer", 2000,
                "Full Stack Developer", 2000,
                "DAA Enthusiate", 2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </div>

          <p className="text-gray-400 text-base sm:text-lg mb-8 max-w-xl">
            I specialize in building secure, scalable applications and ensuring resilience against cyber threats.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center md:justify-start">
            <Link href="#contact">
              <button className="px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:opacity-90 transition">
                Hire Me
              </button>
            </Link>
            <Link href="/ShahidulHasanCV.pdf" download>
              <button className="px-8 py-4 rounded-full border border-pink-500 text-white hover:bg-slate-800 transition">
                Download CV
              </button>
            </Link>
          </div>
        </div>

        {/* Right Image */}
        <div className="col-span-5 flex justify-center items-center">
          <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full bg-[#181818] overflow-hidden">
            <Image
              src="/shahid.jpg" // Replace with your image
              alt="Profile Image"
              layout="fill"
              objectFit="cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
