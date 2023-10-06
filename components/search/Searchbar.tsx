/**
 * We use a custom route at /s?q= to perform the search. This component
 * redirects the user to /s?q={term} when the user either clicks on the
 * button or submits the form. Make sure this page exists in deco.cx/admin
 * of yout site. If not, create a new page on this route and add the appropriate
 * loader.
 *
 * Note that this is the most performatic way to perform a search, since
 * no JavaScript is shipped to the browser!
 */

import ProductCard from "$store/components/product/ProductCard.tsx";
import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { useId } from "$store/sdk/useId.ts";
import { useSuggestions } from "$store/sdk/useSuggestions.ts";
import { useUI } from "$store/sdk/useUI.ts";
import { Suggestion } from "apps/commerce/types.ts";
import { Resolved } from "deco/engine/core/resolver.ts";
import { useEffect, useRef } from "preact/compat";

// Editable props
export interface Props {
  /**
   * @title Placeholder
   * @description Search bar default placeholder message
   * @default What are you looking for?
   */
  placeholder?: string;
  /**
   * @title Page path
   * @description When user clicks on the search button, navigate it to
   * @default /s
   */
  action?: string;
  /**
   * @title Term name
   * @description Querystring param used when navigating the user
   * @default q
   */
  name?: string;
  /**
   * @title Open Drawer
   * @description  When user clicks on the search input, open the drawer
   * @default false
   */
  openDrawer?: boolean;

  /**
   * @title Suggestions Integration
   * @todo: improve this typings ({query: string, count: number}) => Suggestions
   */
  loader: Resolved<Suggestion | null>;
}

function Searchbar({
  placeholder = "What are you looking for?",
  action = "/s",
  name = "q",
  openDrawer = false,
  loader,
}: Props) {
  const id = useId();
  const { displaySearchPopup, displaySearchDrawer } = useUI();
  const search = useRef<HTMLDivElement>(null);
  const suggestions = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { setQuery, payload, loading } = useSuggestions(loader);
  const { products = [], searches = [] } = payload.value ?? {};
  const hasProducts = Boolean(products.length);
  const hasTerms = Boolean(searches.length);

  useEffect(() => {
    if (displaySearchPopup.value === true) {
      searchInputRef.current?.focus();
    }
  }, [displaySearchPopup.value]);

  useEffect(() => {
    if (displaySearchDrawer.value === true) {
      if (search.current) search.current.style.zIndex = "9999";
      if (suggestions.current) suggestions.current.classList.remove("hidden");
    } else {
      if (search.current) search.current.style.zIndex = "0";
      if (suggestions.current) suggestions.current.classList.add("hidden");
    }
  }, [displaySearchDrawer.value, suggestions]);

  return (
    <div
      ref={search}
      class="relative w-full grid overflow-y-hidden"
      style={{ gridTemplateRows: "min-content auto" }}
    >
      <form id={id} action={action} class="join relative">
        <input
          ref={searchInputRef}
          id="search-input"
          type="search"
          class="px-3 py-2 lg:pr-14 text-base flex-grow border rounded-md"
          name={name}
          onFocus={(e) => {
            if(openDrawer) {
              displaySearchDrawer.value = true;
            }
            // displaySearchPopup.value = true;
          }}
          onInput={(e) => {
            const value = e.currentTarget.value;

            if (value) {
              sendEvent({
                name: "search",
                params: { search_term: value },
              });
            }

            setQuery(value);
          }}
          placeholder={placeholder}
          role="combobox"
          aria-controls="search-suggestion"
          autocomplete="off"
        />
        <Button
          type="submit"
          class="bg-transparent absolute right-0 top-1/2 -translate-y-1/2 hover:bg-transparent"
          aria-label="Search"
          for={id}
          tabIndex={-1}
        >
          {loading.value
            ? <span class="loading loading-spinner loading-xs" />
            : <Icon id="MagnifyingGlass" size={24} strokeWidth={0.01} />}
        </Button>
        {
          /* <Button
          type="button"
          class="join-item btn-ghost btn-square hidden sm:inline-flex"
          onClick={() => displaySearchPopup.value = false}
        >
          <Icon id="XMark" size={24} strokeWidth={2} />
        </Button> */
        }
      </form>

      <div
        ref={suggestions}
        class="overflow-y-scroll hidden"
      >
        <div class="gap-4 grid grid-cols-1 sm:grid-rows-1 sm:grid-cols-[150px_1fr]">
          <div class="flex flex-col gap-6">
            <span
              class="font-medium text-xl"
              role="heading"
              aria-level={3}
            >
              Sugestões
            </span>
            <ul id="search-suggestion" class="flex flex-col gap-6">
              {searches.map(({ term }) => (
                <li>
                  <a href={`/s?q=${term}`} class="flex gap-4 items-center">
                    <span>
                      <Icon
                        id="MagnifyingGlass"
                        size={24}
                        strokeWidth={0.01}
                      />
                    </span>
                    <span dangerouslySetInnerHTML={{ __html: term }} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div class="flex flex-col pt-6 md:pt-0 gap-6 overflow-x-hidden">
            <span
              class="font-medium text-xl"
              role="heading"
              aria-level={3}
            >
              Produtos sugeridos
            </span>
            <Slider class="carousel">
              {products.map((product, index) => (
                <Slider.Item
                  index={index}
                  class="carousel-item first:ml-4 last:mr-4 min-w-[200px] max-w-[200px]"
                >
                  <ProductCard product={product} platform={"vtex"} />
                </Slider.Item>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Searchbar;
