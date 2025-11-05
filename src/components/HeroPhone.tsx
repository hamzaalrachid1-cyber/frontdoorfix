import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  dual?: boolean;        // bruges til sider med to devices side om side
  className?: string;
  priority?: boolean;
};

export default function HeroPhone({ src, alt, dual, className, priority = false }: Props) {
  const classes = `heroPhone ${dual ? 'is-dual' : ''} ${className || ''}`.trim();
  
  return (
    <div className={classes}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width:1024px) 440px, 55vw"
        priority={priority}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className="heroPhone__img"
      />
    </div>
  );
}
