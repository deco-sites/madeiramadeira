import type { Props as MenuProps } from "$store/components/header/Menu.tsx";
import Cart from "$store/components/minicart/Cart.tsx";
import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import Button from "$store/components/ui/Button.tsx";
import Drawer from "$store/components/ui/Drawer.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import type { ComponentChildren } from "preact";
import { lazy, Suspense } from "preact/compat";

const Menu = lazy(() => import("$store/components/header/Menu.tsx"));
const Searchbar = lazy(() => import("$store/components/search/Searchbar.tsx"));

export interface Props {
  menu: MenuProps;
  searchbar?: SearchbarProps;
  /**
   * @ignore_gen true
   */
  children?: ComponentChildren;
  platform: ReturnType<typeof usePlatform>;
}

interface AsideProps {
  title: string | undefined;
  onClose?: () => void;
  children: ComponentChildren;
}

const Aside = (
  { title, onClose, children }: AsideProps,
) => (
  <div class="bg-base-100 grid grid-rows-[auto_1fr] h-full divide-y max-w-[100vw]">
    <div class="flex justify-between items-center">
      {title && (
        <h1 class="px-4 py-3 font-medium text-2xl">
          {title}
        </h1>
      )}
      {onClose && (
        <Button aria-label="Fechar" class="btn btn-ghost" onClick={onClose}>
          <Icon id="XMark" size={24} strokeWidth={2} />
        </Button>
      )}
    </div>
    <Suspense
      fallback={
        <div class="w-screen flex items-center justify-center">
          <span class="loading loading-ring" />
        </div>
      }
    >
      {children}
    </Suspense>
  </div>
);

function Drawers({ menu, searchbar, children, platform }: Props) {
  const { displayCart, displayMenu, displaySearchDrawer } = useUI();

  const onClose = () => {
    displaySearchDrawer.value = false;
    displayMenu.value = false;
    displayCart.value = false;
  };

  return (
    <>
      <Drawer // Search from Left
        open={displaySearchDrawer.value}
        onClose={onClose}
        aside={
          <div class="bg-base-100 grid grid-rows-[auto_1fr] h-full divide-y max-w-[100vw]">
            <div class="flex justify-between items-center">
              <h1 class="px-4 py-3 font-medium text-2xl">
                Buscar
              </h1>
              {onClose && (
                <Button aria-label="Fechar" class="btn btn-ghost" onClick={onClose}>
                  <Icon id="XMark" size={24} strokeWidth={2} />
                </Button>
              )}
            </div>
            <Suspense
              fallback={
                <div class="w-screen flex items-center justify-center">
                  <span class="loading loading-ring" />
                </div>
              }
            >
              {searchbar && displaySearchDrawer.value && (
                <div class="w-screen">
                  {/* <Searchbar {...searchbar} /> */}
                </div>
              )}
            </Suspense>
          </div>
        }
      >
        {children}
      </Drawer>

      <Drawer // Menu from Left
        open={displayMenu.value}
        onClose={onClose}
        aside={
          <div class="bg-base-100 grid grid-rows-[auto_1fr] h-full divide-y max-w-[100vw]">
            <div class="flex justify-between items-center">
              <h1 class="px-4 py-3 font-medium text-2xl">
                Menu
              </h1>
              {onClose && (
                <Button aria-label="Fechar" class="btn btn-ghost" onClick={onClose}>
                  <Icon id="XMark" size={24} strokeWidth={2} />
                </Button>
              )}
            </div>
            <Suspense
              fallback={
                <div class="w-screen flex items-center justify-center">
                  <span class="loading loading-ring" />
                </div>
              }
            >
              {displayMenu.value && <Menu {...menu} />}
            </Suspense>
          </div>
        }
      >
        {children}
      </Drawer>

      <Drawer // Cart from Right
        class="drawer-end"
        open={displayCart.value !== false}
        onClose={onClose}
        aside={
          <div class="bg-base-100 grid grid-rows-[auto_1fr] h-full divide-y max-w-[100vw]">
            <div class="flex justify-between items-center">
              <h1 class="px-4 py-3 font-medium text-2xl">
                Carrinho
              </h1>
              {onClose && (
                <Button aria-label="Fechar" class="btn btn-ghost" onClick={onClose}>
                  <Icon id="XMark" size={24} strokeWidth={2} />
                </Button>
              )}
            </div>
            <Suspense
              fallback={
                <div class="w-screen flex items-center justify-center">
                  <span class="loading loading-ring" />
                </div>
              }
            >
              <Cart platform={platform} />
            </Suspense>
          </div>
        }
      >
        {children}
      </Drawer>
    </>
  );
}

export default Drawers;
