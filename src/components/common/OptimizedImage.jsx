const defaultWidths = [320, 480, 640, 750, 828, 1080, 1200, 1920, 2048, 3840];

const isCloudinaryUrl = (src) => src && src.includes('/upload/');

/**
 * Generates a Cloudinary URL with specified transformations.
 * @param {string} src - The base Cloudinary image URL.
 * @param {number} width - The target width of the image.
 * @returns {string} The transformed Cloudinary URL.
 */
const getCloudinaryUrl = (src, width) => {
  if (!isCloudinaryUrl(src)) {
    // Not a Cloudinary URL we can transform, return as is.
    return src;
  }
  // c_limit ensures the image is resized without cropping, preserving aspect ratio.
  // q_auto and f_auto automatically select the best quality and format.
  const transformations = `w_${width},c_limit,q_auto,f_auto`;
  return src.replace('/upload/', `/upload/${transformations}/`);
};

/**
 * A component that renders an optimized image from Cloudinary with responsive sources.
 */
export default function OptimizedImage({
  src,
  alt,
  className,
  loading = 'lazy',
  decoding = 'async',
  widths = defaultWidths,
  sizes = '(max-width: 768px) 100vw, 50vw',
}) {
  if (!src) {
    return null;
  }

  // For non-Cloudinary images, render a simple img tag without srcset optimization.
  if (!isCloudinaryUrl(src)) {
    return <img src={src} alt={alt} className={className} loading={loading} decoding={decoding} />;
  }

  const srcSet = widths
    .map(width => `${getCloudinaryUrl(src, width)} ${width}w`)
    .join(', ');

  // Use a medium-sized image as the default src for browsers that don't support srcset
  const defaultSrc = getCloudinaryUrl(src, widths[Math.floor(widths.length / 2)]);

  return (
    <img src={defaultSrc} srcSet={srcSet} sizes={sizes} alt={alt} className={className} loading={loading} decoding={decoding} />
  );
}