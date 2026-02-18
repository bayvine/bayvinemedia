export const PHOTO_PLACEHOLDER_SRC = "/images/photo-placeholder.svg";
export const VIDEO_PLACEHOLDER_SRC = "/images/video-placeholder.svg";
export const FAQ_PHOTO_PLACEHOLDER_SRC = '/images/faq-placeholder.webp';

export const withPhotoPlaceholderBackground = (url?: string | null) =>
  url ? `url(${url}), url(${PHOTO_PLACEHOLDER_SRC})` : `url(${PHOTO_PLACEHOLDER_SRC})`;
