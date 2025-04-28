"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Header() {
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [menuVisible, setMenuVisible] = useState(false); // État séparé pour l'animation
    const [isMobile, setIsMobile] = useState(false);
    
    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        checkIfMobile();
        
        window.addEventListener('resize', checkIfMobile);
        
        return () => {
            window.removeEventListener('resize', checkIfMobile);
        };
    }, []);
    
    const toggleMenu = () => {
        if (isMenuOpen) {
            setMenuVisible(false);
            setTimeout(() => {
                setIsMenuOpen(false);
            }, 300);
        } else {
            setIsMenuOpen(true);
            setMenuVisible(true);
        }
    };
    
    return (
        <header className="p-4">
            <div className={`flex items-center ${isMobile ? 'justify-between mr-5' : ''}`}>
                <img 
                    src="/logo.svg" 
                    alt="logo scenium" 
                    className={`logo ${isMobile ? 'w-32' : 'ml-5'}`} 
                    onClick={() => router.push('/')}
                />
                
                {/* Menu desktop */}
                {!isMobile && (
                    <nav className="ml-10">
                        <ul className="flex space-x-10">
                            <li>
                                <a href="/scenes">Nos scènes</a>
                            </li>
                            <li>
                                <a onClick={() => router.push('/about')}>À propos</a>
                            </li>
                        </ul>
                    </nav>
                )}
                
                {/* Bouton de menu mobile */}
                {isMobile && (
                    <button 
                        onClick={toggleMenu} 
                        className="text-white z-20 relative w-7 h-7 flex items-center justify-center"
                        aria-label="Menu"
                    >
                        <div className={`menu-icon-container ${isMenuOpen ? 'menu-open' : ''}`}>
                            <div className="burger-line top-line"></div>
                            <div className="burger-line middle-line"></div>
                            <div className="burger-line bottom-line"></div>
                        </div>
                    </button>
                )}
            </div>
            
            {/* Menu mobile */}
            {isMobile && isMenuOpen && (
                <div className={`mobile-menu-overlay ${menuVisible ? 'fade-in' : 'fade-out'}`}>
                    <nav>
                        <ul className="flex flex-col items-center space-y-8 py-10">
                            <li>
                                <a 
                                    href="/scenes" 
                                    onClick={toggleMenu}
                                    className="text-xl"
                                >
                                    Nos scènes
                                </a>
                            </li>
                            <li>
                                <a 
                                    onClick={() => {
                                        router.push('/about');
                                        toggleMenu();
                                    }}
                                    className="text-xl"
                                >
                                    À propos
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            )}
        </header>
    );
}