import { IconProps } from "@/types/types";


export const Icon: React.FC<IconProps> = ({ size, alt, fill, name, ...props }) => {
  const iconPath = name?.startsWith("/")
    ? name
    : `/icon-${name}.svg`; // use public/ root so paths work on any route

  return (
    <svg
      width={size || "1em"}
      height={size || "1em"}
      role="img"
      fill={fill || "none"}
      aria-hidden={!alt || !!props["aria-labelledby"] || undefined}
      {...props}
    >
      {alt && <title>{alt}</title>}
      <image href={iconPath} width="100%" height="100%" />
    </svg>
  );
};

