import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useLanguage } from "../contexts/LanguageContext";

interface SearchBarProps {
  className?: string;
}

const SearchBar = ({ className }: SearchBarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const { translate } = useLanguage();

  const handleToggle = () => {
    setIsOpen(!isOpen);
    setSearchValue("");
  };

  return (
    <div className={`relative flex items-center ${className}`}>
      {isOpen ? (
        <div className="flex items-center bg-gray-100 rounded-[20px] p-2">
          <input
            className="bg-transparent border-none outline-none pl-2 pr-1 w-[180px] text-sm"
            placeholder={translate('search.placeholder')}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            autoFocus
          />
          {/* Added proper spacing */}
          <button 
            className="p-2 text-gray-700 hover:text-black" 
            onClick={handleToggle}
          >
            <IoClose className="text-lg" />
          </button>
        </div>
      ) : (
        <button 
          className="p-2 rounded-full bg-gray-100 flex items-center justify-center"
          onClick={handleToggle}
        >
          {/* Added proper spacing around the search icon */}
          <FaSearch className="text-gray-700 text-sm mx-1" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
