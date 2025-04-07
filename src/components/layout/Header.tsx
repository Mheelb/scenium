"use client";``
import { useRouter } from "next/navigation";

export default function Header() {
    const router = useRouter();
    return (
        <header>
            <div className="flex items-center space-x-15">
            <img src="/logo.svg" alt="logo scenium" className="logo ml-15" onClick={() => router.push('/')}/>
            <nav>
                <ul className="flex space-x-10">
                    <li>
                        <a onClick={() => router.push('/scenes')}>Nos scènes</a>
                    </li>
                    <li>
                        <a onClick={() => router.push('/about')}>À propos</a>
                    </li>
                </ul>
            </nav>
            </div>
        </header> 
    )
}