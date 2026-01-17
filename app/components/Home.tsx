"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import { Menu, X, Plus, Minus, Instagram, Facebook, Send, Phone, MapPin, Clock } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface Service {
    title: string;
    price: string;
    desc: string;
    img: string;
}

export default function Home() {
    const [isLoading, setIsLoading] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeService, setActiveService] = useState(0);

    const titleRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        if (isLoading || isMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [isLoading, isMenuOpen]);

    useEffect(() => {
        const timer = setTimeout(() => {
            const tl = gsap.timeline({
                onComplete: () => setIsLoading(false)
            });
            
            tl.to(".loader-content", {
                opacity: 0,
                y: -20,
                duration: 0.8,
                ease: "power3.inOut"
            })
            .to(".loader-bg", {
                yPercent: -100,
                duration: 1,
                ease: "power4.inOut"
            });
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    const services: Service[] = useMemo(() => [
        {
            title: "Мистецтво Волосся",
            price: "1200 грн",
            desc: "Ексклюзивні стрижки та фарбування, підібрані під вашу індивідуальність. Ми створюємо не просто зачіску, а ваш неповторний стиль.",
            img: "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1200"
        },
        {
            title: "Нігтьовий Сервіс",
            price: "600 грн",
            desc: "Від мінімалістичної елегантності до сміливих рішень. Наші майстри поєднують здоров'я нігтів з авангардним дизайном.",
            img: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?q=80&w=1200"
        },
        {
            title: "Ритуали Догляду",
            price: "2500 грн",
            desc: "Ексклюзивні процедури з використанням косметики світового рівня. Відновіть свою енергію та сяйте природною красою.",
            img: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1200"
        },
        {
            title: "Мистецтво Макіяжу",
            price: "1500 грн",
            desc: "Бездоганний макіяж для ваших найважливіших подій. Ми підкреслимо ваші найкращі риси з професійною точністю.",
            img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=1200"
        }
    ], []);

    const gallery = useMemo(() => [
        "https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?q=80&w=1200",
        "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?q=80&w=1200",
        "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=1200",
        "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1200",
        "https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=1200",
        "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=1200"
    ], []);

    useEffect(() => {
        let lastScrollY = window.scrollY;
        let ticking = false;

        const handleScroll = () => {
            lastScrollY = window.scrollY;
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    setScrolled(lastScrollY > 50);
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });

        const tl = gsap.timeline({ delay: 2.8 });
        tl.fromTo(".logo-text", { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 })
          .fromTo(titleRef.current, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }, "-=0.4");

        return () => {
            window.removeEventListener("scroll", handleScroll);
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    return (
        <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black antialiased overflow-x-hidden">
            
            {/* --- PRELOADER --- */}
            {isLoading && (
                <div className="fixed inset-0 z-200 flex items-center justify-center loader-bg bg-black">
                    <div className="loader-content flex flex-col items-center">
                        <div className="text-3xl md:text-5xl font-black tracking-[0.5em] uppercase italic animate-pulse">
                            Butty Space
                        </div>
                        <div className="mt-4 w-24 h-px bg-white/20 relative overflow-hidden">
                            <div className="absolute inset-0 bg-white animate-loader-progress" />
                        </div>
                    </div>
                </div>
            )}
            
            {/* --- HEADER --- */}
            <header className={`fixed top-0 left-0 w-full z-100 transition-all duration-500 will-change-auto ${scrolled || isMenuOpen ? "bg-black/90 backdrop-blur-md py-4 shadow-2xl" : "bg-transparent py-6 md:py-10"}`}>
                <div className="max-w-7xl mx-auto px-6 flex justify-between items-center text-white relative z-110">
                    <div className="logo-text text-xl md:text-2xl font-black tracking-widest uppercase italic font-serif">
                        Butty Space
                    </div>
                    
                    <button 
                        onClick={() => setIsMenuOpen(!isMenuOpen)} 
                        className="flex items-center gap-2 md:gap-4 group relative p-2 outline-none"
                    >
                        <span className="text-[10px] uppercase tracking-[0.3em] font-bold hidden md:block opacity-60 group-hover:opacity-100 transition-opacity">
                            {isMenuOpen ? "закрити" : "меню"}
                        </span>
                        {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
                    </button>
                </div>

                <nav className={`fixed inset-0 bg-black text-white flex flex-col items-center justify-center transition-all duration-500 ease-in-out ${isMenuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"} z-105 h-dvh`}>
                    <div className="flex flex-col items-center space-y-6 md:space-y-10 px-6 text-center">
                        {["Головна", "Послуги", "Майстри", "Про нас", "Контакти"].map((item, i) => (
                            <a 
                                key={item} 
                                href="#" 
                                className={`text-4xl md:text-7xl font-black uppercase tracking-tighter hover:text-zinc-500 transition-all duration-500 will-change-transform ${isMenuOpen ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"}`}
                                style={{ transitionDelay: `${i * 50}ms` }}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item}
                            </a>
                        ))}
                    </div>
                </nav>
            </header>

            {/* --- HERO --- */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-black/40 z-10" />
                <video className="absolute top-0 left-0 w-full h-full object-cover grayscale opacity-60 pointer-events-none" autoPlay muted loop playsInline>
                    <source src="/hero-video.mp4" type="video/mp4" />
                </video>
                
                <div className="relative z-20 text-center px-4 will-change-transform">
                    <h1 ref={titleRef} className="text-5xl md:text-[8vw] font-black uppercase leading-[0.9] tracking-tighter">
                        Butty Space
                    </h1>
                    <p className="mt-8 text-xs md:text-sm tracking-[0.6em] uppercase font-bold text-zinc-400">
                        Sanctuary of Aesthetic & Care
                    </p>
                    <button className="mt-16 px-12 py-5 border border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white hover:text-black transition-all duration-500 uppercase tracking-widest text-[10px] font-bold">
                        Записатись онлайн
                    </button>
                </div>

                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce">
                    <div className="w-px h-12 bg-white/20" />
                </div>
            </section>

            {/* --- SERVICES --- */}
            <section className="py-32 bg-zinc-950 px-6 border-y border-zinc-900">
                <div className="max-w-5xl mx-auto">
                    <div className="mb-20 text-center">
                        <span className="text-[10px] uppercase tracking-widest text-zinc-500 block mb-4">ексклюзивний сервіс</span>
                        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Наші Послуги</h2>
                    </div>

                    <div className="space-y-4">
                        {services.map((service, index) => (
                            <div 
                                key={index} 
                                className="group bg-black/50 border border-zinc-900 overflow-hidden transition-all duration-500 hover:border-white/20"
                                onClick={() => setActiveService(index)}
                            >
                                <div className="flex justify-between items-center p-8 md:p-12 cursor-pointer flex-wrap gap-4">
                                    <div className="flex items-center gap-8">
                                        <span className="text-sm font-mono text-zinc-700">0{index + 1}</span>
                                        <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tighter">{service.title}</h3>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <span className="text-zinc-500 hidden md:block uppercase text-[10px] tracking-widest font-bold">Детальніше</span>
                                        {activeService === index ? <Minus size={24} /> : <Plus size={24} />}
                                    </div>
                                </div>

                                <div className={`grid grid-cols-1 md:grid-cols-2 gap-10 transition-all duration-700 ease-in-out px-8 md:px-12 will-change-auto ${activeService === index ? "max-h-[1000px] pb-12 opacity-100" : "max-h-0 opacity-0"}`}>
                                    <div className="overflow-hidden aspect-video relative">
                                        <Image 
                                            src={service.img} 
                                            alt={service.title} 
                                            fill
                                            className="object-cover transition-transform duration-1000 group-hover:scale-105"
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                        />
                                    </div>
                                    <div className="flex flex-col justify-center space-y-8">
                                        <p className="text-zinc-400 text-lg leading-relaxed italic">{service.desc}</p>
                                        <div className="flex flex-col">
                                            <span className="text-[10px] uppercase text-zinc-600 mb-2">Вартість</span>
                                            <span className="text-3xl md:text-5xl font-black">від {service.price}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- GALLERY --- */}
            <section className="py-32 bg-black px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="mb-20 text-center">
                        <span className="text-[10px] uppercase tracking-widest text-zinc-500 block mb-4">локація</span>
                        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Наш Простір</h2>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
                        {gallery.map((img, i) => (
                            <div key={i} className="aspect-3/4 overflow-hidden group relative">
                                <Image 
                                    src={img} 
                                    alt="Interior" 
                                    fill
                                    className="object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0"
                                    sizes="(max-width: 768px) 50vw, 33vw"
                                />
                                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- FOOTER --- */}
            <footer className="bg-zinc-950 pt-32 pb-16 px-6 border-t border-zinc-900 overflow-hidden">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-20">
                    <div className="col-span-1 md:col-span-2">
                        <div className="text-3xl font-black uppercase italic mb-8">Butty Space</div>
                        <p className="text-zinc-500 max-w-sm mb-12 leading-relaxed">Ми створюємо більше, ніж просто красу. Ми створюємо атмосферу впевненості та затишку для вашого перевтілення.</p>
                        <div className="flex gap-8">
                             <Instagram className="cursor-pointer hover:text-zinc-400 transition-colors" />
                             <Facebook className="cursor-pointer hover:text-zinc-400 transition-colors" />
                             <Send className="cursor-pointer hover:text-zinc-400 transition-colors" />
                        </div>
                    </div>
                    
                    <div>
                        <h4 className="text-[10px] uppercase tracking-widest text-zinc-600 font-black mb-8">Інформація</h4>
                        <div className="space-y-6 text-zinc-400">
                            <div className="flex items-center gap-4">
                                <MapPin size={18} />
                                <span className="text-sm">вул. Центральна, 1, Прилуки</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <Clock size={18} />
                                <span className="text-sm italic">Пн — Нд: 09:00 — 21:00</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-[10px] uppercase tracking-widest text-zinc-600 font-black mb-8">Контакти</h4>
                        <a href="tel:+380990000000" className="flex items-center gap-4 group">
                             <div className="p-4 bg-zinc-900 rounded-full group-hover:bg-white group-hover:text-black transition-all">
                                <Phone size={20} />
                             </div>
                             <span className="text-lg font-black group-hover:underline">+380 99 000 00 00</span>
                        </a>
                    </div>
                </div>
                <div className="mt-32 pt-16 border-t border-zinc-900 text-center text-[10px] uppercase tracking-[0.4em] text-zinc-700">
                    © 2026 Butty Space • Premium Beauty Sanctuary
                </div>
            </footer>

            <style jsx global>{`
                @keyframes progress {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                .animate-loader-progress {
                    animation: progress 2s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
}



