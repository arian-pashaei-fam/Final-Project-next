import fetchImages from "@/lib/fetchImages";
import type { ImagesResults } from "@/models/Images";
import ImgContainer from "./ImgContainer";
import addBlurredDataUrls from "@/lib/getBase64";
import getPrevNextPages from "@/lib/getPrevNextPages";
import Footer from "./Footer";

type Props = {
  topic?: string | undefined;
  page?: string | undefined;
};

export default async function Gallery({ topic = "curated", page }: Props) {
  let url;
  if (topic === "curated" && page) {
    url = `https://api.pexels.com/v1/curated?page=${page}`;
  } else if (topic === "curated") {
    url = "https://api.pexels.com/v1/curated";
  } else if (!page) {
    url = `https://api.pexels.com/v1/search?query=${topic}`;
  } else {
    url = `https://api.pexels.com/v1/search?query=${topic}&page=${page}`;
  }

  const images: ImagesResults | undefined = await fetchImages(url);

  if (!images || images.per_page === 0) {
    return <h2 className="m-4 text-2xl font-bold">No Images Found</h2>;
  }

  const photowithBlur = await addBlurredDataUrls(images);

  // calculated pagination
  const { prevPage, nextPage } = getPrevNextPages(images);

  const footerProps = { topic, page, nextPage, prevPage };

  return (
    <>
      <section className="my-3 grid-cols-gallery grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {photowithBlur.map((photo) => (
          <ImgContainer key={photo.id} photo={photo} />
        ))}
      </section>

      {/* Footer */}
        <Footer {...footerProps} />

    </>
  );
}
