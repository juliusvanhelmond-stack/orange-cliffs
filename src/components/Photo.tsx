import Image from "next/image";
import { images, pendingPhotos, type ImageKey, type ImageRecord, type PendingKey } from "@/content/images";

export const TEMP_LABEL = "Illustrative image · original property photography coming soon";

type PhotoProps = {
  image: ImageKey | ImageRecord;
  /** Responsive `sizes` hint for next/image. */
  sizes: string;
  className?: string;
  priority?: boolean;
  /** Fill the parent box (parent sets the size) instead of keeping the natural ratio. */
  fill?: boolean;
  /** Override the alt text, e.g. to mark a repeat as decorative (""). */
  alt?: string;
  /** Short label override; defaults to TEMP_LABEL for temporary images. */
  label?: string;
  labelPos?: "top" | "left";
  imgClassName?: string;
  reveal?: boolean;
};

export function resolveImage(image: ImageKey | ImageRecord): ImageRecord {
  return typeof image === "string" ? images[image] : image;
}

/** A photograph with its honesty built in: temporary pictures always carry a visible label. */
export function Photo({
  image,
  sizes,
  className = "",
  priority,
  fill = true,
  alt,
  label,
  labelPos,
  imgClassName,
  reveal,
}: PhotoProps) {
  const img = resolveImage(image);
  return (
    <figure className={`photo ${className}`} style={{ margin: 0 }} data-reveal={reveal ? "photo" : undefined}>
      {fill ? (
        <Image
          src={img.src}
          alt={alt ?? img.alt}
          fill
          sizes={sizes}
          priority={priority}
          className={imgClassName}
          style={{ objectFit: "cover", objectPosition: img.focus ?? "50% 50%" }}
        />
      ) : (
        <Image
          src={img.src}
          alt={alt ?? img.alt}
          width={img.width}
          height={img.height}
          sizes={sizes}
          priority={priority}
          className={imgClassName}
          style={{ width: "100%", height: "auto" }}
        />
      )}
      {img.isTemporary ? (
        <figcaption className="photo-label" data-pos={labelPos}>
          {label ?? TEMP_LABEL}
        </figcaption>
      ) : null}
    </figure>
  );
}

/** One-line credit for a location photograph, linking to its source and licence. */
export function Credit({ image, prefix }: { image: ImageKey | ImageRecord; prefix?: string }) {
  const img = resolveImage(image);
  if (!img.credit) return null;
  return (
    <>
      {prefix ?? img.subject}. Photo:{" "}
      <a href={img.credit.source} target="_blank" rel="noopener noreferrer">
        {img.credit.creator}
      </a>
      ,{" "}
      <a href={img.credit.licenseUrl} target="_blank" rel="noopener noreferrer">
        {img.credit.license}
      </a>
      {img.kind === "illustrative" ? " (illustrative)" : ""}
    </>
  );
}

/** A deliberate, labelled frame for a verified feature that has no authorised photograph yet. */
export function PendingPhoto({
  which,
  className = "",
  tone,
}: {
  which: PendingKey;
  className?: string;
  tone?: "green";
}) {
  const p = pendingPhotos[which];
  return (
    <div
      className={`pending-photo ${tone === "green" ? "on-green" : ""} ${className}`}
      role="img"
      aria-label={`${p.label}. Photograph coming soon.`}
    >
      <strong>{p.label}</strong>
      <span>Photograph coming soon, straight from the house.</span>
    </div>
  );
}
