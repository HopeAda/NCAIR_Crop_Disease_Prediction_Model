import { Route, Routes } from "react-router-dom";
import CameraScreen from "./pages/CameraScreen";
import LoadingScreen from "./pages/LoadingScreen";
import ResultScreen from "./pages/ResultScreen";
// import HomeScreen from "./pages/HomeScreen";
import Header from "./components/Header";

const App = () => {
	return (
		<div className="w-full min-h-screen">
			<Header />
			<Routes>
				{/* <Route element={<HomeScreen />} path="/" /> */}
				<Route element={<CameraScreen />} path="/" />
				<Route element={<LoadingScreen />} path="/loading" />
				<Route element={<ResultScreen />} path="/result" />
			</Routes>
		</div>
	);
};

export default App;
