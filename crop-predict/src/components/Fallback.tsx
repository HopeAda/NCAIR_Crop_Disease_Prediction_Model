import { useContext } from "react";
import DataContext from "../context/DataContext";

type FallbackProviderProps = {
	message: string;
	mode: string;
};

const Fallback = ({ message, mode }: FallbackProviderProps) => {
	const ctx = useContext(DataContext);
	return (
		<div className="grow w-full h-30 flex justify-center items-center shrink-0">
			<div className=" h-fit flex flex-col gap-.5  p-3 px-4 rounded-lg border-2 border-[#A8D0C5] bg-[#F7FAF9] w-full">
				<span className="text-[#0F6E56] text-md font-bold">
					{mode == "default"
						? message
						: ctx?.language == "English"
							? "Congratulations! You have a healthy plant!"
							: "Taya murna! Kana da shuka mai lafiya!"}
				</span>
			</div>
		</div>
	);
};

export default Fallback;
