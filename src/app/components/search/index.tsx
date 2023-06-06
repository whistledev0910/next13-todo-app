"use client";

import useSearch from "@/app/hooks/useSearch";
import * as React from "react";

interface ISearchProps {}

const Search: React.FunctionComponent<ISearchProps> = (props) => {
  const search = useSearch();

  const [isLoading, setIsLoading] = React.useState(false);

  return (
    <div>
      <label
        htmlFor="searchString"
        className="mb-2 text-sm font-medium text-gray-900 sr-only"
      >
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-gray-500 "
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
        <input
          type="search"
          id="searchString"
          className={`transition block md:min-w-[300px] w-full p-4 pl-10 text-sm
          text-gray-900 border border-gray-300 rounded-lg
           bg-gray-50 focus:ring-orange-500 focus:border-orange-500
           focus:outline-0 `}
          placeholder="Search task"
          required
          value={search.searchString}
          onChange={(e) => search.setSearchString(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Search;
