import { Outlet } from "react-router";
import Footer from "../components/core/Footer";
import NavBar from "../components/core/NavBar";

const BaseLayout = () => {
	return (
		<div className="flex flex-col min-h-screen bg-gray-50">
			{/* Navigation */}
			<NavBar />

			{/* Content */}
			<Outlet />

			{/* Footer */}
			<Footer />
		</div>
	);
};

export default BaseLayout;
