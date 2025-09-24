import { forwardRef, useCallback, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";

import MaxLineTypography from "./MaxLineTypography";
import PlayButton from "./PlayButton";
import NetflixIconButton from "./NetflixIconButton";
import AgeLimitChip from "./AgeLimitChip";
import QualityChip from "./QualityChip";
import { formatMinuteToReadable, getRandomNumber } from "../utils/common";
import SimilarVideoCard from "./SimilarVideoCard";
import { useDetailModal } from "../providers/DetailModalProvider";
import { useGetSimilarVideosQuery } from "../store/slices/discover";
import { MEDIA_TYPE } from "../types/Common";
import VideoJSPlayer from "./watch/VideoJSPlayer";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DetailModal() {
  const { detail, setDetailType } = useDetailModal();
  const { data: similarVideos } = useGetSimilarVideosQuery(
    { mediaType: detail.mediaType ?? MEDIA_TYPE.Movie, id: detail.id ?? 0 },
    { skip: !detail.id }
  );

  const playerRef = useRef(null);
  const [muted, setMuted] = useState(true);

  const handleReady = useCallback((player) => {
    playerRef.current = player;
    setMuted(player.muted());
  }, []);

  const handleMute = useCallback((status) => {
    if (playerRef.current) {
      playerRef.current.muted(!status);
      setMuted(!status);
    }
  }, []);

  if (detail.mediaDetail) {
    return (
      <Dialog
        fullWidth
        scroll="body"
        maxWidth="md"
        open={!!detail.mediaDetail}
        id="detail_dialog"
        TransitionComponent={Transition}
      >
        <DialogContent sx={{ p: 0, bgcolor: "#181818" }}>
          {/* ...rest of the JSX remains unchanged... */}
        </DialogContent>
      </Dialog>
    );
  }

  return null;
}
