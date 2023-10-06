import {
  FaArrowRight,
  FaChevronDown,
  FaChevronRight,
  FaCircle,
} from "react-icons/fa";
// import Image from "apps/website/components/Image.tsx";

import Icon from "$store/components/ui/Icon.tsx";
import LazySVG from "$store/components/ui/LazySVG.tsx";
import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";

import Searchbar from "$store/islands/Header/Searchbar.tsx";
import CartButtonWake from "$store/islands/Header/Cart/wake.tsx";
import CartButtonVTEX from "$store/islands/Header/Cart/vtex.tsx";
import CartButtonVDNA from "$store/islands/Header/Cart/vnda.tsx";
import CartButtonShopify from "$store/islands/Header/Cart/shopify.tsx";
import { MenuButton, SearchButton } from "$store/islands/Header/Buttons.tsx";

import { usePlatform } from "$store/sdk/usePlatform.tsx";

export interface INavItem {
  label: string;
  href: string | null;
  children?: INavItem[];
  image?: { src?: string; alt?: string };
}

export interface Props {
  items: INavItem[];
  searchbar?: SearchbarProps;
  logo?: { src: string; alt: string };
}

const bindDropdownMenu = () => {
  const links = document.querySelectorAll(`[data-menu-index]`);

  const pickMenuIndex = (el: Element) => el.getAttribute("data-menu-index");

  const pickIcon = (el: Element) => el.querySelector("img");

  const pickDropByIndex = (index: number) =>
    document.getElementById(`menu-${index}`);

  const addRotate = (el: Element) => el?.classList.add("rotate-180");

  const removeRotate = (el: Element) => el?.classList.remove("rotate-180");

  const addHidden = (el: Element) => el?.classList.add("!hidden");

  const removeHidden = (el: Element) => el?.classList.remove("!hidden");

  const show = (el: Element) => {
    const id = pickMenuIndex(el);
    const icon = pickIcon(el);
    const drop = pickDropByIndex(+id!);

    addRotate(icon!);
    removeHidden(drop!);

    // Persist icon rotation on hover
    drop?.addEventListener("mouseenter", () => addRotate(icon!));
    drop?.addEventListener("mouseleave", () => removeRotate(icon!));
  };

  const hide = (el: Element) => {
    const id = pickMenuIndex(el);
    const icon = pickIcon(el);
    const drop = pickDropByIndex(+id!);

    removeRotate(icon!);
    addHidden(drop!);

    drop?.removeEventListener("mouseenter", () => addRotate(icon!));
    drop?.removeEventListener("mouseleave", () => removeRotate(icon!));
  };

  links.forEach((link) => {
    link.addEventListener("mouseenter", () => show(link));
    link.addEventListener("mouseleave", () => hide(link));
  });
};

function Navbar({ items, searchbar, logo }: Props) {
  const platform = usePlatform();

  return (
    <>
      {/* Mobile */}
      <>
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
      </>

      {/* Desktop */}
      <>
        <div class="hidden lg:flex flex-col w-full bg-base-100 relative z-[100]">
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

        <div class="hidden lg:flex flex-col w-full bg-[#004abe] relative z-[100]">
          <nav class="flex container text-white max-xl:gap-1 max-xl:justify-between">
            {items.map((root, i) => (
              <a
                href={root.href || "/"}
                class="text-sm xl:text-base px-2 xl:px-4 py-3 inline-flex items-center gap-2 group/menu-item"
                data-menu-index={root.children!.length > 0 ? i : undefined}
              >
                {root.label}
                {root.children!.length > 0 && (
                  <LazySVG class="duration-300 hover-group/menu-item:rotate-180">
                    <FaChevronDown color="#fff" />
                  </LazySVG>
                )}
              </a>
            ))}
          </nav>
        </div>

        <div class="hidden lg:flex w-full container relative">
          {items.filter((x) => x.children!.length).map((
            root,
            i,
          ) => (
            <div
              id={"menu-" + i}
              class="!hidden hover:!flex flex flex-row absolute w-full left-0 h-auto z-50"
            >
              <div class="pointer-events-none fixed w-screen h-screen left-0 top-0 bg-black/50" />

              {i === 0 && (
                <ul class="flex flex-col bg-base-100 w-60 z-10">
                  {root.children!.map((a) => (
                    <li class="group/item px-3 py-2 hover:bg-neutral-100">
                      <a
                        href={a.href!}
                        class="inline-flex gap-2 justify-between items-center w-full text-base hover:text-[#004abe]"
                      >
                        {a.label}
                        {a.children!.length > 0 &&
                          (
                            <>
                              <LazySVG class="hidden group-hover/item:inline-block">
                                <FaCircle color="#004abe" size={12} />
                              </LazySVG>
                              <LazySVG class="group-hover/item:hidden">
                                <FaChevronRight size={12} />
                              </LazySVG>
                            </>
                          )}
                      </a>

                      <ul class="hidden absolute group-hover/item:block px-6 py-4 gap-4 columns-4 top-0 left-[15rem] bg-base-100 w-[calc(100%-15rem)] min-h-[100%]">
                        {a.children!.map((b, ii) => (
                          <li class="break-inside-avoid mb-4">
                            <a
                              href={b.href!}
                              class="flex w-full relative group hover:text-[#004abe] justify-between"
                            >
                              <span class="font-semibold border-box border-b border-solid border-blue-100 pb-1 pr-6 group-hover:border-[#004abe]">
                                {b.label}
                              </span>

                              <LazySVG class="hidden absolute right-0 top-1/2 -translate-y-1/2 group-hover:block">
                                <FaArrowRight color="#004abe" size={14} />
                              </LazySVG>
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
                          <div class="w-full aspect-[1/1] mb-1 bg-neutral-100">
                          </div>
                          <div class="flex relative justify-between">
                            <span class="font-semibold border-box border-b border-blue-100 pb-1 pr-6 group-hover:border-[#004abe]">
                              {a.label}
                            </span>
                            <LazySVG>
                              <FaArrowRight class="hidden absolute right-0 top-1/2 -translate-y-1/2 group-hover:block" />
                            </LazySVG>
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
                            <LazySVG>
                              <FaArrowRight class="hidden absolute right-0 top-1/2 -translate-y-1/2 group-hover:block" />
                            </LazySVG>
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

        <script
          type="module"
          dangerouslySetInnerHTML={{ __html: `(${bindDropdownMenu})();` }}
        />
      </>
    </>
  );
}

export default Navbar;
