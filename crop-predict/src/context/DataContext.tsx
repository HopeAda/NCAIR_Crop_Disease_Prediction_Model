import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

type DataContextTypes = {
	isLoading: boolean;
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
	DiagnoseCrop: () => void;
	imageLoaded: boolean;
	setImageLoaded: React.Dispatch<React.SetStateAction<boolean>>;
	imgUrl: string;
	setImgUrl: React.Dispatch<React.SetStateAction<string>>;
	uploadImage: (file: object) => void;
	language: string;
	setLanguage: React.Dispatch<React.SetStateAction<string>>;
	result: object;
	setResult: React.Dispatch<React.SetStateAction<object>>;
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
	const [language, setLanguage] = useState("English");
	const [selectedFile, setSelectedFile] = useState("");
	const [result, setResult] = useState({});

	const uploadImage = (file) => {
		if (!["image/jpeg", "image/png", "image/webp"].includes(file[0].type)) {
			alert("Invalid file type");
			return;
		}
		const imgUrlVal = URL.createObjectURL(file[0]);
		setImgUrl(imgUrlVal);
		setSelectedFile(imgUrlVal);
		setImageLoaded(true);
	};

	async function getPrediction(file) {
		const blobFile = await fetch(file).then((res) => res.blob());

		const formData = new FormData();

		formData.append("file", blobFile, "photo.jpg");

		const res = await fetch(
			"https://stung-pursuit-earthly.ngrok-free.dev/predict",
			{
				method: "POST",
				body: formData,
			},
		);
		return res.json();
	}

	async function getDiagnosis(file) {
		const blobFile = await fetch(file).then((res) => res.blob());

		const formData = new FormData();

		formData.append("file", blobFile, "photo.jpg");

		const res = await fetch(
			"https://stung-pursuit-earthly.ngrok-free.dev/diagnose",
			{
				method: "POST",
				body: formData,
			},
		);
		return res.json();
	}

	async function getRecommendation(
		crop: string,
		disease: string,
		confidence: number,
		status: string,
	) {
		const res = await fetch(
			"https://stung-pursuit-earthly.ngrok-free.dev/recommend",
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ crop, disease, confidence, status }),
			},
		);
		return res.json();
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
		try {
			const diagnosis = await getDiagnosis(selectedFile);
			setResult(diagnosis);
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
			navigate("/result");
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
			}}
		>
			{children}
		</DataContext.Provider>
	);
};

export default DataContext;
