// import { useContext } from "react";
// import DataContext from "../context/DataContext";

// type FallbackProviderProps = {
// 	message: string;
// 	mode: string;
// };

// const Fallback = ({ message, mode }: FallbackProviderProps) => {
// 	const ctx = useContext(DataContext);
// 	let text;
// 	if (mode == "default") {
// 		if (ctx?.language == "English") {
// 			text = message;
// 		} else {
// 			text =
// 				"Labari mai dadi — wannan amfanin gona yana da kyau sosai! Ba ya bukatar wani magani.";
// 		}
// 	} else if (mode == "unconfident") {
// 		if (ctx?.language == "English") {
// 			text = message;
// 		} else {
// 			text =
// 				"Ba mu da cikakken tabbaci game da wannan sakamakon. Da fatan za a sake gwada duba shi ta hanyar amfani da hoto mai kyau da kuma bayyananniya.";
// 		}
// 	} else {
// 		if (ctx?.language == "English") {
// 			text = message;
// 		} else {
// 			text = "Babu sakamako. Da fatan za a sake gwadawa.";
// 		}
// 	}
// 	return (
// 		<div className="w-full h-30 flex justify-center items-center md:w-fit mt-10 md:mt-0">
// 			<div className=" h-fit flex flex-col gap-.5  p-3 px-4 rounded-lg border-2 border-[#A8D0C5] bg-[#F7FAF9] w-full md:w-fit">
// 				<span className="text-[#0F6E56] text-md font-bold">{text}</span>
// 			</div>
// 		</div>
// 	);
// };

// export default Fallback;

import { useContext } from "react";
import DataContext from "../context/DataContext";

type FallbackMode = "healthy" | "unconfident" | "unrecognized";

type FallbackProviderProps = {
	message: string;
	mode: FallbackMode;
};

const HAUSA_TEXT: Record<FallbackMode, string> = {
	healthy:
		"Labari mai daɗi — wannan amfanin gonarku yana da lafiya sosai! Ba ya buƙatar wani magani.",
	unconfident:
		"Ba mu da cikakken tabbaci game da wannan sakamakon. Da fatan za a sake ɗaukar hoto mai bayyana sosai kuma a sake gwadawa.",
	unrecognized:
		"Ba a gane wata cuta a cikin wannan hoton ba. Da fatan za a tabbatar hoton ya nuna ganyen shukar a fili, yana da kyakkyawan haske, kuma ya cika yawancin firam ɗin, sannan a sake gwadawa.",
};

const Fallback = ({ message, mode }: FallbackProviderProps) => {
	const ctx = useContext(DataContext);
	const text = ctx?.language === "Hausa" ? HAUSA_TEXT[mode] : message;

	return (
		<div className="w-full h-30 flex justify-center items-center md:w-fit mt-10 md:mt-0">
			<div className="h-fit flex flex-col gap-.5 p-3 px-4 rounded-lg border-2 border-[#A8D0C5] bg-[#F7FAF9] w-full md:w-fit">
				<span className="text-[#0F6E56] text-md font-bold">{text}</span>
			</div>
		</div>
	);
};

export default Fallback;
