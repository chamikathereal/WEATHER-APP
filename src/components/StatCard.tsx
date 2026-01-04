const StatCard = ({ icon, label, value, color }: { icon: any, label: string, value: string, color: string }) => (
    <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10 flex items-center gap-3 h-full w-full">
        <div className={`${color} bg-white/5 p-2 rounded-lg shrink-0`}>{icon}</div>
        <div className="flex flex-col min-w-0">
            <span className="text-[10px] uppercase font-bold opacity-50 leading-none mb-1 truncate">{label}</span>
            <span className="text-sm font-bold leading-none whitespace-nowrap">{value}</span>
        </div>
    </div>
);

export default StatCard;