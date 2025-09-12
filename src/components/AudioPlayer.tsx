import React, { useState, useRef, useEffect } from 'react';
import { AudioPlayerProps } from '../types/interfaces';
import { useTranslation } from 'next-i18next';

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audio, storyTitle, className = '' }) => {
  const { t } = useTranslation('common');
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Format time in MM:SS format
  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Handle play/pause
  const togglePlayPause = async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        setIsLoading(true);
        await audioRef.current.play();
        setIsPlaying(true);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error playing audio:', error);
      setIsLoading(false);
    }
  };

  // Handle seek
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    const newTime = parseFloat(e.target.value);
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  // Handle volume change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    const newVolume = parseFloat(e.target.value);
    audioRef.current.volume = newVolume;
    setVolume(newVolume);
  };

  // Handle playback rate change
  const handlePlaybackRateChange = (rate: number) => {
    if (!audioRef.current) return;
    audioRef.current.playbackRate = rate;
    setPlaybackRate(rate);
  };

  // Handle download
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = audio.audioUrl;
    link.download = audio.fileName || `${storyTitle}.mp3`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Audio event handlers
  useEffect(() => {
    const audioElement = audioRef.current;
    if (!audioElement) return;

    const handleLoadedMetadata = () => {
      setDuration(audioElement.duration);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audioElement.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    const handleError = () => {
      setIsLoading(false);
      setIsPlaying(false);
    };

    audioElement.addEventListener('loadedmetadata', handleLoadedMetadata);
    audioElement.addEventListener('timeupdate', handleTimeUpdate);
    audioElement.addEventListener('ended', handleEnded);
    audioElement.addEventListener('error', handleError);

    return () => {
      audioElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audioElement.removeEventListener('timeupdate', handleTimeUpdate);
      audioElement.removeEventListener('ended', handleEnded);
      audioElement.removeEventListener('error', handleError);
    };
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space' && e.target === document.body) {
        e.preventDefault();
        togglePlayPause();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [isPlaying]);

  return (
    <div className={`bg-white rounded-lg shadow-md p-4 md:p-6 ${className}`}>
      <audio
        ref={audioRef}
        src={audio.audioUrl}
        preload="metadata"
        aria-label={`Audio version of ${storyTitle}`}
      />
      
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
            </svg>
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-base sm:text-lg font-semibold text-[#101619] truncate">
              {t('audio.listenToStory')}
            </h3>
            <p className="text-xs sm:text-sm text-[#577c8e] truncate">
              {audio.narratorName && `${t('audio.narratedBy')} ${audio.narratorName}`}
            </p>
          </div>
        </div>
        <button
          onClick={handleDownload}
          className="text-[#577c8e] hover:text-[#101619] transition-colors flex-shrink-0 ml-2"
          aria-label={t('audio.download')}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </button>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center space-x-3 mb-2">
          <span className="text-sm text-[#577c8e] font-mono">
            {formatTime(currentTime)}
          </span>
          <div className="flex-1">
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${(currentTime / duration) * 100}%, #e5e7eb ${(currentTime / duration) * 100}%, #e5e7eb 100%)`
              }}
            />
          </div>
          <span className="text-sm text-[#577c8e] font-mono">
            {formatTime(duration)}
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="space-y-4">
        {/* Main Controls Row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {/* Play/Pause Button */}
            <button
              onClick={togglePlayPause}
              disabled={isLoading}
              className="w-12 h-12 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-full flex items-center justify-center transition-colors"
              aria-label={isPlaying ? t('audio.pause') : t('audio.play')}
            >
              {isLoading ? (
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
              ) : isPlaying ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                </svg>
              ) : (
                <svg className="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              )}
            </button>

            {/* Volume Control */}
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4 text-[#577c8e]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
              </svg>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={handleVolumeChange}
                className="w-12 md:w-16 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Playback Speed - Full Width on Mobile */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
          <span className="text-sm text-[#577c8e] font-medium">{t('audio.speed')}:</span>
          <div className="flex flex-wrap gap-1 sm:gap-2">
            {[0.5, 0.75, 1, 1.25, 1.5].map((rate) => (
              <button
                key={rate}
                onClick={() => handlePlaybackRateChange(rate)}
                className={`px-3 py-1.5 text-xs sm:text-sm rounded-md transition-colors ${
                  playbackRate === rate
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-[#577c8e] hover:bg-gray-300'
                }`}
              >
                {rate}x
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* File Info */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-1 sm:space-y-0 text-xs text-[#577c8e]">
          <span>
            {audio.fileSize && `${(audio.fileSize / 1024 / 1024).toFixed(1)} MB`}
          </span>
          <span>
            {audio.duration && `${formatTime(audio.duration)}`}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
