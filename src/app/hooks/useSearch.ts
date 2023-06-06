import { create } from "zustand";

interface SearchStore {
  searchString: string;
  setSearchString: (query: string) => void;
}

const useSearch = create<SearchStore>((set) => ({
  searchString: "",
  setSearchString: (query) => set({ searchString: query }),
}));

export default useSearch;
