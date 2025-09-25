import withPagination from "../hoc/withPagination";
import { MEDIA_TYPE } from "../types/Common";
import GridWithInfiniteScroll from "./GridWithInfiniteScroll";

export default function GridPage({ genre, mediaType }) {
  const Component = withPagination(
    GridWithInfiniteScroll,
    mediaType,
    genre
  );
  return <Component />;
}
