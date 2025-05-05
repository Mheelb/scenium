"use client";

import { useEffect, useRef, useCallback } from "react";
import { ReactSVG } from "react-svg";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { RiArrowDownDoubleFill } from "react-icons/ri";
import Button from "@/components/common/Button";
import { useDevice } from "@/contexts/DeviceProvider";
import { useRouter } from "next/navigation";

export default function Scene() {
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

  const { isMobile, isTablet, isDesktop, windowSize } = useDevice();
  const router = useRouter();
  
  const sceneRef = useRef<HTMLDivElement>(null);
  const svgContainerRef = useRef<HTMLDivElement>(null);
  const mainContainerRef = useRef<HTMLElement>(null);
  const animationInitializedRef = useRef(false);
  const animationsRef = useRef<gsap.core.Tween[]>([]);

  const descriptionText =
    "Un ciel texturé, des nuages teintés de rose et d'orange, une lumière qui transforme chaque photo en un moment suspendu. Sunset Dream, c'est la scène parfaite entre douceur et intensité, comme un coucher de soleil que tu ne veux pas voir disparaître.";

  const splitText = useCallback((text: string) => {
    return text.split(" ").map((word, index) => (
      <span key={index} className="word">
        {word}&nbsp;
      </span>
    ));
  }, []);

  const moonAnimation = useCallback(() => {
    gsap.killTweensOf("#moon");
    
    const anim = gsap.to("#moon", {
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
    
    animationsRef.current.push(anim);
    return anim;
  }, []);

  const titleAnimation = useCallback(() => {
    gsap.killTweensOf(".main-title");
    
    const anim = gsap.fromTo('.main-title', {
      opacity: 0,
      y: 100,
    }, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out",
      delay: 1,
    });
    
    animationsRef.current.push(anim);
    return anim;
  }, []);

  const handleResize = useCallback(() => {
    if (animationInitializedRef.current) {
      ScrollTrigger.refresh();
    }
  }, []);

  const setupScrollAnimation = useCallback(() => {
    if (!sceneRef.current || !mainContainerRef.current) return null;
    
    let mm = gsap.matchMedia();
    mm.add({
      isMobile: "(max-width: 768px)",
      isDesktop: "(min-width: 769px)",
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
            if (self.progress > 0.1) {
              gsap.to(".scroll-icon", { opacity: 0, duration: 0.3 });
              gsap.to(".scene-button", { opacity: 1, duration: 0.3 });
            } else {
              gsap.to(".scroll-icon", { opacity: 1, duration: 0.3 });
              gsap.to(".scene-button", { opacity: 0, duration: 0.3 });
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
        
      return () => {};
    });
    
    return mm;
  }, []);

  const setupSvg = useCallback((svg: SVGElement) => {
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.setAttribute('preserveAspectRatio', 'xMidYMid slice');
    svg.style.width = '100%';
    svg.style.height = '100%';
    svg.style.position = 'absolute';
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  useEffect(() => {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    animationsRef.current.forEach(anim => anim.kill());
    animationsRef.current = [];
    
    const ctx = gsap.context(() => {
      if (!animationInitializedRef.current) {
        animationInitializedRef.current = true;
      }
      
      const timer = setTimeout(() => {
        const mm = setupScrollAnimation();
        
        return () => {
          if (mm && typeof mm.revert === 'function') {
            mm.revert();
          }
        };
      }, 300);
      
      return () => clearTimeout(timer);
    }, mainContainerRef);

    const resizeObserver = new ResizeObserver(entries => {
      if (svgContainerRef.current) {
        const svg = svgContainerRef.current.querySelector('svg');
        if (svg) {
          setupSvg(svg as SVGElement);
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
      
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      animationsRef.current.forEach(anim => anim.kill());
      gsap.killTweensOf("*");
    };
  }, [windowSize?.width, windowSize?.height, setupScrollAnimation, setupSvg]);

  const scrollIconSize = isMobile ? 30 : (isTablet ? 40 : 50);

  return (
    <main ref={mainContainerRef} className="scene-container">
      <div className="scene h-screen w-full relative" ref={sceneRef}>
        <div className="svg-wrapper h-full w-full absolute inset-0" ref={svgContainerRef}>
          <ReactSVG
            src="/cloud-scene.svg"
            className="svg-container h-full w-full"
            beforeInjection={setupSvg}
            afterInjection={(svg) => {
              setTimeout(() => {
                moonAnimation();
                const clouds = svg.querySelectorAll('#clouds');
                if (clouds.length > 0) {
                  gsap.from(clouds, {
                    y: 500,
                    opacity: 0,
                    duration: 2,
                    stagger: 0.1,
                    ease: "power2.out",
                  });
                }
                titleAnimation();
                ScrollTrigger.refresh();
              }, 100);
            }}
          />
        </div>
        <h1 className="main-title">sunset dream</h1>
        <p className="description">{splitText(descriptionText)}</p>
        <div className={`absolute w-full flex ${
          isMobile ? 'p-4 bottom-20 justify-center' : isTablet ? 'p-8 bottom-8' : 'justify-end p-12 bottom-20 right-40'
        }`}>
          <Button size="large" className="scene-button" onClick={() => router.push('/reserver')}>
            Réserver
          </Button>
        </div>
        <div className="absolute w-full flex justify-center bottom-10">
          <RiArrowDownDoubleFill 
            size={scrollIconSize} 
            className="scroll-icon" 
          />
        </div>
      </div>
    </main>
  );
}