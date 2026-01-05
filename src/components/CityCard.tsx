import React, { memo } from 'react';
import { WeatherData } from '../extra/Api';
import { Thermometer, Droplets, Waves, Wind } from 'lucide-react';
import StatItem from './StatItem';
import { getWeatherGradient } from '../extra/weatherUtils';

interface CityCardProps {
    city: WeatherData;
    onClick: () => void;
    bgClass?: string;
    index?: number; 
}

const CityCard: React.FC<CityCardProps> = ({ city, onClick, bgClass, index = 0 }) => {
    
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
            {/* Glossy Shine Effect on Hover */}
            <div className="absolute inset-0 transition-opacity duration-700 opacity-0 pointer-events-none group-hover:opacity-100">
                <div className="absolute top-0 left-0 w-[150%] h-[100%] bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shine skew-x-12" />
            </div>

            {/* 1. Header */}
            <div className="z-10 flex items-start justify-between mb-4">
                <div>
                    <h2 className="text-xl font-bold leading-tight tracking-wide drop-shadow-sm">{city.name}</h2>
                    <span className="text-sm font-medium tracking-widest uppercase opacity-70">{city.sys.country}</span>
                </div>
                <div className="flex items-center justify-center w-12 h-12 transition-transform duration-300 border rounded-full shadow-inner bg-white/10 backdrop-blur-md border-white/10 group-hover:scale-110">
                    <img 
                        src={`https://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`} 
                        alt={city.weather[0].description} 
                        className="w-10 h-10 drop-shadow-md"
                        loading="lazy"
                    />
                </div>
            </div>

            {/* 2. Hero Temperature */}
            <div className="z-10 flex flex-col items-start mb-6">
                <span className="text-6xl font-bold tracking-tighter text-transparent drop-shadow-xl bg-gradient-to-b from-white to-white/70 bg-clip-text">
                    {Math.round(city.main.temp)}°
                </span>
                <span className="flex items-center gap-2 pl-1 text-sm font-semibold capitalize opacity-90">
                    {city.weather[0].description}
                </span>
            </div>

            {/* 3. Stats Grid */}
            <div className="z-10 grid grid-cols-2 gap-3 p-3 mt-auto transition-colors border bg-black/10 rounded-2xl border-white/5 group-hover:bg-black/20 backdrop-blur-sm">
                <StatItem icon={<Thermometer size={14} />} label="Feels" value={`${Math.round(city.main.feels_like)}°`} />
                <StatItem icon={<Wind size={14} />} label="Wind" value={`${city.wind.speed} m/s`} />
                <StatItem icon={<Droplets size={14} />} label="Humidity" value={`${city.main.humidity}%`} />
                <StatItem icon={<Waves size={14} />} label="Pressure" value={city.main.pressure} />
            </div>
        </div>
    );
};

// Optimization: Memoize component to prevent unnecessary re-renders
export default memo(CityCard);