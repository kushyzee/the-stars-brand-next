interface SectionHeaderProps {
  supertitle: string;
  title: string;
  subtitle?: string;
  fontSize?: "text-3xl" | "text-2xl";
  textCenter?: boolean;
}
export default function SectionHeader({
  supertitle,
  title,
  subtitle,
  fontSize,
  textCenter,
}: SectionHeaderProps) {
  return (
    <div className={textCenter ? "text-center" : ""}>
      <p className="font-playfair text-xs italic lg:text-base">{supertitle}</p>
      <h2
        className={`font-montserrat text-foreground-black mt-1 font-extrabold ${fontSize ? fontSize : "text-3xl lg:text-4xl"}`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="font-playfair text-foreground-black mt-1 italic lg:mt-1.5 lg:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}
