import type { ImagesResults } from "@/models/Images";
import { ImagesSchemeaWithPhotos } from "@/models/Images";
import env from "./env";

export default async function fetchImages(
  url: string
): Promise<ImagesResults | undefined> {
  try {
    const res = await fetch(url, {
      headers: {
        Authorization: env.PEXELS_API_KEY,
      },
    });

    if (!res.ok) throw new Error(`Failed to fetch images: ${res.status} ${res.statusText}`);

    const imagesResults: ImagesResults = await res.json();
    const parsedData = ImagesSchemeaWithPhotos.parse(imagesResults);

    if (parsedData.total_results === 0) return undefined;
    return parsedData;
  } catch (e) {
    if (e instanceof Error) console.log(e.stack);
  }
}
