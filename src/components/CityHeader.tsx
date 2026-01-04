import React from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft } from 'lucide-react';

interface CityHeaderProps {
    cityName: string;
    country: string;
    selectedForecast: any;
    activeDate: string;
    isToday: boolean;
}

const CityHeader: React.FC<CityHeaderProps> = ({ cityName, country, selectedForecast, activeDate, isToday }) => {
    const navigate = useNavigate();

    return (
        <div className="w-full flex items-center mb-2">
            <button onClick={() => navigate('/')} className="p-2 bg-white/10 rounded-full mr-4 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all">
                <ArrowLeft size={18} />
            </button>
            <div className="flex flex-col">
                <h1 className="text-xl font-bold leading-tight">{cityName}, {country}</h1>
                {(selectedForecast || !isToday) && (
                    <span className="text-[10px] text-blue-300 font-bold uppercase animate-pulse">
                        Viewing: {selectedForecast 
                            ? new Date(selectedForecast.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', weekday: 'short' }) 
                            : new Date(activeDate).toLocaleDateString(undefined, { weekday: 'long' })
                        }
                    </span>
                )}
            </div>
        </div>
    );
};

export default CityHeader;