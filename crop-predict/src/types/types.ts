export type ResultType = {
	confidence: number;
	annotated_image: string;
	crop: string;
	detections_count: number;
	recognized: boolean;
	status: "diseased" | "healthy";
	disease: string;
	RESULT?: {
		English: LanguageResult;
		Hausa: LanguageResult;
	};
	message?: string;
};

export type LanguageResult = {
	cause: string;
	description: string;
	more_about: string;
	pathogen: string;
	prevention: [string];
	status: string;
	steps: [string];
};

export type LanguageType = "English" | "Hausa";
