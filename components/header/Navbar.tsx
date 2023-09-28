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
import type { INavItem } from "./NavItem.tsx";
// import NavItem from "./NavItem.tsx";
import { navbarHeight } from "./constants.ts";

function Navbar({ items, searchbar, logo }: {
  items: INavItem[];
  searchbar?: SearchbarProps;
  logo?: { src: string; alt: string };
}) {
  const platform = usePlatform();

  return (
    <>
      {/* Mobile Version */}
      <div
        class={`md:hidden flex flex-row justify-between items-center border-b border-base-200 w-full pl-2 pr-6 gap-2 min-h-[${navbarHeight}px]`}
      >
        <MenuButton />

        {logo && (
          <a
            href="/"
            class="flex-grow inline-flex items-center justify-start"
            style={{ minHeight: navbarHeight }}
            aria-label="Store logo"
          >
            <Icon id="Logo" height={27} width={188} />
          </a>
        )}

        <div class="flex gap-1">
          <SearchButton />
          
          {platform === "vtex" && <CartButtonVTEX />}
          {platform === "vnda" && <CartButtonVDNA />}
          {platform === "wake" && <CartButtonWake />}
          {platform === "shopify" && <CartButtonShopify />}
        </div>
      </div>

      {/* Desktop Version */}
      <div class="hidden md:flex flex-row justify-between items-center border-b border-base-200 w-full pl-2 pr-6 container">
        <div class="flex-none w-auto">
          {logo && (
            <a
              href="/"
              aria-label="Store logo"
              class="block px-4 py-3"
            >
              <Icon strokeWidth={undefined} id="Logo" height={27} />
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
    </>
  );
}

export default Navbar;
