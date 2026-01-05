import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, FreeMode } from 'swiper/modules';
import { Clock } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/pagination';

interface HourlyForecastProps {
    data: any[];
    selectedForecast: any;
    onHourSelect: (hour: any) => void;
    activeDate: string;
    isToday: boolean;
}

const HourlyForecast: React.FC<HourlyForecastProps> = ({ data, selectedForecast, onHourSelect, activeDate, isToday }) => {
    return (
        <div className="md:col-span-2 bg-black/20 backdrop-blur-2xl rounded-[32px] p-6 border border-white/10 flex flex-col min-w-0 justify-center relative shadow-xl">
            
            {/* Removed <style> block here because it's now in App.css */}

            <div className="flex items-center gap-2 px-2 mb-2 opacity-50">
                <Clock size={14} />
                <h2 className="text-xs font-bold tracking-wider uppercase">
                    {isToday ? "Hourly Forecast (Next 24h)" : `Hourly Forecast (${new Date(activeDate).toLocaleDateString(undefined, { weekday: 'short' })})`}
                </h2>
            </div>
            
            {data.length > 0 ? (
                <Swiper
                    modules={[FreeMode, Pagination]}
                    freeMode={true}
                    pagination={{ clickable: true, dynamicBullets: false }}
                    spaceBetween={12}
                    slidesPerView={4}
                    className="w-full py-2 pb-8" 
                    breakpoints={{
                        320: { slidesPerView: 3 },
                        640: { slidesPerView: 5 },
                        1024: { slidesPerView: 6 }
                    }}
                >
                    {data.map((hour, idx) => {
                        const isSelected = selectedForecast?.dt === hour.dt;
                        return (
                            <SwiperSlide key={idx} className="flex flex-col items-center justify-center h-auto">
                                <div 
                                    onClick={() => onHourSelect(hour)}
                                    className={`
                                        flex flex-col items-center p-3 ml-3 rounded-2xl border transition-all duration-300 cursor-pointer w-full
                                        ${isSelected 
                                            ? "bg-blue-500/20 border-blue-400/50 shadow-[0_0_8px_rgba(96,165,250,0.3)] scale-105" 
                                            : "bg-white/5 border-white/5 hover:bg-white/10"
                                        }
                                    `}
                                >
                                    <span className="text-[10px] opacity-60 font-medium whitespace-nowrap mb-1">
                                        {new Date(hour.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                    <img src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}.png`} alt="icon" className="w-10 h-10 mb-1" />
                                    <span className="text-lg font-bold">{Math.round(hour.main.temp)}°</span>
                                </div>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            ) : (
                <div className="flex items-center justify-center h-full text-sm opacity-50">
                    No hourly data available
                </div>
            )}
        </div>
    );
};

export default HourlyForecast;