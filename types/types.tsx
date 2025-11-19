
export type IconProps = Omit<
  React.ComponentPropsWithoutRef<'svg'>,
  'children'
> & {
  /**
   * If icon needs accessibility, set aria-hidden to false
   * and include an accessible title or aria-labelledby.
   */
  alt?: string;
  size?: string;
  name?: 'logo' | string;
}