import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { MenuButton, SearchButton } from "$store/islands/Header/Buttons.tsx";
import CartButtonVDNA from "$store/islands/Header/Cart/vnda.tsx";
import CartButtonVTEX from "$store/islands/Header/Cart/vtex.tsx";
import CartButtonWake from "$store/islands/Header/Cart/wake.tsx";
import CartButtonShopify from "$store/islands/Header/Cart/shopify.tsx";
import Searchbar from "$store/islands/Header/Searchbar.tsx";
// import Image from "apps/website/components/Image.tsx";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import { cmsMenu } from "deco-sites/madeiramadeira/components/header/constants.ts";
import { FaArrowRight, FaChevronDown, FaChevronRight } from "react-icons/fa";

export type DatoCMSMenu = {
  id: string;
  linkName: string;
  display: string;
  link: {
    id?: string;
    url?: string;
    image?: { url?: string } | null;
    _modelApiKey?: string;
  };

  children: {
    id: string;
    linkName: string;
    display: string;
    link: {
      id?: string;
      url?: string;
      image?: { url?: string } | null;
      _modelApiKey?: string;
    };

    children: {
      id: string;
      linkName: string;
      display: string;
      link: {
        id?: string;
        url?: string;
        image?: { url?: string } | null;
        _modelApiKey?: string;
      };

      children: {
        id: string;
        linkName: string;
        display: string;
        link: {
          id?: string;
          url?: string;
          image?: { url?: string } | null;
          _modelApiKey?: string;
        };
      }[];
    }[];
  }[];
}[];

export interface INavItem {
  label: string;
  href: string | null;
  children?: INavItem[];
  image?: { src?: string; alt?: string };
}

export interface INavbar {
  items: INavItem[];
  searchbar?: SearchbarProps;
  logo?: { src: string; alt: string };
}

export const transformDatoCMSToNavItems = (w: DatoCMSMenu[0]) => ({
  label: w.linkName,
  href: w.link.url!,
  image: { src: w.link?.image?.url },
  children: w.children?.map((x) => ({
    label: x.linkName,
    href: x.link.url!,
    image: { src: x.link?.image?.url },
    children: x.children?.map((y) => ({
      label: y.linkName,
      href: y.link.url!,
      image: { src: y.link?.image?.url },
      children: y.children?.map((z) => ({
        label: z.linkName,
        href: z.link.url!,
        image: { src: z.link?.image?.url },
      })),
    })),
  })),
});

export const countLevels = (obj: INavItem, level = 0): number => {
  if (!obj.children) return level;
  return Math.max(...obj.children.map((x) => countLevels(x, level + 1)));
};

const LINKS: INavItem[] = cmsMenu.map(transformDatoCMSToNavItems);

const bindDropdownMenu = () => {
  const links = document.querySelectorAll(`[data-menu-index]`);

  const getMenuIndex = (el: Element) => el.getAttribute("data-menu-index");

  const show = (el: Element) => {
    const id = getMenuIndex(el);
    const drop = document.getElementById(`menu-${id}`);

    el.querySelector("svg")?.classList.add("rotate-180");
    drop?.classList.remove("!hidden");
  };

  const hide = (el: Element) => {
    const id = getMenuIndex(el);
    const drop = document.getElementById(`menu-${id}`);

    el.querySelector("svg")?.classList.remove("rotate-180");
    drop?.classList.add("!hidden");
  };

  links.forEach((link) => {
    link.addEventListener("mouseenter", () => show(link));
    link.addEventListener("mouseleave", () => hide(link));
  });
};

function Navbar({ items, searchbar, logo }: INavbar) {
  const platform = usePlatform();

  return (
    <>
      {/* Mobile */}
      <div class="lg:hidden flex flex-col w-screen max-w-screen">
        <div class="flex flex-row gap-1 items-center">
          <MenuButton />

          {logo && (
            <a
              href="/"
              class="flex flex-1 items-center"
              aria-label="Store logo"
            >
              <Icon id="Logo" height={27} class="w-4/5" />
            </a>
          )}

          <div class="inline-flex flex-row flex-wrap justify-around p-1 border border max-w-[4rem]">
            <span class="flex justify-center w-full sm:text-[0.5rem] text-[0.43rem]">
              compre pelo
            </span>
            <Icon id="WhatsApp" height={18} width={18} />
            <Icon id="Phone" height={18} width={18} />
          </div>

          <div class="inline-flex flex-row">
            <div class="flex justify-center p-2">
              <Icon id="User" height={18} width={18} />
            </div>

            {platform === "vtex" && <CartButtonVTEX />}
            {platform === "vnda" && <CartButtonVDNA />}
            {platform === "wake" && <CartButtonWake />}
            {platform === "shopify" && <CartButtonShopify />}
          </div>
        </div>

        <div class="flex flex-row justify-between items-center ">
          <SearchButton />
        </div>
      </div>

      {/* Desktop */}
      <div class="hidden lg:flex flex-col w-full border-b border-base-200">
        <div class="bg-base-100 relative z-[100]">
          <div class="flex flex-row justify-between items-center w-full container z-50">
            <div class="flex-none w-auto">
              {logo && (
                <a
                  href="/"
                  aria-label="Store logo"
                  class="block"
                >
                  <Icon
                    strokeWidth={undefined}
                    id="Logo"
                    height={27}
                    width={202}
                  />
                </a>
              )}
            </div>
            <div class="flex flex-1 justify-center">
              <Searchbar searchbar={searchbar} />
            </div>
            <div class="flex w-44 items-center justify-end gap-2">
              <a
                class="btn btn-circle btn-sm btn-ghost"
                href="/login"
                aria-label="Log in"
              >
                <Icon id="User" size={24} strokeWidth={0.4} />
              </a>
              <a
                class="btn btn-circle btn-sm btn-ghost"
                href="/wishlist"
                aria-label="Wishlist"
              >
                <Icon
                  id="Heart"
                  size={24}
                  strokeWidth={2}
                  fill="none"
                />
              </a>
              {platform === "vtex" && <CartButtonVTEX />}
              {platform === "vnda" && <CartButtonVDNA />}
              {platform === "wake" && <CartButtonWake />}
              {platform === "shopify" && <CartButtonShopify />}
            </div>
          </div>
        </div>

        <div class="bg-[#004abe] relative z-[100]">
          <nav class="flex container text-white max-xl:gap-1 max-xl:justify-between">
            {LINKS.map((root, i) => (
              <a
                href={root.href!}
                class="text-sm xl:text-base px-2 xl:px-4 py-3 inline-flex items-center gap-2"
                data-menu-index={i}
              >
                {root.label}
                {root.children!.length > 0 && (
                  <FaChevronDown class="duration-300" />
                )}
              </a>
            ))}
          </nav>
        </div>

        <div class="bg-base-100 relative">
          <div class="container relative">
            {LINKS.filter((x) => x.children!.length).map((
              root,
              i,
            ) => (
              <div
                id={"menu-" + i}
                class="!hidden hover:!flex flex flex-row absolute w-full left-0 h-auto z-50"
              >
                <div class="pointer-events-none fixed w-screen h-screen left-0 top-0 bg-black/70" />

                {i === 0 && (
                  <ul class="flex flex-col bg-base-100 w-60 z-10">
                    {root.children!.map((a) => (
                      <li class="group/item px-3 py-2 hover:bg-neutral-100">
                        <a
                          href={a.href!}
                          class="inline-flex gap-2 justify-between items-center w-full text-base hover:text-[#004abe]"
                        >
                          {a.label}
                          {a.children!.length > 0 && <FaChevronRight />}
                        </a>

                        <ul class="hidden absolute group-hover/item:block px-6 py-4 gap-4 columns-4 top-0 left-[15rem] bg-base-100 w-[calc(100%-15rem)] min-h-[100%]">
                          {a.children!.map((b, ii) => (
                            <li class="break-inside-avoid mb-4">
                              <a
                                href={b.href!}
                                class="block w-full group hover:text-[#004abe]"
                              >
                                <div class="flex relative justify-between">
                                  <span class="font-semibold border-box border-b border-blue-100 pb-1 pr-6 group-hover:border-[#004abe]">
                                    {b.label}
                                  </span>
                                  <FaArrowRight class="hidden absolute right-0 top-1/2 -translate-y-1/2 group-hover:block" />
                                </div>
                              </a>

                              <nav class="flex flex-col pt-2 gap-1">
                                {b.children!.slice(0, 4).map((c) => (
                                  <a
                                    href={c.href!}
                                    class="w-full hover:text-[#004abe]"
                                  >
                                    {c.label}
                                  </a>
                                ))}
                              </nav>
                            </li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ul>
                )}

                {i === 1 && (
                  <>
                    <ul class="bg-base-100 w-full px-6 py-4 row-gap-5 gap-6 columns-5  z-10">
                      {root.children!.map((a, ii) => (
                        <li class="break-inside-avoid mb-4">
                          <a
                            href={a.href!}
                            class="block w-full group hover:text-[#004abe]"
                          >
                            <div class="w-full aspect-[1/1] mb-1 bg-neutral-100"></div>
                            <div class="flex relative justify-between">
                              <span class="font-semibold border-box border-b border-blue-100 pb-1 pr-6 group-hover:border-[#004abe]">
                                {a.label}
                              </span>
                              <FaArrowRight class="hidden absolute right-0 top-1/2 -translate-y-1/2 group-hover:block" />
                            </div>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                {i === 2 && (
                  <>
                    <ul class="bg-base-100 w-full px-6 py-4 row-gap-5 gap-6 columns-5  z-10">
                      {root.children!.map((a, ii) => (
                        <li class="break-inside-avoid mb-4">
                          <a
                            href={a.href!}
                            class="block w-full group hover:text-[#004abe]"
                          >
                            <div class="flex relative justify-between">
                              <span class="font-semibold border-box border-b border-blue-100 pb-1 pr-6 group-hover:border-[#004abe]">
                                {a.label}
                              </span>
                              <FaArrowRight class="hidden absolute right-0 top-1/2 -translate-y-1/2 group-hover:block" />
                            </div>
                          </a>

                          <nav class="flex flex-col pt-2 gap-1">
                            {a.children!.slice(0, 4).map((b) => (
                              <a
                                href={b.href!}
                                class="w-full hover:text-[#004abe]"
                              >
                                {b.label}
                              </a>
                            ))}
                          </nav>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <script
        type="module"
        dangerouslySetInnerHTML={{ __html: `(${bindDropdownMenu})();` }}
      />
    </>
  );
}

export default Navbar;
