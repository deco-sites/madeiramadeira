import { Picture, Source } from "apps/website/components/Picture.tsx";
import { useId } from "$store/sdk/useId.ts";
import type { HTMLWidget, ImageWidget } from "apps/admin/widgets.ts";

export interface Banner {
  /** @description desktop otimized image */
  desktop?: ImageWidget;
  /** @description tablet otimized image */
  tablet?: ImageWidget;
  /** @description mobile otimized image */
  mobile?: ImageWidget;
  /** @description Image's alt text */
  alt?: string;

  action?: {
    /** @description when user clicks on the image, go to this link */
    href?: string;
    /** @description Button label */
    label?: string;
  };

  /**
   * @description Check this option when this banner is the biggest image on the screen for image optimizations
   */
  preload?: boolean;
}

export interface Props {
  image?: Banner;

  /**
   * @title Link href
   * @default #
   */
  href?: string;

  /**
   * @title Expires at date
   * @format datetime
   */
  expiresAt?: string;

  labels?: {
    /**
     * @title Text to show when expired
     */
    expired?: string;
    days?: string;
    hours?: string;
    minutes?: string;
    seconds?: string;
  };
}

const snippet = (expiresAt: string, rootId: string) => {
  const expirationDate = new Date(expiresAt).getTime();

  const getDelta = () => {
    const delta = expirationDate - new Date().getTime();

    const days = Math.floor(delta / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (delta % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor((delta % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((delta % (1000 * 60)) / 1000);
    const totalHours = (days * 24) + hours;

    return {
      days,
      hours: Math.min(totalHours, 99),
      minutes,
      seconds,
    };
  };

  const setValue = (id: string, value: number) => {
    const elem = document.getElementById(id);

    if (!elem) return;

    elem.style.setProperty("--value", value.toString());
  };

  const start = () =>
    setInterval(() => {
      const { days, hours, minutes, seconds } = getDelta();
      const isExpired = hours + minutes + seconds < 0;

      if (isExpired) {
        const expired = document.getElementById(`${rootId}::expired`);
        const counter = document.getElementById(`${rootId}::counter`);

        expired && expired.classList.remove("hidden");
        counter && counter.classList.add("hidden");
      } else {
        setValue(`${rootId}::days`, days);
        setValue(`${rootId}::hours`, hours);
        setValue(`${rootId}::minutes`, minutes);
        setValue(`${rootId}::seconds`, seconds);
      }
    }, 1_000);

  document.readyState === "complete"
    ? start()
    : addEventListener("load", start);
};

function CampaignTimer({
  expiresAt = `${new Date()}`,
  labels,
  image,
  href = "/hello",
}: Props) {
  const id = useId();

  return (
    <>
      <div class="bg-[#FFA901] text-accent-content relative h-[64px]">
        <div class="container relative h-full px-0">
          <div
            id={`${id}::counter`}
            class="absolute mx-auto flex flex-row w-full h-full items-center justify-end"
          >
            <div class="grid grid-flow-col bg-white text-black p-2 rounded-md gap-3 text-center auto-cols-max items-center">
              {}
              <div class="flex flex-row items-end text-xs lg:text-sm">
                <span class="countdown font-normal text-xl lg:text-2xl tabular-nums">
                  <span id={`${id}::days`} />
                </span>
                {labels?.days || ""}
              </div>
              <div>:</div>
              <div class="flex flex-row items-end text-xs lg:text-sm">
                <span class="countdown font-normal text-xl lg:text-2xl tabular-nums">
                  <span id={`${id}::hours`} />
                </span>
                {labels?.hours || ""}
              </div>
              <div>:</div>
              <div class="flex flex-row items-end text-xs lg:text-sm">
                <span class="countdown font-normal text-xl lg:text-2xl tabular-nums">
                  <span id={`${id}::minutes`} />
                </span>
                {labels?.minutes || ""}
              </div>
              <div>:</div>
              <div class="flex flex-row items-end text-xs lg:text-sm">
                <span class="countdown font-normal text-xl lg:text-2xl tabular-nums">
                  <span id={`${id}::seconds`} />
                </span>
                {labels?.seconds || ""}
              </div>
            </div>
          </div>

          {image && image.desktop && image.mobile && (
            <Picture>
              <Source
                width={375}
                height={50}
                media="(max-width: 767px)"
                src={image?.mobile}
              />
              <Source
                width={375 + 140}
                height={50}
                media="(min-width: 768px) and (max-width:1024px)"
                src={`https://ik.imagekit.io/decocx/tr:w-full,cm-extract,x-380,q-80/${image?.desktop}`}
              />
              <Source
                width={1366}
                height={64}
                media="(min-width: 1025px)"
                src={image?.desktop}
              />
              <img
                src={image?.mobile}
                alt={image?.alt}
                decoding="async"
                loading="lazy"
                class="h-full block"
              />
            </Picture>
          )}
        </div>

        <a href={image?.action?.href || "#"} class={`after:content-[''] after:absolute after:inset-0 after:block after:w-full after:h-full`}></a>
      </div>
      <script
        type="module"
        dangerouslySetInnerHTML={{
          __html: `(${snippet})("${expiresAt}", "${id}");`,
        }}
      />
    </>
  );
}

export default CampaignTimer;
