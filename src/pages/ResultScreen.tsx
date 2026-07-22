import Button from "../components/Button";
import RecommendedStep from "../components/RecommendedStep";
import { useNavigate } from "react-router-dom";
import RESULT from "../mock/mock";
import Badge from "../components/Badge";
import { useContext } from "react";
import DataContext from "../context/DataContext";

const ResultScreen = () => {
	const navigate = useNavigate();
	const ctx = useContext(DataContext);

	return (
		<div className="w-full flex flex-col p-6 items-center gap-4">
			<div className="image rounded-lg overflow-hidden aspect-4/3 w-full">
				<img
					src={ctx?.imgUrl}
					alt=""
					className="w-full h-full object-cover"
				/>
			</div>
			<div className="w-full flex justify-between items-center ">
				<Badge status={RESULT.status} />
				<article>
					Confidence:{" "}
					<span className="font-extrabold">{RESULT.confidence}%</span>
				</article>
			</div>
			<div className="flex flex-col gap-.5  p-3 px-4 rounded-lg border-2 border-[#A8D0C5] bg-[#F7FAF9]">
				<span className="uppercase text-sm font-semibold text-[#A8D0C5] text-[.8rem]">
					{RESULT.crop}
				</span>
				<span className="text-3xl font-bold">{RESULT.disease}</span>
				<p className="pt-2 text-[#76a599] text-[1rem] ">
					{RESULT.description}
				</p>
			</div>
			<div className="recommended flex flex-col rounded-2xl overflow-hidden ">
				<div className="w-full bg-[#0F6E56] text-white p-4">
					<h3 className="text-md font-bold uppercase">
						Recommended Steps
					</h3>
				</div>
				<div className="flex flex-col border border-[#A8D0C5] rounded-b-2xl ">
					{RESULT.steps.map((step, idx) => (
						<RecommendedStep step={step} id={idx + 1} key={idx} />
					))}
				</div>
			</div>
			<Button
				text="Scan Another Crop"
				clickFunction={() => {
					navigate("/");
				}}
				type="main"
			/>
		</div>
	);
};

export default ResultScreen;
