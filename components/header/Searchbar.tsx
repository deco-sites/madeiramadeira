import Searchbar, {
  Props as SearchbarProps,
} from "$store/components/search/Searchbar.tsx";

export interface Props {
  searchbar?: SearchbarProps;
  openDrawer?: boolean;
}

function SearchbarModal({ searchbar, openDrawer }: Props) {

  if (!searchbar) {
    return null;
  }

  return (
    <Searchbar {...searchbar} openDrawer={openDrawer} /> 
  );
}

export default SearchbarModal;
