"use client";

import { useEffect, useState, useRef } from "react";
import { ReactSVG } from "react-svg";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { RiArrowDownDoubleFill } from "react-icons/ri";

export default function Scene() {
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
  const sceneRef = useRef<HTMLDivElement>(null);
  const svgContainerRef = useRef<HTMLDivElement>(null);
  const mainContainerRef = useRef<HTMLElement>(null);
  
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  });

  const descriptionText =
    "Un ciel texturé, des nuages teintés de rose et d'orange, une lumière qui transforme chaque photo en un moment suspendu. Sunset Dream, c'est la scène parfaite entre douceur et intensité, comme un coucher de soleil que tu ne veux pas voir disparaître.";

  const splitText = (text: string) => {
    return text.split(" ").map((word, index) => (
      <span key={index} className="word">
        {word}&nbsp;
      </span>
    ));
  };

  const moonAnimation = () => {
    const tl = gsap.timeline();
    tl.to("#moon", {
      motionPath: {
        path: [
          { x: 0, y: 0 },
          { x: -1000, y: 1000 },
          { x: 1000, y: 1000 },
          { x: 0, y: 0 },
        ],
        curviness: 1.5,
      },
      duration: 10,
      ease: "power2.inOut",
      repeat: -1,
    });
  };

  const cloudAnimation = () => {
    const tl = gsap.timeline();
    tl.from("#clouds", {
      y: 1000,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
    });
  };

  const titleAnimation = () => {
    gsap.fromTo('.main-title', {
      opacity: 0,
      y: 100,
    }, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out",
      delay: 1,
    });
  };

  const descriptionAnimation = () => {

    let mm = gsap.matchMedia();
    mm.add({
      isMobile: "(max-width: 768px)",
    }, (context) => {
      const { isMobile } = context.conditions as { isMobile: boolean };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sceneRef.current,
          start: "top top",
          end: isMobile ? `+=300` : `+=600`,
          scrub: 1,
          pin: true,
          onUpdate: (self) => {
            const progress = self.progress;
            if (progress > 0.1) {
              gsap.to(".scroll-icon", { opacity: 0, duration: 0.3 });
            } else {
              gsap.to(".scroll-icon", { opacity: 1, duration: 0.3 });
            }
          }
        }
      });

      tl.fromTo(
        ".word",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          stagger: 0.1,
          ease: "power2.out",
        }, 0);
        
      return () => {
      };
    });
    
    return mm;
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
      
      ScrollTrigger.refresh();
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    
    const ctx = gsap.context(() => {
      setTimeout(() => {
        const mm = descriptionAnimation();
        
        return () => {
          if (mm && mm.revert) {
            mm.revert();
          }
        };
      }, 500);
    }, mainContainerRef);

    const resizeObserver = new ResizeObserver(entries => {
      if (svgContainerRef.current) {
        const svg = svgContainerRef.current.querySelector('svg');
        if (svg) {
          svg.style.width = '100%';
          svg.style.height = '100%';
          svg.style.position = 'absolute';
          svg.style.top = '0';
          svg.style.left = '0';
        }
      }
    });

    if (svgContainerRef.current) {
      resizeObserver.observe(svgContainerRef.current);
    }

    return () => {
      ctx.revert();
      if (svgContainerRef.current) {
        resizeObserver.unobserve(svgContainerRef.current);
      }
    };
  }, [windowSize]);

  return (
    <main ref={mainContainerRef} className="scene-container">
      <div className="scene h-screen w-full relative" ref={sceneRef}>
        <div className="svg-wrapper h-full w-full absolute inset-0" ref={svgContainerRef}>
          <ReactSVG
            src="/cloud-scene.svg"
            className="svg-container h-full w-full"
            beforeInjection={(svg) => {
              svg.setAttribute('width', '100%');
              svg.setAttribute('height', '100%');
              svg.setAttribute('preserveAspectRatio', 'xMidYMid slice');
              svg.style.width = '100%';
              svg.style.height = '100%';
              svg.style.position = 'absolute';
            }}
            afterInjection={() => {
              moonAnimation();
              cloudAnimation();
              titleAnimation();
              ScrollTrigger.refresh();
            }}
          />
        </div>
        <h1 className="main-title">sunset dream</h1>
        <p className="description">{splitText(descriptionText)}</p>
        <RiArrowDownDoubleFill 
          size={windowSize.width <= 480 ? 30 : windowSize.width <= 768 ? 40 : 50} 
          className="scroll-icon" 
        />
      </div>
    </main>
  );
}