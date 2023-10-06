import { renderToString } from "preact-render-to-string";
import type { ComponentChildren, JSX, VNode } from "preact";

interface ILazySVG {
  children?: ComponentChildren | JSX.Element | VNode;
}

const parseSVGToBase64 = (svg: string) => {
  const encoded = encodeURIComponent(svg);
  return `data:image/svg+xml;charset=utf-8,${encoded}`;
};


/**
 * @name LazySVG
 * @param children
 * @param parameters
 * @description Esse componente recebe um SVG como children e retorna um <img> com o srcSet em base64
 * @returns JSX.Element<HTMLImageElement>
 */
function LazySVG(
  { children, ...parameters }: ILazySVG & JSX.HTMLAttributes<HTMLImageElement>,
) {
  const svg = renderToString(children as never);

  const props: JSX.HTMLAttributes<HTMLImageElement> = {
    decoding: "async",
    loading: "lazy",
    srcSet: parseSVGToBase64(svg),
    ...parameters,
  };

  return <img {...props} />;
}

export default LazySVG;
