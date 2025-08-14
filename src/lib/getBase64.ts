import { getPlaiceholder } from "plaiceholder";
import { Photo, ImagesResults } from "@/models/Images";

async function getBase64(imageUrl: string) {
  try {
    const res = await fetch(imageUrl);

    if (!res.ok) {
      throw new Error("Flaide to Fetch ");
    }

    const buffer = await res.arrayBuffer();
    const { base64 } = await getPlaiceholder(Buffer.from(buffer));

    return base64;
  } catch (e) {
    if (e instanceof Error) console.log(e.stack);
  }
}

export default async function addBlurredDataUrls(
  images: ImagesResults
): Promise<Photo[]> {
  const base64Promises = images.photos.map((photo) =>
    getBase64(photo.src.large)
  );

  const base64Result = await Promise.all(base64Promises);

  const photoWithBlur: Photo[] = images.photos.map((photo, i) => {
    photo.blurredDataUrl = base64Result[i];
    return photo;
  });
  
  return photoWithBlur;
}
