"use client"
import { Button } from "@/app/components/Button";
import starBg from "@/assets/stars.png";
import gridLines from "@/assets/grid-lines.png";
import {motion ,useMotionTemplate,useMotionValue,useScroll, useTransform } from 'framer-motion'
import { RefObject, useEffect, useRef } from "react";

const useRelativeMousePosition = (to: RefObject<HTMLElement>) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);


   const updateMousePosition = (event: MouseEvent) =>{
    if (!to.current) return;
    const {top, left} = to.current?.getBoundingClientRect()
    mouseX.set(event.x - left);
    mouseY.set(event.y - top);

   }
  useEffect(() => {
  window.addEventListener('mousemove',updateMousePosition);

  return ()=>{
    window.removeEventListener('mousemove',updateMousePosition);

  }
  }, []);

   return [mouseX,mouseY];
}


export const CallToAction = () => {
  const sectionRef =useRef<HTMLElement>(null);
  const borderedDivRef = useRef<HTMLDivElement>(null);
  const {scrollYProgress} = useScroll({
    target:sectionRef,
    offset: ['start end' ,'end start'],
  });

  const backgroundPositionY = useTransform(
    scrollYProgress,
    [0,1],
    [-300,300])


    const [mouseX, mouseY] = useRelativeMousePosition(borderedDivRef);
    const imageMask = useMotionTemplate`radial-gradient(50% 50% at ${mouseX}px ${mouseY}px,black,transparent`;

  return (
    <section ref={sectionRef} className="py-20 md:py-24">
      <div className="container">
        <motion.div
        ref={borderedDivRef}
         className="border border-white/10 py-24 rounded-xl overflow-hidden relative group" 
         animate={{
          backgroundPositionX: starBg.width,
          
        }}
        transition={{
          repeat:Infinity,
          ease:"linear",
          duration:120,
        }}
        
         style={{
          backgroundPositionY,
          backgroundImage: `url(${starBg.src})`,
        }}
        >
          <div 
          className="absolute inset-0 bg-[rgb(74,32,138)] bg-blend-overlay  [mask-image:radial-gradient(50%_50%_at_50%_35%,black,transparent)] group-hover:opacity-0 transition duration-700" 
          style={{
            backgroundImage: `url(${gridLines.src})`
          }}
          >

          </div>

          <motion.div 
          className="absolute inset-0 bg-[rgb(74,32,138)] bg-blend-overlay  opacity-0 group-hover:opacity-100 transition duration-700" 
          style={{
            maskImage: imageMask, 
            backgroundImage: `url(${gridLines.src})`
          }}
          >
 </motion.div>


          <div className="relative">
        <h2 className="text-5xl md:text-6xl max-w-sm mx-auto tracking-tighter text-center font-medium">AI-driven SEO for everyone </h2>
        <p className="text-center text-lg md:text-xl max-w-sm mx-auto text-white/70 px-4 mt-5 tracking-tight">Achieve clear, impactiful results without the complexity </p>
       <div className="flex justify-center mt-8">
        <Button>Join waitlist</Button>
        </div>
        </div>
        </motion.div>
      </div>
    </section>
  );
};
