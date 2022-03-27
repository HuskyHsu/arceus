export function SearchBar() {
  return (
    <form className="flex items-center gap-2 p-4 justify-between rounded-full bg-opacity-20 bg-yellow-200">
      <span className="flex items-center gap-2">
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
          <path
            d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
        <input
          type="text"
          className="w-32 md:w-64 bg-opacity-0 bg-white focus:outline-0"
          placeholder="Search"
        />
      </span>
      <button type="button" className="flex">
        <span>全區域</span>
        <svg
          className="h-6 w-6"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </form>
  );
}
