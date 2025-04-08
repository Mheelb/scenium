"use client";

import { useEffect, useState } from "react";
import { ReactSVG } from "react-svg";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { RiArrowDownDoubleFill } from "react-icons/ri";


export default function Scene() {
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

  const descriptionText =
    "Un ciel texturé, des nuages teintés de rose et d’orange, une lumière qui transforme chaque photo en un moment suspendu. Sunset Dream, c’est la scène parfaite entre douceur et intensité, comme un coucher de soleil que tu ne veux pas voir disparaître.";

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
    }
    );
  };

  const scrollIconAnimation = () => {
    gsap.fromTo(
      ".scroll-icon",
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 2,
        ease: "power2.out",
        delay: 1,
      }
    );
  };

  const descriptionAnimation = () => {
    scrollIconAnimation();
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".scene",
        start: "top top",
        end: "+=500",
        scrub: 1,
        pin: true
      }
    })
    tl.set(".scroll-icon", {
      onStart: () => document.querySelector(".scroll-icon")?.classList.add("no-bounce"),
    });
    tl.to(".scroll-icon", { opacity: 0, duration: 1, ease: "power2.out" }, 0);
    tl.fromTo(
        ".word",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          stagger: 0.1,
          ease: "power2.out",
        }, 0)
  };

  useEffect(() => {
    descriptionAnimation();
  }, []);

  return (
    <div className="scene">
      <ReactSVG
        src="/cloud-scene.svg"
        className="svg-container"
        afterInjection={() => {
          moonAnimation();
          cloudAnimation();
          titleAnimation();
          ScrollTrigger.refresh();
        }}
      />
      <h1 className="main-title">sunset dream</h1>
      <p className="description">{splitText(descriptionText)}</p>
      <RiArrowDownDoubleFill size={50} className="scroll-icon" />
    </div>
  );
}