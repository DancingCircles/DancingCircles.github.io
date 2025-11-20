import React, { useState, useRef } from 'react';
import './BlankPage.css';

const BlankPage = () => {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <section className="blank-page">
            <div className="left-column">
                <div className="text-container">
                    <h2>The Journey</h2>
                    <p>
                        Every mile a memory, every turn a new story.
                        Capturing the essence of freedom on the open road.
                        The wind in your hair, the sun on your face, and the endless horizon calling your name.
                        <br /><br />
                        We travel not to escape life, but for life not to escape us.
                        Through the winding roads of the coast, past the towering palms and into the heart of the island.
                        <br /><br />
                        Let the engine roar and the music play. This is where time stands still, and the only moment that matters is now.
                    </p>
                </div>
                <img src="/assets/whiteferrari.png" alt="White Ferrari" className="decorative-car" />
            </div>

            <div className="right-column">
                <div className="scrapbook-item">
                    <div className="handwritten-note">
                        <h3>White Ferrari</h3>
                        <p>Moments in motion</p>
                    </div>
                    <div className="video-container" onClick={togglePlay}>
                        <video
                            ref={videoRef}
                            className="styled-video"
                            playsInline
                            loop
                        >
                            <source src="/assets/whiteFerrari.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>

                        {!isPlaying && (
                            <div className="play-button-overlay">
                                <div className="play-icon">
                                    <svg viewBox="0 0 24 24" width="60" height="60" fill="currentColor">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                </div>
                            </div>
                        )}

                        <div className="texture-overlay"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BlankPage;
