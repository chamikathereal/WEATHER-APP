const SkeletonCard = () => (
    <div className="aspect-[4/5] w-full max-w-[280px] bg-white/5 border border-white/5 rounded-[32px] p-5 flex flex-col animate-pulse">
        <div className="h-6 w-24 bg-white/10 rounded mb-2"></div>
        <div className="h-4 w-12 bg-white/10 rounded mb-8"></div>
        <div className="h-16 w-32 bg-white/10 rounded mb-4"></div>
        <div className="mt-auto h-24 w-full bg-white/5 rounded-2xl"></div>
    </div>
);

export default SkeletonCard;