import { IconProps } from "@/types/types";


export const Icon: React.FC<IconProps> = ({size, alt, fill, name, ...props}) => {  
    return ( 
 <svg
      width={size || '1em'}
      height={size || '1em'}
      role="img"
      fill={fill || 'none'}
      aria-hidden={!alt || !!props['aria-labelledby'] || undefined}
      {...props}
    >
      {alt && <title>{alt}</title>}
      {(
        <use
          href={`icon-${name}.svg`}
        />
      )}
    </svg>
    )
}


