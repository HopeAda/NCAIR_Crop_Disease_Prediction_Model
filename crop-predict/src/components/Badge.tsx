import { useContext } from "react";
import DataContext from "../context/DataContext";

type BadgeProviderProps = {
	status: "healthy" | "diseased";
};

const Badge = ({ status }: BadgeProviderProps) => {
	const ctx = useContext(DataContext);
	let statusByLang;
	if (status == "diseased") {
		if (ctx?.language == "English") {
			statusByLang = status;
		} else {
			statusByLang = "mai cuta";
		}
	} else if (status == "healthy") {
		if (ctx?.language == "English") {
			statusByLang = status;
		} else {
			statusByLang = "mai lafiya";
		}
	}

	return (
		<article
			className={` px-2 pr-3 rounded-4xl flex gap-1.5 items-center ${status === "healthy" ? "bg-[#A8D0C5] text-[#0F6E56]" : "bg-[#FFCCCB] text-[#FF7f7f]"}`}
		>
			<div
				className={`w-2 h-2 rounded-full my-2.5 ${status === "healthy" ? "bg-[#0F6E56]" : "bg-[#FF7F7F]"}`}
			></div>
			<span className="text-md font-medium capitalize">
				{statusByLang}
			</span>
		</article>
	);
};

export default Badge;
