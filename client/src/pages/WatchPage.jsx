import React, { useState, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Stack, Typography } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import SettingsIcon from "@mui/icons-material/Settings";
import BrandingWatermarkOutlinedIcon from "@mui/icons-material/BrandingWatermarkOutlined";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

import useWindowSize from "../hooks/useWindowSize";
import { formatTime } from "../utils/common";

import MaxLineTypography from "../components/MaxLineTypography";
import VolumeControllers from "../components/watch/VolumeControllers";
import VideoJSPlayer from "../components/watch/VideoJSPlayer";
import PlayerSeekbar from "../components/watch/PlayerSeekbar";
import PlayerControlButton from "../components/watch/PlayerControlButton";

export default function WatchPage() {
  const navigate = useNavigate();
  const playerRef = useRef(null);
  const windowSize = useWindowSize();

  const [playerState, setPlayerState] = useState({
    paused: false,
    muted: false,
    playedSeconds: 0,
    duration: 0,
    volume: 0.8,
  });
  const [playerInitialized, setPlayerInitialized] = useState(false);

  const videoJsOptions = useMemo(
    () => ({
      preload: "metadata",
      autoplay: true,
      controls: false,
      width: windowSize.width,
      height: windowSize.height,
      sources: [
        {
          src: "https://bitmovin-a.akamaihd.net/content/sintel/hls/playlist.m3u8",
          type: "application/x-mpegurl",
        },
      ],
    }),
    [windowSize]
  );

  const handlePlayerReady = (player) => {
    playerRef.current = player;
    setPlayerState((prev) => ({
      ...prev,
      paused: player.paused(),
      muted: player.muted(),
    }));

    player.on("pause", () => setPlayerState((prev) => ({ ...prev, paused: true })));
    player.on("play", () => setPlayerState((prev) => ({ ...prev, paused: false })));
    player.on("timeupdate", () =>
      setPlayerState((prev) => ({ ...prev, playedSeconds: player.currentTime() }))
    );

    player.one("durationchange", () => {
      setPlayerInitialized(true);
      setPlayerState((prev) => ({ ...prev, duration: player.duration() }));
    });
  };

  const handleVolumeChange = (value) => {
    if (playerRef.current) playerRef.current.volume(value);
    setPlayerState((prev) => ({ ...prev, volume: value }));
  };

  const handleSeekTo = (v) => playerRef.current?.currentTime(v);
  const handleGoBack = () => navigate("/browse");

  if (!videoJsOptions.width) return null;

  return (
    <Box sx={{ position: "relative" }}>
      <VideoJSPlayer options={videoJsOptions} onReady={handlePlayerReady} />

      {playerRef.current && playerInitialized && (
        <Box sx={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}>
          {/* Back button */}
          <Box px={2} sx={{ position: "absolute", top: 75 }}>
            <PlayerControlButton onClick={handleGoBack}>
              <KeyboardBackspaceIcon />
            </PlayerControlButton>
          </Box>

          {/* Title */}
          <Box px={2} sx={{ position: "absolute", top: { xs: "40%", sm: "55%", md: "60%" }, left: 0 }}>
            <Typography variant="h3" sx={{ fontWeight: 700, color: "white" }}>
              Default Video Title
            </Typography>
          </Box>

          {/* Age rating */}
          <Box px={{ xs: 0, sm: 1, md: 2 }} sx={{ position: "absolute", top: { xs: "50%", sm: "60%", md: "70%" }, right: 0 }}>
            <Typography
              variant="subtitle2"
              sx={{ px: 1, py: 0.5, fontWeight: 700, color: "white", bgcolor: "red", borderRadius: "12px 0 0 12px" }}
            >
              12+
            </Typography>
          </Box>

          {/* Bottom controls */}
          <Box px={{ xs: 1, sm: 2 }} sx={{ position: "absolute", bottom: 20, left: 0, right: 0 }}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <PlayerSeekbar
                value={playerState.playedSeconds ?? 0}
                max={playerState.duration ?? 0}
                onChange={handleSeekTo}
              />
            </Stack>

            <Stack direction="row" alignItems="center">
              {/* Left controller */}
              <Stack direction="row" spacing={{ xs: 0.5, sm: 1.5, md: 2 }} alignItems="center">
                {!playerState.paused ? (
                  <PlayerControlButton onClick={() => playerRef.current?.pause()}>
                    <PauseIcon />
                  </PlayerControlButton>
                ) : (
                  <PlayerControlButton onClick={() => playerRef.current?.play()}>
                    <PlayArrowIcon />
                  </PlayerControlButton>
                )}

                <PlayerControlButton>
                  <SkipNextIcon />
                </PlayerControlButton>

                <VolumeControllers
                  muted={playerState.muted}
                  onToggleMute={() => {
                    if (playerRef.current) {
                      const newMuted = !playerState.muted;
                      playerRef.current.muted(newMuted);
                      setPlayerState((prev) => ({ ...prev, muted: newMuted }));
                    }
                  }}
                  value={playerState.volume ?? 0.8}
                  onVolumeChange={handleVolumeChange}
                />

                <Typography variant="caption" sx={{ color: "white" }}>
                  {`${formatTime(playerState.playedSeconds)} / ${formatTime(playerState.duration)}`}
                </Typography>
              </Stack>

              {/* Middle description */}
              <Box flexGrow={1}>
                <MaxLineTypography
                  maxLine={1}
                  variant="subtitle1"
                  textAlign="center"
                  sx={{ maxWidth: 300, mx: "auto", color: "white" }}
                >
                  Default Video Description
                </MaxLineTypography>
              </Box>

              {/* Right controller */}
              <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1.5, md: 2 }}>
                <PlayerControlButton>
                  <SettingsIcon />
                </PlayerControlButton>
                <PlayerControlButton>
                  <BrandingWatermarkOutlinedIcon />
                </PlayerControlButton>
                <PlayerControlButton>
                  <FullscreenIcon />
                </PlayerControlButton>
              </Stack>
            </Stack>
          </Box>
        </Box>
      )}
    </Box>
  );
}

WatchPage.displayName = "WatchPage";
