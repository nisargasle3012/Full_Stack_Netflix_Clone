import { useState, useRef } from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import CustomNavigation from "./CustomNavigation";
import VideoItemWithHover from "../../components/VideoItemWithHover";
import { ARROW_MAX_WIDTH } from "../../constant";
import NetflixNavigationLink from "../../components/NetflixNavigationLink";
import MotionContainer from "../../components/animate/MotionContainer";
import { varFadeIn } from "../../components/animate/variants/fade/FadeIn";

// Root container for the slider
const RootStyle = styled("div")(() => ({
  position: "relative",
  width: "100%",
  overflow: "visible",
}));

// Styled slider
const StyledSlider = styled(Slider)(({ theme }) => ({
  overflow: "visible !important",
  "& .slick-list": {
    overflow: "visible",
    margin: 0,
    padding: 0,
  },
  "& .slick-track": {
    display: "flex",
    alignItems: "flex-start",
  },
  "& .slick-slide > div": {
    margin: "0 8px", // spacing between movies
  },
  [theme.breakpoints.down("sm")]: {
    "& .slick-slide > div": {
      margin: "0 4px",
    },
  },
}));

// Individual movie item
function SlideItem({ item }) {
  return <VideoItemWithHover video={item} />;
}

// Main slider component
export default function SlickSlider({ data, genre }) {
  const sliderRef = useRef(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [showExplore, setShowExplore] = useState(false);
  const [isEnd, setIsEnd] = useState(false);

  const beforeChange = (currentIndex, nextIndex) => {
    if (currentIndex < nextIndex) {
      setActiveSlideIndex(nextIndex);
    } else if (currentIndex > nextIndex) {
      setIsEnd(false);
    }
    setActiveSlideIndex(nextIndex);
  };

  const settings = {
    speed: 500,
    arrows: false,
    infinite: false,
    lazyLoad: "ondemand",
    slidesToShow: 6,
    slidesToScroll: 6,
    beforeChange,
    responsive: [
      { breakpoint: 1536, settings: { slidesToShow: 5, slidesToScroll: 5 } },
      { breakpoint: 1200, settings: { slidesToShow: 4, slidesToScroll: 4 } },
      { breakpoint: 900, settings: { slidesToShow: 3, slidesToScroll: 3 } },
      { breakpoint: 600, settings: { slidesToShow: 2, slidesToScroll: 2 } },
    ],
  };

  const handlePrevious = () => sliderRef.current?.slickPrev();
  const handleNext = () => sliderRef.current?.slickNext();

  return (
    <Box sx={{ overflow: "hidden", height: "100%", zIndex: 1, mb: 4 }}>
      {data.results.length > 0 && (
        <>
          <Stack
            spacing={2}
            direction="row"
            alignItems="center"
            sx={{ mb: 2, pl: { xs: "30px", sm: "60px" } }}
          >
            <NetflixNavigationLink
              variant="h5"
              to={`/genre/${
                genre.id || genre.name.toLowerCase().replace(" ", "_")
              }`}
              sx={{ display: "inline-block", fontWeight: 700 }}
              onMouseOver={() => setShowExplore(true)}
              onMouseLeave={() => setShowExplore(false)}
            >
              {`${genre.name} Movies `}
              <MotionContainer
                open={showExplore}
                sx={{ display: "inline", color: "success.main" }}
              >
                {"Explore All".split("").map((letter, index) => (
                  <motion.span key={index} variants={varFadeIn}>
                    {letter}
                  </motion.span>
                ))}
              </MotionContainer>
            </NetflixNavigationLink>
          </Stack>

          <RootStyle>
            <CustomNavigation
              isEnd={isEnd}
              arrowWidth={ARROW_MAX_WIDTH}
              onNext={handleNext}
              onPrevious={handlePrevious}
              activeSlideIndex={activeSlideIndex}
            >
              <StyledSlider ref={sliderRef} {...settings}>
                {data.results
                  .filter((i) => !!i.backdrop_path)
                  .map((item) => (
                    <SlideItem key={item.id} item={item} />
                  ))}
              </StyledSlider>
            </CustomNavigation>
          </RootStyle>
        </>
      )}
    </Box>
  );
}
