"use client";

import Button from "@/components/common/Button";
import Cadre from "@/components/common/Cadre";
import Newsletter from "@/components/common/Newsletter";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const images = [
    "/box1.png",
    "/box2.png",
    "/box3.png",
    "/box4.png",
    "/box5.png",
  ];

  function useWindowSize() {
    const [size, setSize] = useState({ width: 0, height: 0 });
  
    useEffect(() => {
      const updateSize = () =>
        setSize({ width: window.innerWidth, height: window.innerHeight });
  
      updateSize(); // initial size
      window.addEventListener("resize", updateSize);
  
      return () => window.removeEventListener("resize", updateSize);
    }, []);
  
    return size;
  }
  const { width } = useWindowSize();

  return (
    <div className="pt-35">
      <section className="pt-[160] pb-[120] text-center container-title">
        <h1 className="font-normal text-shadow-[0_0_10px_rgba(255,255,255,0.95),0_0_20px_rgba(255,255,255,0.95)] text-[24px]">vis l'expérience Scenium</h1>
        <div className="flex justify-center items-center title">
          <Image src="/asset1.png" alt="" width={32} height={78} />
          <p className="font-bold text-[48px] mt-[5px] ml-[-5px]">Un clic, une scène, des souvenirs</p>
          <Image src="/asset2.png" alt="" width={48} height={100} />
        </div>
        <p className="max-w-[clamp(60ch,80%,90ch)] mx-auto text-center px-4 my-[40px] text-[16px] clamp" >Des scènes immersives et mobiles pour des événements inoubliables. Mariages, anniversaires, soirées profesionnels – installez, capturez, marquez les esprits. Design unique, impact garanti.</p>
        { width >= 750 ? (
          <Button size="large">
          Découvrir nos scènes
        </Button>
        ) : (
          <Button size="medium" className="text-center w-[150px]">
          Découvrir nos scènes
          </Button>
        )}
      </section>
      <section className="text-center">
        <h1 className="font-normal text-shadow-[0_0_10px_rgba(255,255,255,0.95),0_0_20px_rgba(255,255,255,0.95)] text-[24px] pb-10">choisis ta scène</h1>
        <div className="flex items-center px-[clamp(200px,220px,300px)] justify-evenly container-box">
          {width >= 1200 ? (<><div className="relative before:content-[''] before:absolute before:top-0 before:left-0 before:w-1/3 before:h-full before:bg-gradient-to-r before:from-black before:to-transparent">
              <Image src="/box1.png" alt="Photobox style nuage rose féerique" width={168} height={168} className="p-[7px] pb-[45px] bg-white" />
            </div><Image src="/box2.png" alt="Photobox style composition florale" width={210} height={210} className="p-[7px] pb-[45px] bg-white" /><Image src="/box3.png" alt="Photobox style ballons argentés" width={240} height={240} className="p-[7px] pb-[45px] bg-white" /><Image src="/box4.png" alt="Photobox style nuage blanc" width={210} height={210} className="p-[7px] pb-[45px] bg-white" /><div className="relative before:content-[''] before:absolute before:top-0 before:right-0 before:w-1/3 before:h-full before:bg-gradient-to-l before:from-black before:to-transparent">
                <Image src="/box5.png" alt="Photobox style kaléidoscope" width={168} height={168} className="p-[7px] pb-[45px] bg-white" />
              </div></>) : (
          <div className="overflow-x-auto whitespace-nowrap scroll-smooth resize">
          {images.map((src: string, i: number) => (
            <Image src={src} key={i} alt='test' width={256} height={160} className="inline-block mr-4 p-[7px] pb-[45px] bg-white" />
          ))}
        </div>)}
        </div>
        <p className="max-w-[clamp(60ch,80%,90ch)] mx-auto text-center px-4 my-[40px] text-[16px] clamp" >Des scènes <span>immersives</span> et <span>mobiles</span> pour des événements <span>inoubliables.</span> Mariages, anniversaires, soirées profesionnels – <span>installez, capturez, marquez les esprits.</span> Design unique, impact garanti.</p>
        { width >= 750 ? (
          <Button size="large">
          Nous contacter
        </Button>
        ) : (
          <Button size="medium" className="text-center w-[150px]">
          Nous contacter
          </Button>
        )}
      </section>
      <section>
        <div className="text-center pt-[100] text-card">
          <h1 className="font-normal text-shadow-[0_0_10px_rgba(255,255,255,0.95),0_0_20px_rgba(255,255,255,0.95)] text-[24px]">qui sommes-nous ?</h1>
          <p className="max-w-[clamp(80ch,80%,110ch)] mx-auto text-center px-4 text-[16px] my-[20px] clamp">Chez <span>Scenium</span>, on ne capture pas juste des photos, on crée des expériences. Notre mission : transformer chaque événement en un décor unique, immersif et inoubliable.</p>
          <p className="max-w-[clamp(80ch,80%,110ch)] mx-auto text-center px-4 text-[16px] mb-[50] clamp">Nos scènes mêlent design, innovation et storytelling pour offrir des souvenirs mémorables et viraux. Inspirées des tendances artistiques et conçues avec des matériaux durables, elles s’installent partout et s’adaptent à tous vos événements.</p>
        </div>
        <div className="flex items-center justify-between px-[clamp(100px,200px,300px)] container-card">
          <Cadre src='/cadre1.png' alt='Pictogramme qualité garantie' title='Qualité garantie' txt='Des scènes conçues avec des composants de qualité' />
          <Cadre src='/cadre2.png' alt='Pictogramme scène unique' title='Des scènes uniques' txt='Des scènes tendances adaptées à votre image' />
          <Cadre src='/cadre3.png' alt='Pictogramme livraison rapide' title='Livraison rapide' txt='Livraison et installation efficace sur le lieu de votre événement' />
          <Cadre src='/cadre4.png' alt='Picrogramme service personnalisé' title='Service personnalisé' txt='Nous vous guidons à chaque étape' />
        </div>
      </section>
      <Newsletter />
    </div>
  );
}