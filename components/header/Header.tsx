import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import Drawers from "$store/islands/Header/Drawers.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Navbar from "./Navbar.tsx";
import { headerHeight } from "./constants.ts";
import { usePlatform } from "$store/sdk/usePlatform.tsx";

export interface NavItem {
  label: string;
  href: string;
  children?: Array<{
    label: string;
    href: string;
    children?: Array<{
      label: string;
      href: string;
    }>;
  }>;
  image?: {
    src?: ImageWidget;
    alt?: string;
  };
}

export interface Props {
  alerts: string[];
  /** @title Search Bar */
  searchbar?: SearchbarProps;
  /**
   * @title Navigation items
   * @description Navigation items used both on mobile and desktop menus
   */
  navItems?: NavItem[];

  /** @title Logo */
  logo?: { src: ImageWidget; alt: string };
}

function Header({
  alerts,
  searchbar,
  navItems = [],
  logo,
}: Props) {
  const platform = usePlatform();

  return (
    <>
      <header>
        <Drawers
          menu={{ items: navItems }}
          searchbar={searchbar}
          platform={platform}
        >
          <div class="bg-base-100 fixed w-full z-50">
            <Navbar items={navItems} searchbar={searchbar} logo={logo} />
          </div>
        </Drawers>
      </header>
    </>
  );
}

export default Header;
