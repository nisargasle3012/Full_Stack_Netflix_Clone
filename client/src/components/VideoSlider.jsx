import withPagination from "../hoc/withPagination";
import { MEDIA_TYPE } from "../types/Common";
import SlickSlider from "./slick-slider/SlickSlider";

export default function SliderRowForGenre({ genre, mediaType }) {
  const Component = withPagination(SlickSlider, mediaType, genre);
  return <Component />;
}
