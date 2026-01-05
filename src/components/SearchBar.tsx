import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
    onSearch: () => void;
    isError: boolean; // Pass the error state to show the message
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, onSearch, isError }) => {
    return (
        <div className="relative z-10 w-full max-w-md group mb-14 animate-fade-in">
            {/* Glow Effect */}
            <div className="absolute transition duration-500 rounded-full opacity-25 -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 blur group-hover:opacity-50"></div>
            
            <div className='relative flex w-full overflow-hidden transition-all border rounded-full shadow-2xl bg-black/30 backdrop-blur-xl border-white/10 group-hover:border-white/20'>
                <input
                    type="text"
                    placeholder="Search for a city..."
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && onSearch()}
                    className="w-full py-4 pl-6 pr-4 text-sm font-medium text-white bg-transparent outline-none placeholder:text-white/40"
                />
                <button 
                    onClick={onSearch} 
                    className='flex items-center justify-center px-6 text-white transition-colors border-l bg-white/10 hover:bg-white/20 border-white/10'
                >
                    <Search size={20} />
                </button>
            </div>
            
            {/* Error Message */}
            {isError && (
                <div className="absolute left-0 w-full mt-3 text-center top-full animate-fade-in">
                    <span className="px-3 py-1 text-sm text-red-400 border rounded-full bg-red-400/10 border-red-400/20">
                        City not found. Please try again.
                    </span>
                </div>
            )}
        </div>
    );
};

export default SearchBar;