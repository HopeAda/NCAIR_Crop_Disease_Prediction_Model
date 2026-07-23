import { Route, Routes } from "react-router-dom";
import CameraScreen from "./pages/CameraScreen";
import LoadingScreen from "./pages/LoadingScreen";
import ResultScreen from "./pages/ResultScreen";
// import HomeScreen from "./pages/HomeScreen";
import Header from "./components/Header";

const App = () => {
	return (
		<div className="w-full h-screen flex flex-col items-end md:overflow-hidden bg-[#f9f9f9]">
			<Header />
			<section className="md:w-[calc(100%-10rem)] lg:w-[calc(100%-15rem)] md:h-[calc(100vh-60px)] md:overflow-y-auto">
				<Routes>
					{/* <Route element={<HomeScreen />} path="/" /> */}
					<Route element={<CameraScreen />} path="/" />
					<Route element={<LoadingScreen />} path="/loading" />
					<Route element={<ResultScreen />} path="/result" />
				</Routes>
			</section>
		</div>
	);
};

export default App;
