const StatItem = ({ icon, label, value }: { icon: any, label: string, value: any }) => (
    <div className="flex flex-col gap-0.5">
        <div className="flex items-center gap-1.5 opacity-60">
            {icon}
            <span className="text-[10px] font-bold uppercase tracking-wider">{label}</span>
        </div>
        <span className="text-sm font-bold">{value}</span>
    </div>
);

export default StatItem;