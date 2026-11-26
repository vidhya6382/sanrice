import { useEffect, useRef, useState } from "react";
import poster from "../assets/images/san-rice-film-poster.webp";

// Video file lives in public/videos/ so it is served as-is (no bundling).
const VIDEO_SRC = "/videos/san-rice-film.mp4";

const SoundOnIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M11 5 6 9H2v6h4l5 4V5z" />
    <path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14" />
  </svg>
);
const SoundOffIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M11 5 6 9H2v6h4l5 4V5z" />
    <path d="m23 9-6 6M17 9l6 6" />
  </svg>
);
const PlayIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M8 5v14l11-7z" /></svg>
);
const PauseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M6 5h4v14H6zM14 5h4v14h-4z" /></svg>
);

export default function VideoShowcase() {
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);
  const userPaused = useRef(false);

  // Play only while the video is on screen (saves mobile data), pause when scrolled away.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || !("IntersectionObserver" in window)) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !userPaused.current) {
          video.play().catch(() => {});
        } else if (!entry.isIntersecting) {
          video.pause();
        }
      },
      { threshold: 0.35 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const toggleSound = () => {
    const video = videoRef.current;
    video.muted = !video.muted;
    setMuted(video.muted);
    if (!video.muted && video.paused) {
      userPaused.current = false;
      video.play().catch(() => {});
    }
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (video.paused) {
      userPaused.current = false;
      video.play().catch(() => {});
    } else {
      userPaused.current = true;
      video.pause();
    }
  };

  return (
    <section className="video-showcase" aria-label="SAN Rice brand film">
      <div className="container">
        <div className="video-showcase__frame">
          <video
            ref={videoRef}
            className="video-showcase__video"
            src={VIDEO_SRC}
            poster={poster}
            muted
            loop
            playsInline
            preload="metadata"
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onClick={togglePlay}
          >
            Your browser does not support the video tag.
          </video>

          <div className="video-showcase__controls">
            <button type="button" onClick={togglePlay} aria-label={playing ? "Pause video" : "Play video"}>
              {playing ? <PauseIcon /> : <PlayIcon />}
            </button>
            <button type="button" onClick={toggleSound} aria-label={muted ? "Turn sound on" : "Turn sound off"}>
              {muted ? <SoundOffIcon /> : <SoundOnIcon />}
              <span>{muted ? "Sound off" : "Sound on"}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
