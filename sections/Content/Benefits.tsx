import Header from "$store/components/ui/SectionHeader.tsx";
import Image from "apps/website/components/Image.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

export interface Props {
  title?: string;
  description?: string;
  benefits?: Array<{
    /**
     * @titleBy title
     */
    title: string;
    description: string;
    image: ImageWidget;

    link: {
      href: string;
      label: string;
    };
  }>;
}

export default function Benefits(
  props: Props,
) {
  const {
    title = "",
    description = "",
    benefits = [],
  } = props;

  return (
    <>
      <div class="w-full container px-4 py-8 flex flex-col gap-8 lg:gap-10 lg:py-10 lg:px-0">
        {
          /* <Header
          title={title}
          description={description}
          alignment="left"
        /> */
        }
        <div class="w-full flex justify-center">
          <div class="flex flex-col gap-4 lg:gap-24 w-full lg:grid grid-flow-col auto-cols-fr">
            {benefits.map((benefit, index) => {
              return (
                <div class="grid grid-rows-[6rem_3rem_1fr_1fr] text-center">
                  <div>
                    <Image
                      src={benefit.image}
                      width={96}
                      height={96}
                      class="mx-auto h-full object-contain aspect-[1/1]"
                    />
                  </div>
                  <div class="text-base font-semibold text-black">
                    {benefit.title}
                  </div>
                  <p class="text-[14px] px-10">
                    {benefit.description}
                  </p>

                  <div class="mt-1.5">
                    <a
                      class="inline-block border text-[#004ABE] border-[#004ABE] px-4 py-2 font-semibold rounded-sm"
                      href={benefit.link.href}
                    >
                      {benefit.link.label}
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
