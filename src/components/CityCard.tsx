import React from 'react';
import { weatherData } from '../extra/Api';
import { Thermometer, Droplets, Waves, Wind } from 'lucide-react';
import StatItem from './StatItem';
// UPDATED: Import the helper function
import { getWeatherGradient } from '../extra/weatherUtils';

interface CityCardProps {
    city: weatherData;
    onClick: () => void;
    bgClass?: string;
    index?: number; 
}

const CityCard: React.FC<CityCardProps> = ({ city, onClick, bgClass, index = 0 }) => {
    
    // Use the utility function
    const weatherCondition = city.weather[0].main;
    const activeGradient = bgClass || `bg-gradient-to-br ${getWeatherGradient(weatherCondition)}`;

    return (
        <div 
            onClick={onClick} 
            style={{ animationDelay: `${index * 100}ms` }}
            className={`
                ${activeGradient} 
                backdrop-blur-xl relative overflow-hidden group cursor-pointer 
                p-5 rounded-[32px] flex flex-col aspect-[4/5] w-full max-w-[280px] mx-auto
                border shadow-lg transition-all duration-500
                hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1
                animate-fade-in-up fill-mode-backwards
            `}
        >
            {/* ... (Rest of the JSX remains exactly the same) ... */}
            
            {/* --- Glossy Shine Effect on Hover --- */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                <div className="absolute top-0 left-0 w-[150%] h-[100%] bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shine skew-x-12" />
            </div>

            {/* 1. Header */}
            <div className="flex justify-between items-start mb-4 z-10">
                <div>
                    <h2 className="text-xl font-bold leading-tight tracking-wide drop-shadow-sm">{city.name}</h2>
                    <span className="text-sm font-medium opacity-70 uppercase tracking-widest">{city.sys.country}</span>
                </div>
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md shadow-inner border border-white/10 group-hover:scale-110 transition-transform duration-300">
                    <img 
                        src={`https://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`} 
                        alt="icon" 
                        className="w-10 h-10 drop-shadow-md"
                    />
                </div>
            </div>

            {/* 2. Hero Temperature */}
            <div className="flex flex-col items-start mb-6 z-10">
                <span className="text-6xl font-bold tracking-tighter drop-shadow-xl bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent">
                    {Math.round(city.main.temp)}°
                </span>
                <span className="text-sm font-semibold opacity-90 capitalize pl-1 flex items-center gap-2">
                    {city.weather[0].description}
                </span>
            </div>

            {/* 3. Stats Grid */}
            <div className="grid grid-cols-2 gap-3 mt-auto bg-black/10 p-3 rounded-2xl border border-white/5 group-hover:bg-black/20 transition-colors z-10 backdrop-blur-sm">
                <StatItem icon={<Thermometer size={14} />} label="Feels" value={`${Math.round(city.main.feels_like)}°`} />
                <StatItem icon={<Wind size={14} />} label="Wind" value={`${city.wind.speed} m/s`} />
                <StatItem icon={<Droplets size={14} />} label="Humidity" value={`${city.main.humidity}%`} />
                <StatItem icon={<Waves size={14} />} label="Pressure" value={city.main.pressure} />
            </div>
        </div>
    );
};

export default CityCard;