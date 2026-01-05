// src/extra/weatherUtils.ts

export const getWeatherGradient = (weatherMain: string) => {
    const condition = weatherMain ? weatherMain.toLowerCase() : 'default';

    switch (condition) {
        case 'clear':
            return 'from-orange-500/30 to-amber-500/10 border-orange-200/20 hover:border-orange-200/40';
        case 'clouds':
            return 'from-slate-500/30 to-gray-500/10 border-slate-200/20 hover:border-slate-200/40';
        case 'rain':
        case 'drizzle':
        case 'thunderstorm':
            return 'from-blue-600/30 to-cyan-600/10 border-blue-200/20 hover:border-blue-200/40';
        case 'snow':
            return 'from-indigo-300/30 to-blue-200/10 border-indigo-100/30 hover:border-indigo-100/50';
        case 'mist':
        case 'smoke':
        case 'haze':
        case 'fog':
            return 'from-teal-900/40 to-emerald-900/20 border-teal-200/20 hover:border-teal-200/40';
        default:
            return 'from-white/10 to-white/5 border-white/10 hover:border-white/20';
    }
};