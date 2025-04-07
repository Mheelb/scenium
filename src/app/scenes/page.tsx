"use client";
import { useEffect } from "react";
import { ReactSVG } from "react-svg";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

export default function Scene() {
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

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
    const tl = gsap.timeline();
    tl.from(".main-title", {
      y: 100,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
    }, 1);
  };

  const titleAnimationOnScroll = () => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".scene",
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });
    tl.to(".main-title", {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
    });
  };

  useEffect(() => {
    titleAnimation();
    titleAnimationOnScroll();
  }, []);

  return (
      <div className="scene" style={{ overflow: "hidden" }}>
        <ReactSVG
          src="/cloud-scene.svg"
          className="svg-container"
          afterInjection={() => {
            moonAnimation();
            cloudAnimation();
          }}
        />
        <h1 className="main-title">sunset dream</h1>
      </div>
  );
}