"use client";

import {useEffect} from 'react';
import confetti from 'canvas-confetti';
import {Construction} from 'lucide-react';
import {motion} from 'framer-motion';

interface NotImplementedProps {
    pageName: string;
}

export default function NotImplemented({pageName}: NotImplementedProps) {
    useEffect(() => {
        // Trigger confetti when component mounts
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;

        const randomInRange = (min: number, max: number) => {
            return Math.random() * (max - min) + min;
        };

        const confettiInterval = setInterval(() => {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                clearInterval(confettiInterval);
                return;
            }

            confetti({
                particleCount: 2,
                angle: 60,
                spread: 55,
                origin: {x: 0},
                colors: ['#6366f1', '#8b5cf6', '#d946ef']
            });
            confetti({
                particleCount: 2,
                angle: 120,
                spread: 55,
                origin: {x: 1},
                colors: ['#6366f1', '#8b5cf6', '#d946ef']
            });
        }, 250);

        return () => clearInterval(confettiInterval);
    }, []);

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center">
            <motion.div
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.5}}
                className="text-center"
            >
                <motion.div
                    animate={{
                        rotate: [0, -10, 10, -10, 10, 0],
                        transition: {
                            duration: 2,
                            repeat: Infinity,
                            repeatType: "reverse"
                        }
                    }}
                    className="inline-block mb-6"
                >
                    <Construction className="h-24 w-24 text-primary-500"/>
                </motion.div>

                <motion.h1
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{delay: 0.2}}
                    className="text-4xl font-bold text-gray-900 mb-4"
                >
                    {pageName}
                </motion.h1>

                <motion.div
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{delay: 0.4}}
                    className="space-y-4"
                >
                    <p className="text-lg text-gray-600">
                        This feature is currently under construction.
                    </p>
                    <p className="text-sm text-gray-500">
                        Gal is working hard to bring you something amazing!
                    </p>
                </motion.div>

                <motion.div
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{delay: 0.6}}
                    className="mt-8"
                >
                    <motion.div
                        whileHover={{scale: 1.05}}
                        whileTap={{scale: 0.95}}
                    >
                        <button
                            onClick={() => window.history.back()}
                            className="px-6 py-3 bg-primary-500 text-white rounded-lg shadow-lg hover:bg-primary-600 transition-colors"
                        >
                            Go Back
                        </button>
                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    );
}
