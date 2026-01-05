import React from 'react';

const CitySkeleton: React.FC = () => {
    return (
        <div className="flex flex-col items-center w-full min-h-screen p-4 pt-10 pb-6 animate-pulse bg-black/20 sm:px-10">
            <div className="w-full max-w-[1000px] flex flex-col gap-6 flex-1 mb-10">
                
                {/* 1. Header Skeleton */}
                <div className="flex items-center w-full mb-2">
                    <div className="w-10 h-10 mr-4 rounded-full bg-white/10"></div>
                    <div className="flex flex-col gap-2">
                        <div className="w-48 h-6 rounded bg-white/10"></div>
                        <div className="w-32 h-3 rounded bg-white/10"></div>
                    </div>
                </div>

                {/* 2. Top Grid Skeleton (Main Card + Hourly) */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {/* Main Card Placeholder */}
                    <div className="h-[300px] md:col-span-1 rounded-[32px] bg-white/5 border border-white/5"></div>
                    
                    {/* Hourly Forecast Placeholder */}
                    <div className="h-[300px] md:col-span-2 rounded-[32px] bg-white/5 border border-white/5 flex flex-col justify-center p-6">
                        <div className="w-32 h-4 mb-6 rounded bg-white/10"></div>
                        <div className="flex justify-between gap-2">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="w-full h-32 rounded-2xl bg-white/5"></div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 3. Stats Grid Skeleton */}
                <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="h-20 border rounded-2xl bg-white/5 border-white/5"></div>
                    ))}
                </div>

                {/* 4. Extended Forecast Skeleton */}
                <div className="h-64 w-full rounded-[32px] bg-white/5 border border-white/5 p-6">
                    <div className="w-40 h-4 mb-6 rounded bg-white/10"></div>
                    <div className="flex gap-4">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="flex-1 h-40 rounded-2xl bg-white/5"></div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CitySkeleton;