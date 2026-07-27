// import Button from "../components/Button";
// import RecommendedStep from "../components/RecommendedStep";
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// // import PRED_RESULT from "../mock/mock";
// import Badge from "../components/Badge";
// import { useContext } from "react";
// import DataContext from "../context/DataContext";
// import type { LanguageResult, LanguageType } from "../types/types";
// import Fallback from "../components/Fallback";

// // const ResultScreen = () => {
// // 	const navigate = useNavigate();
// // 	const ctx = useContext(DataContext);
// // 	const PRED_RESULT = ctx?.result;
// // 	console.log(PRED_RESULT);
// // 	if (!PRED_RESULT) {
// // 		return null;
// // 	}
// // 	const RESULT: { English: LanguageResult; Hausa: LanguageResult } =
// // 		PRED_RESULT.RESULT;

// // 	// if (!RESULT) {
// // 	// 	return null;
// // 	// }

// // 	// Safely access the nested language property
// // 	const currentLang: LanguageType = (ctx?.language ||
// // 		"English") as keyof typeof RESULT;
// // 	const languageResult: LanguageResult =
// // 		RESULT[currentLang] || RESULT["English"];

// // 	// Safely access the base64 image
// // 	const annotatedBase64 = PRED_RESULT?.annotated_image;

// // 	return (
// // 		<div className="w-full md:min-h-[calc(100vh-2rem)] flex flex-col p-6 items-center gap-4 grow  overflow-y-auto shrink-0">
// // 			{PRED_RESULT?.recognized ? (
// // 				<>
// // 					<div className="flex flex-col  gap-4 w-full">
// // 						<div className="image rounded-lg overflow-hidden aspect-4/3 w-full md:aspect-3/1 ">
// // 							<img
// // 								src={`data:image/png;base64,${annotatedBase64}`}
// // 								alt=""
// // 								className="w-full h-full md:object-cover"
// // 							/>
// // 						</div>
// // 						<div className="w-full flex justify-between items-center gap-4 ">
// // 							<Badge status={PRED_RESULT.status} />
// // 							<article>
// // 								Confidence:{" "}
// // 								<span className="font-extrabold">
// // 									{(PRED_RESULT.confidence * 100).toFixed(2)}%
// // 								</span>
// // 							</article>
// // 						</div>
// // 					</div>

// // 					<div className="flex flex-col gap-.5  p-3 px-4 rounded-lg border-2 border-[#A8D0C5] bg-[#F7FAF9] w-full">
// // 						<span className="uppercase text-sm font-semibold text-[#A8D0C5] text-[.8rem]">
// // 							{PRED_RESULT.crop}
// // 						</span>
// // 						<span className="text-3xl font-bold">
// // 							{PRED_RESULT.disease}
// // 						</span>
// // 						<p className="pt-2 text-[#76a599] text-[1rem] ">
// // 							{languageResult.description}
// // 						</p>
// // 					</div>

// // 					<div className=" cause flex flex-col gap-.5  p-3 px-4 rounded-lg border-2 border-[#A8D0C5] bg-[#F7FAF9] w-full">
// // 						<span className="uppercase text-[#0F6E56] text-md font-bold">
// // 							The Cause
// // 						</span>
// // 						<p className="pt-2 text-[#76a599] text-[1rem]">
// // 							{languageResult.cause}
// // 						</p>
// // 					</div>

// // 					<div className="recommended flex flex-col rounded-2xl overflow-hidden w-full">
// // 						<div className="w-full bg-[#0F6E56] text-white p-4">
// // 							<h3 className="text-md font-bold uppercase">
// // 								Recommended Steps
// // 							</h3>
// // 						</div>
// // 						<div className="flex flex-col border border-[#A8D0C5] rounded-b-2xl ">
// // 							{languageResult.steps.map((step, idx) => (
// // 								<RecommendedStep
// // 									step={step}
// // 									id={idx + 1}
// // 									key={idx}
// // 								/>
// // 							))}
// // 						</div>
// // 					</div>

// // 					<div className="prevent flex flex-col rounded-2xl overflow-hidden w-full">
// // 						<div className="w-full bg-[#0F6E56] text-white p-4">
// // 							<h3 className="text-md font-bold uppercase">
// // 								HOW TO PREVENT
// // 							</h3>
// // 						</div>
// // 						<div className="flex flex-col border border-[#A8D0C5] rounded-b-2xl ">
// // 							{languageResult.prevention.map((step, idx) => (
// // 								<RecommendedStep
// // 									step={step}
// // 									id={idx + 1}
// // 									key={idx}
// // 								/>
// // 							))}
// // 						</div>
// // 					</div>
// // 				</>
// // 			) : (
// // 				<Fallback
// // 					message={PRED_RESULT?.message || "No result"}
// // 					mode={PRED_RESULT?.status == "diseased" ? "default" : ""}
// // 				/>
// // 			)}

// // 			<Button
// // 				text={
// // 					ctx?.language === "Hausa"
// // 						? "Duba wani amfanin gona"
// // 						: "Scan another Crop"
// // 				}
// // 				clickFunction={() => {
// // 					ctx?.setIsLoading(true);
// // 					ctx?.setImageLoaded(false);
// // 					ctx?.setImgUrl("");
// // 					ctx?.setResult(null);
// // 					ctx?.setIsLoading(false);
// // 					navigate("/");
// // 				}}
// // 				type="main"
// // 			/>
// // 		</div>
// // 	);
// // };

// // export default ResultScreen;

// const ResultScreen = () => {
// 	const navigate = useNavigate();
// 	const ctx = useContext(DataContext);
// 	const PRED_RESULT = ctx?.result;
// 	console.log(PRED_RESULT);

// 	useEffect(() => {
// 		if (!PRED_RESULT) {
// 			navigate("/", { replace: true });
// 		}
// 	}, [PRED_RESULT, navigate]);

// 	if (!PRED_RESULT) {
// 		return null;
// 	}

// 	const currentLang: LanguageType = (ctx?.language ||
// 		"English") as LanguageType;
// 	const annotatedBase64 = PRED_RESULT?.annotated_image;

// 	// A recognized-but-healthy detection has no RESULT to show
// 	const hasRecommendation =
// 		PRED_RESULT?.recognized && PRED_RESULT?.RESULT != null;

// 	const languageResult: LanguageResult | null = hasRecommendation
// 		? PRED_RESULT.RESULT![currentLang] || PRED_RESULT.RESULT!["English"]
// 		: null;

// 	return (
// 		<div className="w-full md:min-h-[calc(100vh-2rem)] flex flex-col p-6 items-center gap-4 grow overflow-y-auto shrink-0">
// 			{hasRecommendation && languageResult ? (
// 				<>
// 					<div className="flex flex-col gap-4 w-full">
// 						<div className="image rounded-lg overflow-hidden aspect-4/3 w-full md:aspect-3/1">
// 							<img
// 								src={`data:image/png;base64,${annotatedBase64}`}
// 								alt=""
// 								className="w-full h-full md:object-cover"
// 							/>
// 						</div>
// 						<div className="w-full flex justify-between items-center gap-4">
// 							<Badge status={PRED_RESULT.status} />
// 							<article>
// 								Confidence:{" "}
// 								<span className="font-extrabold">
// 									{(PRED_RESULT.confidence * 100).toFixed(2)}%
// 								</span>
// 							</article>
// 						</div>
// 					</div>

// 					<div className="flex flex-col gap-.5 p-3 px-4 rounded-lg border-2 border-[#A8D0C5] bg-[#F7FAF9] w-full">
// 						<span className="uppercase text-sm font-semibold text-[#A8D0C5] text-[.8rem]">
// 							{PRED_RESULT.crop}
// 						</span>
// 						<span className="text-3xl font-bold">
// 							{PRED_RESULT.disease}
// 						</span>
// 						<p className="pt-2 text-[#76a599] text-[1rem]">
// 							{languageResult.description}
// 						</p>
// 					</div>

// 					<div className="cause flex flex-col gap-.5 p-3 px-4 rounded-lg border-2 border-[#A8D0C5] bg-[#F7FAF9] w-full">
// 						<span className="uppercase text-[#0F6E56] text-md font-bold">
// 							{ctx?.language == "English"
// 								? "The Cause"
// 								: "Dalilin"}
// 						</span>
// 						<p className="pt-2 text-[#76a599] text-[1rem]">
// 							{languageResult.cause}
// 						</p>
// 					</div>

// 					<div className="recommended flex flex-col rounded-2xl overflow-hidden w-full">
// 						<div className="w-full bg-[#0F6E56] text-white p-4">
// 							<h3 className="text-md font-bold uppercase">
// 								Recommended Steps
// 							</h3>
// 						</div>
// 						<div className="flex flex-col border border-[#A8D0C5] rounded-b-2xl">
// 							{languageResult.steps.map((step, idx) => (
// 								<RecommendedStep
// 									step={step}
// 									id={idx + 1}
// 									key={idx}
// 								/>
// 							))}
// 						</div>
// 					</div>

// 					<div className="prevent flex flex-col rounded-2xl overflow-hidden w-full">
// 						<div className="w-full bg-[#0F6E56] text-white p-4">
// 							<h3 className="text-md font-bold uppercase">
// 								HOW TO PREVENT
// 							</h3>
// 						</div>
// 						<div className="flex flex-col border border-[#A8D0C5] rounded-b-2xl">
// 							{languageResult.prevention.map((step, idx) => (
// 								<RecommendedStep
// 									step={step}
// 									id={idx + 1}
// 									key={idx}
// 								/>
// 							))}
// 						</div>
// 					</div>
// 				</>
// 			) : (
// 				<Fallback
// 					message={
// 						PRED_RESULT?.recognized
// 							? "Great news — this crop looks healthy! No treatment needed."
// 							: "No result. Please try again"
// 					}
// 					mode={PRED_RESULT?.status === "diseased" ? "default" : ""}
// 				/>
// 			)}

// 			<Button
// 				text={
// 					ctx?.language === "Hausa"
// 						? "Duba wani amfanin gona"
// 						: "Scan another Crop"
// 				}
// 				clickFunction={() => {
// 					ctx?.setIsLoading(true);
// 					ctx?.setImageLoaded(false);
// 					ctx?.setImgUrl("");
// 					ctx?.setResult(null);
// 					ctx?.setIsLoading(false);
// 					navigate("/");
// 				}}
// 				type="main"
// 			/>
// 		</div>
// 	);
// };

// export default ResultScreen;

import Button from "../components/Button";
import RecommendedStep from "../components/RecommendedStep";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Badge from "../components/Badge";
import { useContext } from "react";
import DataContext from "../context/DataContext";
import type { LanguageResult, LanguageType } from "../types/types";
import Fallback from "../components/Fallback";

const ResultScreen = () => {
	const navigate = useNavigate();
	const ctx = useContext(DataContext);
	const PRED_RESULT = ctx?.result;
	console.log(PRED_RESULT);

	useEffect(() => {
		if (!PRED_RESULT) {
			navigate("/", { replace: true });
		}
	}, [PRED_RESULT, navigate]);

	if (!PRED_RESULT) {
		return null;
	}

	const currentLang: LanguageType = (ctx?.language ||
		"English") as LanguageType;
	const annotatedBase64 = PRED_RESULT?.annotated_image;

	// A recognized-but-healthy detection has no RESULT to show
	const hasRecommendation =
		PRED_RESULT?.recognized && PRED_RESULT?.RESULT != null;

	const languageResult: LanguageResult | null = hasRecommendation
		? PRED_RESULT.RESULT![currentLang] || PRED_RESULT.RESULT!["English"]
		: null;

	return (
		<div className="w-full md:min-h-[calc(100vh-2rem)] flex flex-col p-6 items-center gap-4 grow overflow-y-auto shrink-0">
			{PRED_RESULT?.recognized && (
				<div className="flex flex-col gap-4 w-full">
					<div className="image rounded-lg overflow-hidden aspect-4/3 w-full md:aspect-3/1">
						<img
							src={`data:image/png;base64,${annotatedBase64}`}
							alt=""
							className="w-full h-full md:object-cover"
						/>
					</div>
					<div className="w-full flex justify-between items-center gap-4">
						<Badge status={PRED_RESULT.status} />
						<article>
							Confidence:{" "}
							<span className="font-extrabold">
								{(PRED_RESULT.confidence * 100).toFixed(2)}%
							</span>
						</article>
					</div>
				</div>
			)}

			{hasRecommendation && languageResult ? (
				<>
					<div className="flex flex-col gap-.5 p-3 px-4 rounded-lg border-2 border-[#A8D0C5] bg-[#F7FAF9] w-full">
						<span className="uppercase text-sm font-semibold text-[#A8D0C5] text-[.8rem]">
							{PRED_RESULT.crop}
						</span>
						<span className="text-3xl font-bold">
							{PRED_RESULT.disease}
						</span>
						<p className="pt-2 text-[#76a599] text-[1rem]">
							{languageResult.description}
						</p>
					</div>

					<div className="cause flex flex-col gap-.5 p-3 px-4 rounded-lg border-2 border-[#A8D0C5] bg-[#F7FAF9] w-full">
						<span className="uppercase text-[#0F6E56] text-md font-bold">
							{ctx?.language == "English"
								? "The Cause"
								: "Dalilin"}
						</span>
						<p className="pt-2 text-[#76a599] text-[1rem]">
							{languageResult.cause}
						</p>
					</div>

					<div className="recommended flex flex-col rounded-2xl overflow-hidden w-full">
						<div className="w-full bg-[#0F6E56] text-white p-4">
							<h3 className="text-md font-bold uppercase">
								Recommended Steps
							</h3>
						</div>
						<div className="flex flex-col border border-[#A8D0C5] rounded-b-2xl">
							{languageResult.steps.map((step, idx) => (
								<RecommendedStep
									step={step}
									id={idx + 1}
									key={idx}
								/>
							))}
						</div>
					</div>

					<div className="prevent flex flex-col rounded-2xl overflow-hidden w-full">
						<div className="w-full bg-[#0F6E56] text-white p-4">
							<h3 className="text-md font-bold uppercase">
								HOW TO PREVENT
							</h3>
						</div>
						<div className="flex flex-col border border-[#A8D0C5] rounded-b-2xl">
							{languageResult.prevention.map((step, idx) => (
								<RecommendedStep
									step={step}
									id={idx + 1}
									key={idx}
								/>
							))}
						</div>
					</div>
				</>
			) : (
				<Fallback
					message={
						PRED_RESULT?.recognized
							? "Great news — this crop looks healthy! No treatment needed."
							: "No result. Please try again"
					}
					mode={PRED_RESULT?.status === "diseased" ? "default" : ""}
				/>
			)}

			<Button
				text={
					ctx?.language === "Hausa"
						? "Duba wani amfanin gona"
						: "Scan another Crop"
				}
				clickFunction={() => {
					ctx?.setIsLoading(true);
					ctx?.setImageLoaded(false);
					ctx?.setImgUrl("");
					ctx?.setResult(null);
					ctx?.setIsLoading(false);
					navigate("/");
				}}
				type="main"
			/>
		</div>
	);
};

export default ResultScreen;
