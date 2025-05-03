"use client";
import Button from "@/components/common/Button";



export default function Newsletter() {
    return (
      <div className="bg-[url('/backgroundNewsletter.png')] bg-cover bg-center text-center mt-[50] mx-[clamp(200px,200px,300px)] px-[300] py-[50] rounded-lg newsletter">
        <h1 className="font-normal text-shadow-[0_0_10px_rgba(255,255,255,0.95),0_0_20px_rgba(255,255,255,0.95)] text-[24px]">Newsletter</h1>
        <h2 className="py-4 font-bold">Ne manquez pas nos prochaines scènes !</h2>
        <p>Inscrivez-vous à notre newsletter et soyez les premiers à découvrir nos prochaines scènes exclusives.</p>
        <div className="flex mt-7">
            <input
            type="text"
            placeholder="Entrez votre email"
            className="p-2 mr-5 border w-full bg-white placeholder-gray-500"
            />
            <Button size="medium" className="text-center w-[150px]">Je m'inscris</Button>
        </div>
      </div>
    );
}
