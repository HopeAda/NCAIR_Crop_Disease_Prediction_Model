import { useContext } from "react";
import DataContext from "../context/DataContext";

type FallbackProviderProps = {
	message: string;
	mode: string;
};

const Fallback = ({ message, mode }: FallbackProviderProps) => {
	const ctx = useContext(DataContext);
	let text;
	if (mode == "default") {
		if (ctx?.language == "English") {
			text = message;
		} else {
			text =
				"Labari mai dadi — wannan amfanin gona yana da kyau sosai! Ba ya bukatar wani magani.";
		}
	} else if (mode == "unconfident") {
		if (ctx?.language == "English") {
			text = message;
		} else {
			text =
				"Ba mu da cikakken tabbaci game da wannan sakamakon. Da fatan za a sake gwada duba shi ta hanyar amfani da hoto mai kyau da kuma bayyananniya.";
		}
	} else {
		if (ctx?.language == "English") {
			text = message;
		} else {
			text = "Babu sakamako. Da fatan za a sake gwadawa.";
		}
	}
	return (
		<div className="grow w-full h-30 flex justify-center items-center shrink-0 md:w-fit">
			<div className=" h-fit flex flex-col gap-.5  p-3 px-4 rounded-lg border-2 border-[#A8D0C5] bg-[#F7FAF9] w-full md:w-fit">
				<span className="text-[#0F6E56] text-md font-bold">{text}</span>
			</div>
		</div>
	);
};

export default Fallback;
