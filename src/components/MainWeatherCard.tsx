import React, { memo } from 'react';

interface MainWeatherCardProps {
    displayData: any;
    isToday: boolean;
    onReset: () => void;
    gradientClass?: string;
}

const MainWeatherCard: React.FC<MainWeatherCardProps> = ({ displayData, isToday, onReset, gradientClass }) => {
    const bgStyle = gradientClass || "bg-white/10 border-white/20";

    return (
        <div 
            onClick={() => { if (isToday) onReset(); }} 
            className={`
                ${bgStyle}
                md:col-span-1 backdrop-blur-2xl rounded-[32px] p-8 
                border shadow-2xl flex flex-col items-center justify-center 
                cursor-pointer transition-all duration-500 
                relative overflow-hidden group hover:scale-[1.02] hover:shadow-weather-glow
            `}
        >
            <div className="absolute inset-0 transition-opacity duration-700 opacity-0 pointer-events-none group-hover:opacity-100">
                <div className="absolute top-0 left-0 w-[150%] h-[100%] bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shine skew-x-12" />
            </div>

            <div className="z-10 flex flex-col items-center">
                <div className="w-24 h-24 mb-4 drop-shadow-2xl filter brightness-110">
                    <img 
                        src={`https://openweathermap.org/img/wn/${displayData.icon}@4x.png`} 
                        alt={displayData.description} 
                        className="object-contain w-full h-full transition-transform duration-500 transform group-hover:scale-110" 
                        loading="lazy"
                    />
                </div>
                <span className="pr-2 font-bold leading-none tracking-tighter text-transparent text-7xl bg-gradient-to-b from-white to-white/70 bg-clip-text drop-shadow-lg">
                    {Math.round(displayData.temp)}°
                </span>
                <p className="flex items-center gap-2 mt-3 text-lg font-medium tracking-wide capitalize opacity-80">
                    {displayData.description}
                </p>
            </div>
        </div>
    );
};

export default memo(MainWeatherCard);