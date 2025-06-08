"use client"
import React, { ReactNode, useEffect } from "react";
import { XMarkIcon } from '@heroicons/react/24/outline'
import Link from "next/link";

interface DrawerProps {
    children: ReactNode;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const Drawer = ({ children, isOpen, setIsOpen }: DrawerProps) => {
    // Add cleanup effect for proper unmounting
    useEffect(() => {
        // Handle escape key press
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
        }

        // Clean up event listener on unmount
        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen, setIsOpen]);

    // Add class to body to prevent scrolling when drawer is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    return (
        <main
            className={
                "fixed overflow-hidden z-10 bg-gray-900 bg-opacity-25 inset-0 transform ease-in-out " +
                (isOpen
                    ? "transition-opacity opacity-100 duration-500 translate-x-0"
                    : "transition-all delay-500 opacity-0 -translate-x-full")
            }
        >
            <section
                className={
                    "w-80 max-w-lg left-0 absolute bg-white h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform " +
                    (isOpen ? "translate-x-0" : "-translate-x-full")
                }
            >
                <article className="relative w-screen max-w-lg pb-10 flex flex-col space-y-6 h-full">
                    <header className="px-4 py-4 flex items-center justify-between">
                        <div className="flex flex-shrink-0 items-center">
                            <Link href="/" className='text-2xl font-semibold text-black'>
                                Simbarku.co
                            </Link>
                        </div>
                        <button 
                            className="p-2 rounded-md hover:bg-gray-100"
                            onClick={() => setIsOpen(false)}
                        >
                            <XMarkIcon className="h-6 w-6" />
                        </button>
                    </header>
                    <div onClick={() => setIsOpen(false)}>
                        {children}
                    </div>
                </article>
            </section>
            <section
                className="w-screen h-full cursor-pointer"
                onClick={() => setIsOpen(false)}
            ></section>
        </main>
    );
}

export default Drawer;
