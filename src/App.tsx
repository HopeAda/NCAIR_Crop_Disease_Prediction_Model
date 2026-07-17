import { Route, Routes } from "react-router-dom";
import CameraScreen from "./pages/CameraScreen";
import LoadingScreen from "./pages/LoadingScreen";
import ResultScreen from "./pages/ResultScreen";
import HomeScreen from "./pages/HomeScreen";

const App = () => {
	return (
		<Routes>
			<Route element={<HomeScreen />} path="/" />
			<Route element={<CameraScreen />} path="/capture" />
			<Route element={<LoadingScreen />} path="/loading" />
			<Route element={<ResultScreen />} path="/result" />
		</Routes>
	);
};

export default App;
