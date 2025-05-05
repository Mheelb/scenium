import Newsletter from "@/components/common/Newsletter";
import Image from "next/image";

export default function About() {

  return (
    <div className="pt-35">
      <div className="div">
        <div>
          <h1 className="font-normal text-shadow-[0_0_10px_rgba(255,255,255,0.95),0_0_20px_rgba(255,255,255,0.95)] text-[24px]">qui sommes-nous ?</h1>
          <h2 className="font-bold text-[48px] mt-[5px] ml-[-5px] uppercase">À propos de scenium</h2>
          <p className="text-[16px] mt-10">Chez Scenium, nous avons créé quelque chose de différent.Un projet né d’une idée simple : rendre chaque souvenir inoubliable. Nos scènes décoratives ne sont pas là juste pour embellir un lieu. Elles créent un univers où chaque instant devient une histoire à raconter. Parce que certains moments méritent plus qu’un simple souvenir… Bienvenue dans l’univers Scenium.</p>
        </div>
        <div>
          <Image src="/about.jpg" alt="Photobox style nuage rose féerique" width={500} height={500} />
        </div>
      </div>
      <Newsletter />
    </div>
  );
}