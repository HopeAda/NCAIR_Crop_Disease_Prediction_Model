type BadgeProviderProps = {
	status: "healthy" | "diseased";
};

const Badge = ({ status }: BadgeProviderProps) => {
	return (
		<article
			className={` px-2 pr-3 rounded-4xl flex gap-1.5 items-center ${status === "healthy" ? "bg-[#A8D0C5] text-[#0F6E56]" : "bg-[#FFCCCB] text-[#FF7f7f]"}`}
		>
			<div
				className={`w-2 h-2 rounded-full my-2.5 ${status === "healthy" ? "bg-[#0F6E56]" : "bg-[#FF7F7F]"}`}
			></div>
			<span className="text-md font-medium capitalize">{status}</span>
		</article>
	);
};

export default Badge;
