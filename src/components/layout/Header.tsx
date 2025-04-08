"use client";
import { useRouter } from "next/navigation";
import Button from "../common/Button";

export default function Header() {
    const router = useRouter();
    return (
        <header>
            <div className="flex items-center space-x-15">
                <img src="/logo.svg" alt="logo scenium" className="logo ml-15" onClick={() => router.push('/')} />
                <nav>
                    <ul className="flex space-x-10">
                        <li>
                            <a href="/scenes">Nos scènes</a>
                        </li>
                        <li>
                            <a onClick={() => router.push('/about')}>À propos</a>
                        </li>
                    </ul>
                </nav>
                <Button className="mr-30" onClick={() => router.push('/login')}>
                    Réserver une scène
                </Button>
            </div>
        </header>
    )
};