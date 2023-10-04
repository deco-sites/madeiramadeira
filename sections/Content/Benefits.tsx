import Header from "$store/components/ui/SectionHeader.tsx";
import Image from "apps/website/components/Image.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

export interface Props {
  title?: string;
  description?: string;
  benefits?: Array<{
    label: string;
    image: ImageWidget;
    description: string;
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
        <Header
          title={title}
          description={description}
          alignment="left"
        />
        <div class="w-full flex justify-center">
          <div class="flex flex-col gap-4 lg:gap-8 w-full lg:grid grid-flow-col auto-cols-fr">
            {benefits.map((benefit, index) => {
              return (
                <div
                  class={``}
                >
                  <div class="flex-none">
                    <Image
                      src={benefit.image}
                      style={{ aspectRatio: "108 / 150" }}
                      width={108}
                      height={150}
                      class="h-full object-contain"
                    />
                  </div>
                  <div class="flex-auto flex flex-col gap-1 lg:gap-2">
                    <div
                      class={`text-base lg:text-xl leading-7`}
                    >
                      {benefit.label}
                    </div>
                    <p
                      class={`text-sm leading-5`}
                    >
                      {benefit.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      )
    </>
  );
}
