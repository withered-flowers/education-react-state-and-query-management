import axios from "axios";
import { animate, stagger } from "motion";
import { useEffect, useRef, useState } from "react";
import LoadingBar from "../components/LoadingBar";
import TableColors from "../components/TableColors";

const FetchDataPage = () => {
	const [colors, setColors] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const progressBarRef = useRef(null);

	useEffect(() => {
		const fetchColors = async () => {
			try {
				setIsLoading(true);

				// ? [ALT] - Use this if the response from localhost is not working
				// const response = await axios.get("https://reqres.in/api/colors");
				const response = await axios.get("http://localhost:3000/colors");

				// ! ONLY FOR DEV PURPOSE - Sleep 2 seconds
				await new Promise((resolve) => setTimeout(resolve, 2000));

				setColors(response.data.data);
				setIsLoading(false);
			} catch (err) {
				console.log(err);

				setError("Failed to fetch colors");
				setIsLoading(false);
			}
		};

		fetchColors();
	}, []);

	useEffect(() => {
		if (isLoading && progressBarRef.current) {
			// Animate progress bar with continuous motion
			animate(
				progressBarRef.current,
				{
					scaleX: [0, 1.5],
					x: ["-100%", "100%"],
				},
				{
					duration: 1.5,
					repeat: Number.POSITIVE_INFINITY,
					easing: "ease-in-out",
				},
			);
		}
	}, [isLoading]);

	useEffect(() => {
		if (!isLoading && colors.length > 0) {
			// Animate table rows
			animate(
				".color-row",
				{ opacity: [0, 1], y: [20, 0] },
				{ delay: stagger(0.1), duration: 0.5, easing: "ease-in-out" },
			);

			// Animate color cells
			animate(
				".color-cell",
				{ scale: [0.8, 1], rotate: [5, 0] },
				{ delay: stagger(0.05, { start: 0.2 }), duration: 0.6 },
			);
		}
	}, [isLoading, colors]);

	if (isLoading) {
		return (
			<main className="flex-grow flex flex-col items-center justify-center p-6">
				<LoadingBar progressBarRef={progressBarRef} />
			</main>
		);
	}

	if (error) {
		return (
			<main className="flex-grow flex items-center justify-center p-6">
				<div className="text-xl font-semibold text-secondary-600 bg-secondary-100 p-4 rounded-lg shadow">
					{error}
				</div>
			</main>
		);
	}

	return (
		<main className="flex-grow flex flex-col items-center justify-center p-6 text-primary-800">
			<h1 className="text-3xl font-bold mb-8 text-slate-500">
				Colors from BackEnd
			</h1>

			<div className="w-full max-w-3xl overflow-hidden rounded-lg shadow-lg">
				<TableColors colors={colors} />
			</div>
		</main>
	);
};

export default FetchDataPage;
