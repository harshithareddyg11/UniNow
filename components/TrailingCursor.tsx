
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { StarIcon } from './IconComponents';

const TrailingCursor: React.FC = () => {
    const [stars, setStars] = useState<{ id: number; x: number; y: number }[]>([]);
    const pointerRef = useRef<HTMLDivElement>(null);
    const lastStarTime = useRef(0);
    const THROTTLE = 50; // ms

    const handleMouseMove = useCallback((e: MouseEvent) => {
        const { clientX, clientY } = e;

        // Move pointer instantly
        if (pointerRef.current) {
            pointerRef.current.style.left = `${clientX}px`;
            pointerRef.current.style.top = `${clientY}px`;
        }

        // Throttle star creation
        const now = Date.now();
        if (now - lastStarTime.current > THROTTLE) {
            lastStarTime.current = now;
            const newStar = { id: now, x: clientX, y: clientY };
            setStars(prevStars => [...prevStars, newStar]);

            setTimeout(() => {
                setStars(prev => prev.filter(s => s.id !== newStar.id));
            }, 1000); // Animation duration is 1s
        }
    }, []);

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [handleMouseMove]);

    return (
        <>
            <style>{`
                body, a, button {
                    cursor: none !important;
                }
                .pointer-cursor, .star-trail {
                    position: fixed;
                    pointer-events: none;
                    z-index: 9999;
                    transform: translate(-50%, -50%);
                    transform-origin: center center;
                    will-change: transform, opacity;
                }
                .pointer-cursor {
                    width: 24px;
                    height: 24px;
                }
                .star-trail {
                    width: 16px;
                    height: 16px;
                    animation: star-trail-animation 1s ease-out forwards;
                }

                @keyframes star-trail-animation {
                    0% {
                        opacity: 1;
                        transform: translate(-50%, -50%) scale(1);
                    }
                    100% {
                        opacity: 0;
                        transform: translate(-50%, -50%) scale(0);
                    }
                }
            `}</style>
            <div ref={pointerRef} className="pointer-cursor">
                <StarIcon className="text-teal-400 w-full h-full" style={{filter: 'drop-shadow(0 0 5px #2dd4bf)'}} />
            </div>
            {stars.map(star => (
                <div key={star.id} className="star-trail" style={{ top: star.y, left: star.x }}>
                     <StarIcon className="text-emerald-500 w-full h-full" />
                </div>
            ))}
        </>
    );
};

export default TrailingCursor;
