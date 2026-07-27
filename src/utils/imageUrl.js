const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL;

export function getImageUrl(imageUrl) {
  if (!imageUrl) {
    return "";
  }

  if (
    imageUrl.startsWith("http://") ||
    imageUrl.startsWith("https://") ||
    imageUrl.startsWith("blob:")
  ) {
    return imageUrl;
  }

  const apiOrigin =
    new URL(API_BASE_URL).origin;

  const normalisedPath =
    imageUrl.startsWith("/")
      ? imageUrl
      : `/${imageUrl}`;

  return `${apiOrigin}${normalisedPath}`;
}