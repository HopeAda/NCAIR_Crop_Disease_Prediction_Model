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
	const [language, setLanguage] = useState("english");

	const uploadImage = (file) => {
		console.log(file[0]);
		if (!["image/jpeg", "image/png", "image/webp"].includes(file[0].type)) {
			alert("Invalid file type");
		}
		setImgUrl(URL.createObjectURL(file[0]));
		setImageLoaded(true);
	};

	useEffect(() => {
		if (isLoading) {
			document.body.classList.add("overflow-hidden");
		} else {
			document.body.classList.remove("overflow-hidden");
		}

		return () => {};
	}, [isLoading]);

	const DiagnoseCrop = () => {
		setIsLoading(true);
		navigate("/result");
		setIsLoading(false);
	};

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
			}}
		>
			{children}
		</DataContext.Provider>
	);
};

export default DataContext;
