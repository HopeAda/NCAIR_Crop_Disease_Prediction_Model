// import { createContext, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import type { ResultType, LanguageType } from "../types/types";

// type DataContextTypes = {
// 	isLoading: boolean;
// 	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
// 	DiagnoseCrop: () => void;
// 	imageLoaded: boolean;
// 	setImageLoaded: React.Dispatch<React.SetStateAction<boolean>>;
// 	imgUrl: string;
// 	setImgUrl: React.Dispatch<React.SetStateAction<string>>;
// 	uploadImage: (file: FileList | null) => void;
// 	language: LanguageType;
// 	setLanguage: React.Dispatch<React.SetStateAction<LanguageType>>;
// 	result: ResultType | null;
// 	setResult: React.Dispatch<React.SetStateAction<ResultType | null>>;
// };

// type DataContextProviderProps = {
// 	children: React.ReactNode;
// };

// const DataContext = createContext<null | DataContextTypes>(null);

// export const DataContextProvider = ({ children }: DataContextProviderProps) => {
// 	const navigate = useNavigate();
// 	const [isLoading, setIsLoading] = useState(false);
// 	const [imageLoaded, setImageLoaded] = useState<boolean>(false);
// 	const [imgUrl, setImgUrl] = useState("");
// 	const [language, setLanguage] = useState<LanguageType>("English");
// 	const [selectedFile, setSelectedFile] = useState("");
// 	const [result, setResult] = useState<ResultType | null>(null);

// 	const uploadImage = (file: FileList | null) => {
// 		if (file == null) {
// 			return;
// 		}
// 		if (!["image/jpeg", "image/png", "image/webp"].includes(file[0].type)) {
// 			alert("Invalid file type");
// 			return;
// 		}
// 		const imgUrlVal = URL.createObjectURL(file[0]);
// 		setImgUrl(imgUrlVal);
// 		setSelectedFile(imgUrlVal);
// 		setImageLoaded(true);
// 	};

// 	// async function getPrediction(file) {
// 	// 	const blobFile = await fetch(file).then((res) => res.blob());

// 	// 	const formData = new FormData();

// 	// 	formData.append("file", blobFile, "photo.jpg");

// 	// 	const res = await fetch(
// 	// 		"https://stung-pursuit-earthly.ngrok-free.dev/predict",
// 	// 		{
// 	// 			method: "POST",
// 	// 			body: formData,
// 	// 		},
// 	// 	);
// 	// 	return res.json();
// 	// }

// 	async function getDiagnosis(file: string) {
// 		const blobFile = await fetch(file).then((res) => res.blob());

// 		const formData = new FormData();

// 		formData.append("file", blobFile, "photo.jpg");

// 		const res = await fetch(
// 			"https://stung-pursuit-earthly.ngrok-free.dev/diagnose",
// 			{
// 				method: "POST",
// 				body: formData,
// 			},
// 		);
// 		return res.json();
// 	}

// 	// async function getRecommendation(
// 	// 	crop: string,
// 	// 	disease: string,
// 	// 	confidence: number,
// 	// 	status: string,
// 	// ) {
// 	// 	const res = await fetch(
// 	// 		"https://stung-pursuit-earthly.ngrok-free.dev/recommend",
// 	// 		{
// 	// 			method: "POST",
// 	// 			headers: { "Content-Type": "application/json" },
// 	// 			body: JSON.stringify({ crop, disease, confidence, status }),
// 	// 		},
// 	// 	);
// 	// 	return res.json();
// 	// }

// 	useEffect(() => {
// 		if (isLoading) {
// 			document.body.classList.add("overflow-hidden");
// 		} else {
// 			document.body.classList.remove("overflow-hidden");
// 		}

// 		return () => {};
// 	}, [isLoading]);

// 	async function DiagnoseCrop() {
// 		setIsLoading(true);
// 		try {
// 			const diagnosis = await getDiagnosis(selectedFile);
// 			setResult(diagnosis);
// 		} catch (error) {
// 			console.error(error);
// 		} finally {
// 			setIsLoading(false);
// 			navigate("/result");
// 		}
// 	}

// 	return (
// 		<DataContext.Provider
// 			value={{
// 				isLoading,
// 				setIsLoading,
// 				DiagnoseCrop,
// 				imgUrl,
// 				setImgUrl,
// 				imageLoaded,
// 				setImageLoaded,
// 				uploadImage,
// 				setLanguage,
// 				language,
// 				result,
// 				setResult,
// 			}}
// 		>
// 			{children}
// 		</DataContext.Provider>
// 	);
// };

// export default DataContext;

import { createContext, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import type { ResultType, LanguageType } from "../types/types";

const API_BASE = "https://stung-pursuit-earthly.ngrok-free.dev";
const POLL_INTERVAL_MS = 3000;
const MAX_POLL_ATTEMPTS = 300; // ~15 minutes at 3s intervals — pad above your real p99

type DataContextTypes = {
	isLoading: boolean;
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
	DiagnoseCrop: () => void;
	imageLoaded: boolean;
	setImageLoaded: React.Dispatch<React.SetStateAction<boolean>>;
	imgUrl: string;
	setImgUrl: React.Dispatch<React.SetStateAction<string>>;
	uploadImage: (file: FileList | null) => void;
	language: LanguageType;
	setLanguage: React.Dispatch<React.SetStateAction<LanguageType>>;
	result: ResultType | null;
	setResult: React.Dispatch<React.SetStateAction<ResultType | null>>;
	elapsedSeconds: number;
	loadingError: string | null;
};

type DataContextProviderProps = {
	children: React.ReactNode;
};

const DataContext = createContext<null | DataContextTypes>(null);

export const DataContextProvider = ({ children }: DataContextProviderProps) => {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [imageLoaded, setImageLoaded] = useState<boolean>(false);
	const [imgUrl, setImgUrl] = useState("");
	const [language, setLanguage] = useState<LanguageType>("English");
	const [selectedFile, setSelectedFile] = useState("");
	const [result, setResult] = useState<ResultType | null>(null);
	const [elapsedSeconds, setElapsedSeconds] = useState(0);
	const [loadingError, setLoadingError] = useState<string | null>(null);

	const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);

	const uploadImage = (file: FileList | null) => {
		if (file == null) {
			return;
		}
		if (!["image/jpeg", "image/png", "image/webp"].includes(file[0].type)) {
			alert("Invalid file type");
			return;
		}
		const imgUrlVal = URL.createObjectURL(file[0]);
		setImgUrl(imgUrlVal);
		setSelectedFile(imgUrlVal);
		setImageLoaded(true);
	};

	async function startDiagnosisJob(file: string): Promise<string> {
		const blobFile = await fetch(file).then((res) => res.blob());
		const formData = new FormData();
		formData.append("file", blobFile, "photo.jpg");

		const res = await fetch(`${API_BASE}/diagnose/start`, {
			method: "POST",
			body: formData,
			headers: { "ngrok-skip-browser-warning": "true" },
		});
		if (!res.ok) {
			throw new Error(`Failed to start diagnosis: ${res.status}`);
		}
		const { job_id } = await res.json();
		return job_id;
	}

	async function pollDiagnosisJob(jobId: string): Promise<ResultType> {
		for (let attempt = 0; attempt < MAX_POLL_ATTEMPTS; attempt++) {
			const res = await fetch(`${API_BASE}/diagnose/status/${jobId}`, {
				headers: { "ngrok-skip-browser-warning": "true" },
			});
			if (!res.ok) {
				throw new Error(`Status check failed: ${res.status}`);
			}
			const data = await res.json();

			if (data.status === "done") {
				return data.result as ResultType;
			}
			if (data.status === "error") {
				throw new Error(
					data.error || "Diagnosis failed on the server.",
				);
			}
			if (data.status === "not_found") {
				throw new Error("Diagnosis job expired. Please try again.");
			}

			await new Promise((resolve) =>
				setTimeout(resolve, POLL_INTERVAL_MS),
			);
		}
		throw new Error(
			"Diagnosis is taking longer than expected. Please try again.",
		);
	}

	useEffect(() => {
		if (isLoading) {
			document.body.classList.add("overflow-hidden");
		} else {
			document.body.classList.remove("overflow-hidden");
		}

		return () => {};
	}, [isLoading]);

	async function DiagnoseCrop() {
		setIsLoading(true);
		setLoadingError(null);
		setElapsedSeconds(0);

		const startTime = Date.now();
		tickRef.current = setInterval(() => {
			setElapsedSeconds(Math.floor((Date.now() - startTime) / 1000));
		}, 1000);

		try {
			const jobId = await startDiagnosisJob(selectedFile);
			const diagnosis = await pollDiagnosisJob(jobId);
			setResult(diagnosis);
			navigate("/result");
		} catch (error) {
			console.error(error);
			setLoadingError(
				error instanceof Error
					? error.message
					: "Something went wrong. Please try again.",
			);
		} finally {
			if (tickRef.current) {
				clearInterval(tickRef.current);
				tickRef.current = null;
			}
			setIsLoading(false);
		}
	}

	return (
		<DataContext.Provider
			value={{
				isLoading,
				setIsLoading,
				DiagnoseCrop,
				imgUrl,
				setImgUrl,
				imageLoaded,
				setImageLoaded,
				uploadImage,
				setLanguage,
				language,
				result,
				setResult,
				elapsedSeconds,
				loadingError,
			}}
		>
			{children}
		</DataContext.Provider>
	);
};

export default DataContext;
