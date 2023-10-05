import Header from "$store/components/ui/SectionHeader.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import Image from "apps/website/components/Image.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

export interface Category {
  tag?: string;
  label: string;
  description?: string;
  href?: string;
  image?: ImageWidget;
  buttonText?: string;
}

export interface Props {
  header?: {
    title?: string;
    description?: string;
  };
  list?: Category[];
}

function CategoryList(props: Props) {
  const id = useId();
  const {
    header = {
      title: "",
      description: "",
    },
    list = [
      {
        tag: "10% off",
        label: "Feminino",
        description: "Moda feminina direto de Milão",
        href: "/feminino",
        image:
          "https://ik.imagekit.io/decocx/tr:w-680,h-680/https:/ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/fdcb3c8f-d629-485e-bf70-8060bd8a9f65",
        buttonText: "Ver produtos",
      },
    ],
  } = props;

  return (
    <div
      id={id}
      class="max-md:pl-2 md:container py-8 flex flex-col gap-8 lg:gap-10 text-base-content lg:py-10"
    >
      <Header
        title={header.title}
        description={header.description || ""}
        alignment="center"
      />

      <Slider class="carousel carousel-start gap-4 lg:gap-8 row-start-3 row-end-5 overflow-y-hidden md:carousel-reveal md:grid-cols-4 lg:grid-cols-6">
        {list.map((
          { tag, label, description, href, image },
          index,
        ) => (
          <Slider.Item
            index={index}
            class="flex flex-col gap-4 carousel-item w-24 md:w-auto  first:pl-6 sm:first:pl-0 last:pr-6 sm:last:pr-0 lg:h-auto m-auto"
          >
            <figure>
              <Image
                class="card w-full"
                src={image || "https://placehold.co/160x160"}
                alt={description || label || tag}
                width={160}
                height={160}
                loading="lazy"
              />
            </figure>
            <a
              href={href}
              class="text-center h-12"
            >
              {label}
            </a>
          </Slider.Item>
        ))}
      </Slider>

      <SliderJS rootId={id} />
    </div>
  );
}

export default CategoryList;
