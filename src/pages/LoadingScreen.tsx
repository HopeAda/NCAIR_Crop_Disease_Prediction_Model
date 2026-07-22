import LoadingAnimation from "../components/LoadingAnimation";

const LoadingScreen = () => {
	return (
		<div className="w-screen h-screen bg-[#1f1e1e81] flex justify-center items-center fixed top-0 left-0 overflow-hidden">
			<article className="bg-white p-5 rounded-xl flex flex-col gap-4 items-center justify-center border-2 border-[#E8F5F1] ">
				<LoadingAnimation />
				<span className="text-sm font-semibold">
					Analyzing your photo...
				</span>
			</article>
		</div>
	);
};

export default LoadingScreen;
