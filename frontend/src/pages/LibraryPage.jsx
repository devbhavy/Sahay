import React, { useState } from "react";
import { DefaultNavbar } from "../components/navbars/defaultNavbar";

const dummyLibraryData = [
  { id: 1, category: 'Sleep', title: 'Ocean Waves', description: 'Gentle ocean sounds for deep sleep', duration: '30:00', isFavorited: false, audioSrc: '/audio/ocean.mp3' },
  { id: 2, category: 'Focus', title: 'Forest Rain', description: 'Peaceful rainfall in a quiet forest', duration: '45:00', isFavorited: true, audioSrc: '/audio/rain.mp3' },
  { id: 3, category: 'Mindfulness', title: 'Meditation Bell', description: 'Tibetan singing bowls for meditation', duration: '15:00', isFavorited: false, audioSrc: '/audio/bell.mp3' },
  { id: 4, category: 'Study', title: 'Study Flow', description: 'Ambient music to enhance concentration', duration: '60:00', isFavorited: false, audioSrc: '/audio/study.mp3' },
  { id: 5, category: 'Calm', title: 'Morning Birds', description: 'Birds chirping in a peaceful garden', duration: '25:00', isFavorited: false, audioSrc: '/audio/birds.mp3' },
  { id: 6, category: 'Focus', title: 'White Noise', description: 'Pure white noise for deep focus', duration: '120:00', isFavorited: false, audioSrc: '/audio/whitenoise.mp3' },
  { id: 7, category: 'Calm', title: 'Piano Relaxation', description: 'Soothing piano melodies to unwind', duration: '40:00', isFavorited: true, audioSrc: '/audio/piano.mp3' },
  { id: 8, category: 'Sleep', title: 'Night Sounds', description: 'Crickets and calm night ambiance', duration: '55:00', isFavorited: false, audioSrc: '/audio/night.mp3' },
];

const categoryClasses = {
  Sleep: "bg-gray-700 text-gray-200",
  Focus: "bg-blue-800 text-blue-200",
  Mindfulness: "bg-purple-600 text-purple-200",
  Study: "bg-green-800 text-green-200",
  Calm: "bg-yellow-700 text-yellow-200",
};

const LibraryPage = () => {
  const [tracks, setTracks] = useState(dummyLibraryData);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);

  const handleToggleFavorite = (trackId) => {
    setTracks(prevTracks =>
      prevTracks.map(track =>
        track.id === trackId ? { ...track, isFavorited: !track.isFavorited } : track
      )
    );
  };

  const handlePlayPause = (trackId) => {
    setCurrentlyPlaying(currentlyPlaying === trackId ? null : trackId);
  };

  return (
    <div className="mt-18">
      <DefaultNavbar/>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 p-8 min-h-screen bg-gray-100 font-sans text-base">
      {tracks.map(track => {
        const isPlaying = currentlyPlaying === track.id;
        const tagClass = categoryClasses[track.category] || "bg-gray-300 text-gray-700";
        return (
          <div
            key={track.id}
            className="bg-white rounded-2xl p-6 flex flex-col shadow-md transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="flex justify-between items-start mb-4">
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${tagClass}`}>{track.category}</span>
              <button
                className="ml-2 rounded-full p-1 hover:bg-gray-100 transition"
                onClick={() => handleToggleFavorite(track.id)}
                title="Favorite"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill={track.isFavorited ? "#F59E42" : "none"} stroke={track.isFavorited ? "#F59E42" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </button>
            </div>
            <h2 className="font-semibold text-lg mb-1 text-blue-900">{track.title}</h2>
            <p className="text-sm text-gray-700 opacity-80 mb-5 flex-grow">{track.description}</p>
            <div className="flex justify-between items-center border-t border-gray-200 pt-4 mt-2">
              <span className="flex items-center gap-2 text-xs text-gray-700">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 10v3M6 7v9M10 4v15M14 7v9M18 10v3"/></svg>
                {track.duration}
              </span>
              <button
                className={`rounded-full px-4 py-1 text-xs font-semibold flex items-center gap-2 transition ${isPlaying ? 'bg-green-500 text-white' : 'bg-blue-700 text-white hover:bg-blue-800'}`}
                onClick={() => handlePlayPause(track.id)}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {isPlaying ?
                    <g><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></g> :
                    <path d="M5 3l14 9-14 9V3z"/>
                  }
                </svg>
                {isPlaying ? "Pause" : "Play"}
              </button>
            </div>
          </div>
        );
      })}
    </div>
    </div>
  );
};

export { LibraryPage };
