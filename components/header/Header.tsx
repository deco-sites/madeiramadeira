import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import Drawers from "$store/islands/Header/Drawers.tsx";
import Navbar from "./Navbar.tsx";
import type { INavItem } from "./Navbar.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import { usePlatform } from "$store/sdk/usePlatform.tsx";

export interface Props {
  /** @title Search Bar */
  searchbar?: SearchbarProps;
  /**
   * @title Navigation items
   * @description Navigation items used both on mobile and desktop menus
   */
  navItems?: INavItem[];

  /** @title Logo */
  logo?: { src: ImageWidget; alt: string };
}

function Header({
  searchbar,
  navItems = [],
  logo,
}: Props) {
  const platform = usePlatform();

  return (
    <>
      <Navbar items={navItems} searchbar={searchbar} logo={logo} />
      
      <Drawers
        menu={{ items: navItems }}
        searchbar={searchbar}
        platform={platform}
      />
    </>
  );
}

export default Header;
