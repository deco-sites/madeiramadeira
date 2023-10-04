import { Picture, Source } from "apps/website/components/Picture.tsx";
import Header from "$store/components/ui/SectionHeader.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

/**
 * @titleBy alt
 */
export interface Banner {
  srcMobile: ImageWidget;
  srcDesktop?: ImageWidget;
  /**
   * @description Image alt text
   */
  alt: string;
  /**
   * @description Adicione um link
   */
  href: string;
}

export type BorderRadius =
  | "none"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "full";

export interface Props {
  title?: string;
  description?: string;
  /**
   * @maxItems 5
   * @minItems 5
   */
  banners?: Banner[];
  // layout?: {};
}

const DEFAULT_PROPS: Props = {
  "banners": [
    {
      "srcMobile":
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/b531631b-8523-4feb-ac37-5112873abad2",
      "srcDesktop":
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/b531631b-8523-4feb-ac37-5112873abad2",
      "alt": "Fashion",
      "href": "/",
    },
    {
      "alt": "Fashion",
      "href": "/",
      "srcMobile":
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/1125d938-89ff-4aae-a354-63d4241394a6",
      "srcDesktop":
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/1125d938-89ff-4aae-a354-63d4241394a6",
    },
    {
      "srcMobile":
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/dd1e2acb-ff80-49f9-8f56-1deac3b7a42d",
      "srcDesktop":
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/dd1e2acb-ff80-49f9-8f56-1deac3b7a42d",
      "href": "/",
      "alt": "Fashion",
    },
    {
      "srcMobile":
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/0b85ba2d-48b1-4f5b-b619-7f4a7f50b455",
      "srcDesktop":
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/0b85ba2d-48b1-4f5b-b619-7f4a7f50b455",
      "alt": "Fashion",
      "href": "/",
    },
  ],
};

export default function Gallery(props: Props) {
  const { title, description, banners } = {
    ...DEFAULT_PROPS,
    ...props,
  };

  return (
    <section class="container px-4 py-8 flex flex-col gap-8 lg:gap-10 lg:py-10 lg:px-0">
      <ul class="flex flex-col sm:grid sm:grid-cols-3 sm:grid-rows-2 gap-6 list-none sm:h-[30rem]">
        {banners?.map((banner, i) => (
          <li class={`h-48 sm:h-auto overflow-hidden relative group rounded-md ${(i === 0) ? "sm:row-span-2" : ""}`}>
            <div class={`bg-[#d9d9d9] absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 h-full sm:duration-300 sm:group-hover:scale-125 ${(i === 0) ? "w-[120%] absolute h-full block" : "w-full"}`}>
              <Picture>
                <Source
                  width={190}
                  height={190}
                  media="(max-width: 767px)"
                  src={banner.srcMobile}
                />
                <Source
                  width={640}
                  height={420}
                  media="(min-width: 768px)"
                  src={banner.srcDesktop || banner.srcMobile}
                />
                <img
                  class={`sm:pl-0 sm:aspect-[16/9] ${(i === 0 ? "absolute max-sm:w-2/3 sm:w-initial pl-[1.25rem] max-sm:left-1/2 max-sm:-translate-x-1/2 sm:translate-initial top-1/2 -translate-y-1/2 sm:left-[2.5rem]" : "object-cover top-1/2 -translate-y-1/2 w-full sm:w-initial absolute left-1/2 -translate-x-1/2")}`}
                  src={banner.srcMobile}
                  alt={banner.alt}
                  decoding="async"
                  loading="lazy"
                />
              </Picture>
            </div>
            <a href={banner.href} class="absolute w-full h-full left-0 top-0 group" > 
              <span class="absolute left-1/2 -translate-x-1/2 text-lg text-center text-[#004ABE] font-semibold rounded-md bg-white px-4 max-sm:w-full max-w-[90%] sm:max-w-[12rem] py-2 bottom-3">{banner.alt}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
