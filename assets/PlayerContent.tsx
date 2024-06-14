"use client";

import React, { useState, useRef, useEffect } from "react";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import FastForwardIcon from "@mui/icons-material/FastForward";
import FastRewindIcon from "@mui/icons-material/FastRewind";
import VolumeUp from "@mui/icons-material/VolumeUp";
import Slider from "@mui/material/Slider";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import ClearIcon from "@mui/icons-material/Clear";

interface PlayerContentProps {
    key: number;
  audioUrl: string;
  filename: string;
}

const PlayerContent: React.FC<PlayerContentProps> = ({key,
  audioUrl,
  filename,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [totalDuration, setTotalDuration] = useState(0);

  const togglePlayPause = () => {
    if (audioRef.current) {
      console.log(totalDuration);
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickPosition = e.clientX - rect.left;
      const clickPercentage = clickPosition / rect.width;
      const newTime = clickPercentage * totalDuration;
      audioRef.current.currentTime = newTime;
      setProgress(newTime);
    }
  };

  const handleVolumeChange = (
    event: React.ChangeEvent<{}>,
    newValue: number | number[]
  ) => {
    console.log(event);
    console.log(newValue);
    const newVolume = typeof newValue === "number" ? newValue : newValue[0];
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    setVolume(newVolume);
  };

  const updateProgress = () => {
    if (audioRef.current) {
      setProgress(audioRef.current.currentTime);
    }
  };

  const setAudioDuration = () => {
    if (audioRef.current) {
      setTotalDuration(audioRef.current.duration);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener("timeupdate", updateProgress);
      audioRef.current.addEventListener("loadedmetadata", setAudioDuration);
      return () => {
        audioRef.current?.removeEventListener("timeupdate", updateProgress);
        audioRef.current?.removeEventListener(
          "loadedmetadata",
          setAudioDuration
        );
      };
    }
  }, []);

  return (
    <div className="backdrop-blur-md bg-white shadow-md text-black flex items-center justify-between p-4 gap-x-4 rounded">
      <div className="flex items-center">
        <div className = "text-sm font-bold">
            {key}
        </div>
        <div>
          <div className="text-sm font-base">{filename}</div>
        </div>
      </div>

      <div className="flex flex-row justify-between items-center w-full text-xs gap-x-4">
        <div className="flex flex-row text-gray-400">
          <span>{new Date(progress * 1000).toISOString().substr(14, 5)}</span>
          <span className="px-2">{"|"}</span>
          <span>
            {new Date(totalDuration * 1000).toISOString().substr(14, 5)}
          </span>
        </div>
        <button onClick={togglePlayPause}>
          {isPlaying ? (
            <PauseCircleIcon fontSize="medium" />
          ) : (
            <PlayCircleIcon fontSize="medium" />
          )}
        </button>

        <div
          className="relative w-32 h-1 bg-gray-600 cursor-pointer"
          onClick={handleProgressClick}
        >
          <div
            className="absolute top-0 left-0 h-1 bg-green-500"
            style={{ width: `${(progress / totalDuration) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="flex items-center space-x-6 justify-center">
        <Box sx={{ width: 100, height: 24 }}>
          <Stack spacing={1} direction="row" alignItems="center">
            <VolumeUp fontSize="small" />
            <Slider
              sx={{
                "& .MuiSlider-thumb": {
                  color: "#16a34a ",
                },
                "& .MuiSlider-track": {
                  color: "#16a34a ",
                },
                "& .MuiSlider-active": {
                  color: "#16a34a ",
                },
              }}
              size="small"
              aria-label="Volume"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={handleVolumeChange}
            />
          </Stack>
        </Box>

        <ClearIcon
          onClick={() => console.log("delete")}
          sx={{ "&:hover": { color: "red" } }}
        />
      </div>

      <audio ref={audioRef} src={audioUrl}></audio>
    </div>
  );
};

export default PlayerContent;
