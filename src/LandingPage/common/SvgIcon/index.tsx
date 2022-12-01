import { SvgIconProps } from "../types";

export const SvgIcon = ({ src, width, height }: SvgIconProps) => (
  <img src={require(`../../../Assets/images//${src}`)} alt={src} width={width} height={height} />
);
