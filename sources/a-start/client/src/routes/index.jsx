import { Route, Routes } from "react-router";
import BaseLayout from "../layouts/BaseLayout";
import AddDataPage from "../pages/AddDataPage";
import CounterPage from "../pages/CounterPage";
import FetchDataPage from "../pages/FetchDataPage";

const MyRoutes = () => {
	return (
		<Routes>
			<Route element={<BaseLayout />}>
				<Route path="/" element={<CounterPage />} />
				<Route path="/data" element={<FetchDataPage />} />
				<Route path="/add-data" element={<AddDataPage />} />
			</Route>
		</Routes>
	);
};

export default MyRoutes;
