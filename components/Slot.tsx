import Image from "next/image";

type Props = {
  src?: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
  style?: React.CSSProperties;
};

/** Full-bleed image that fills its parent (object-fit: cover). Without src it renders the placeholder frame. */
export default function Slot({ src, alt, priority, sizes = "(max-width: 1200px) 100vw, 50vw", style }: Props) {
  return (
    <div className="slot" style={style}>
      {src ? (
        <Image src={src} alt={alt} fill priority={priority} sizes={sizes} quality={70} />
      ) : (
        <div className="slot-ph" style={{ position: "absolute", inset: 0 }}>{alt}</div>
      )}
    </div>
  );
}
