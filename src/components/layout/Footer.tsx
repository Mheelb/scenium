import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="text-white px-[clamp(200px,200px,300px)]">

      <div className="container mx-auto px-6 py-10 flex flex-col md:flex-row justify-between gap-8">

        <div>
          <Image src="/logo.png" alt="Logo Scenium" width={200} height={60} />
        </div>

        <div>
          <h3 className="font-bold mb-2">Informations</h3>
          <ul className="space-y-1">
            <li>
              <Link href="/scenes">Nos scènes</Link>
            </li>
            <li>
              <Link href="/about">À propos</Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-2">Informations pratiques</h3>
          <ul className="space-y-1">
            <li>
              <Link href="/mentions-legales">Informations légales</Link>
            </li>
            <li>
              <Link href="/confidentialite">Politique de confidentialité</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white opacity-20 mx-6" />

      <div className="container mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between text-sm">
        <p>Copyright © 2025 Scenium. Tous droits réservés.</p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <Link href="https://www.instagram.com/scenium._?igsh=MTd2MWN5aTVmODM1bA==" target="_blank" aria-label="Instagram">
            <Image src="/insta.png" alt="Instagram" width={40} height={40} />
          </Link>
          <Link href="https://www.tiktok.com/@scenium._?_t=ZN-8w6AEadG0fu&_r=1" target="_blank" aria-label="Tiktok">
            <Image src="/tiktok.png" alt="Tiktok" width={40} height={40} />
          </Link>
          <Link href="https://www.linkedin.com/company/sceniumevent/" target="_blank" aria-label="LinkedIn">
            <Image src="/linkedin.png" alt="LinkedIn" width={40} height={40} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
