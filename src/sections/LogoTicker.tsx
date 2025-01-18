"use client";

import acmeLogo from "@/assets/logo-acme.png";
import apexLogo from "@/assets/logo-apex.png";
import celestialLogo from "@/assets/logo-celestial.png";
import quantumLogo from "@/assets/logo-quantum.png";
import pulseLogo from "@/assets/logo-pulse.png";
import echoLogo from "@/assets/logo-echo.png";
import { motion } from "framer-motion";
import Image from "next/image";

const logos = [acmeLogo, pulseLogo, echoLogo, celestialLogo, apexLogo, quantumLogo];

export const LogoTicker = () => {
  return (
    <section className="py-20 md:py-24">
      <div className="container">
        <div className="flex items-center gap-5">
          {/* Title Section */}
          <div className="flex-1 md:flex-none">
            <h2>Trusted by top innovative teams</h2>
          </div>
          
          {/* Logo Ticker */}
          <div className="flex flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]">
            <motion.div
              className="flex flex-none gap-14"
              initial={{ translateX: "-50%" }}
              animate={{ translateX: "0" }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "linear",
                repeatType: "loop",
              }}
            >
              {[...logos, ...logos].map((logo, index) => (
                <Image
                  src={logo}
                  alt={`Logo ${index + 1}`}
                  key={`logo-${index}`}
                  className="h-6 w-auto"
                  width={500}
                  height={300}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
