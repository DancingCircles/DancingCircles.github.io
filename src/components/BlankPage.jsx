import React, { useRef, useState } from 'react';
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
            {/* 主卡片容器 */}
            <div className="main-card">
                {/* 标题区域 */}
                <div className="card-header">
                    <div className="title-group">
                        <h1 className="main-title">HAWAII</h1>
                        <h2 className="sub-title">
                            to reward those who<br />
                            create memories on the<br />
                            island platform
                        </h2>
                    </div>
                    <div className="card-subtitle">
                        <div className="arrow-icon">→</div>
                    </div>
                </div>

                {/* 视频区域 */}
                <div className="video-display-area" onClick={togglePlay}>
                    <video
                        ref={videoRef}
                        className="content-video"
                        src="/assets/whiteFerrari.mp4"
                        loop
                        muted={false}
                        playsInline
                    />
                    <div className={`play-overlay ${isPlaying ? 'hidden' : ''}`}>
                        <div className="play-icon">▶</div>
                    </div>

                    {/* 车 - 右上角装饰 */}
                    <img src="/assets/whiteferrari.png" alt="White Ferrari" className="car-badge" />
                </div>

                {/* 底部 Logo 或 标语 */}
                <div className="card-footer">
                    <span className="brand-text">Hawaii Travel</span>
                </div>
            </div>
        </section>
    );
};

export default BlankPage;
