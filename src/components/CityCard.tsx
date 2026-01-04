import React from 'react';
import { weatherData } from '../extra/Api';
import { 
    Thermometer, 
    Droplets, 
    Waves, 
    Wind, 
} from 'lucide-react';

interface CityCardProps {
    city: weatherData;
    onClick: () => void;
    bgClass?: string;
}

const CityCard: React.FC<CityCardProps> = ({ city, onClick, bgClass }) => {
    // If bgClass is empty/null, apply the glassmorphism effect
    const finalStyle = bgClass 
        ? bgClass 
        : "bg-white/10 backdrop-blur-md border border-white/20";

    return (
        <ul 
            onClick={onClick} 
            className={`${finalStyle} cursor-pointer p-6 rounded-[30px] shadow-city-card hover:shadow-city-card-hover transition-all list-none text-left flex flex-col aspect-square w-full max-w-[280px] mx-auto hover:scale-105 duration-300`}
        >
            {/* ... rest of your existing code remains exactly same ... */}
            <li className="font-bold text-2xl tracking-tight mb-2">{city.name}, {city.sys.country}</li>
            
            <div className="flex flex-col gap-3">
                <li className="flex items-center gap-3 text-sm font-semibold opacity-90">
                    <Thermometer size={18} className="text-orange-300" />
                    <span>Feels: {Math.round(city.main.feels_like)}°C</span>
                </li>
                <li className="flex items-center gap-3 text-sm font-semibold opacity-90">
                    <Droplets size={18} className="text-blue-300" />
                    <span>Hum: {city.main.humidity}%</span>
                </li>
                <li className="flex items-center gap-3 text-sm font-semibold opacity-90">
                    <Wind size={18} className="text-gray-300" />
                    <span>Wind: {city.wind.speed} m/s</span>
                </li>
                <li className="flex items-center gap-3 text-sm font-semibold opacity-90">
                    <Waves size={18} className="text-cyan-300" />
                    <span>Sea: {city.main.sea_level || city.main.pressure || 'N/A'}</span>
                </li>
            </div>

            <div className="mt-auto pt-4 border-t border-white/10 flex items-end justify-between">
                <div className="flex flex-col">
                    <span className="text-4xl font-bold leading-none">{Math.round(city.main.temp)}°C</span>
                    <span className="capitalize text-xs font-medium opacity-80 mt-1">{city.weather[0].description}</span>
                </div>
                <img 
                    src={`https://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`} 
                    alt="weather icon" 
                    className="w-16 h-16 -mb-2"
                />
            </div>
        </ul>
    );
};

export default CityCard;