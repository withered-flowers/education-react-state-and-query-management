// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import { useState } from "react";

const CounterPage = () => {
	const [count, setCount] = useState(0);

	const increase = () => {
		setCount(count + 1);
	};

	const decrease = () => {
		setCount(count - 1);
	};

	const reset = () => {
		setCount(0);
	};

	return (
		<>
			{/* Main Content */}
			<main className="flex-grow flex items-center justify-center p-6">
				<motion.div
					className="text-center bg-secondary-100 p-8 rounded-xl shadow-lg max-w-md w-full"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
				>
					<motion.div
						initial={{ scale: 0.9 }}
						animate={{ scale: 1 }}
						transition={{
							type: "spring",
							stiffness: 260,
							damping: 20,
						}}
					>
						<h2 className="text-2xl font-medium text-secondary-400 mb-2">
							Counter
						</h2>
						<motion.div
							className="text-6xl font-bold text-secondary-400 mb-8"
							key={count}
							initial={{ scale: 0.8 }}
							animate={{ scale: 1 }}
							transition={{ type: "spring", stiffness: 500 }}
						>
							{count}
						</motion.div>
					</motion.div>

					<div className="flex justify-center gap-3">
						<motion.button
							onClick={decrease}
							className="bg-pink-300 hover:bg-pink-400 text-pink-800 px-4 py-2 rounded-lg"
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
						>
							Decrease
						</motion.button>

						<motion.button
							onClick={reset}
							className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg"
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
						>
							Reset
						</motion.button>

						<motion.button
							onClick={increase}
							className="bg-teal-300 hover:bg-teal-400 text-teal-800 px-4 py-2 rounded-lg"
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
						>
							Increase
						</motion.button>
					</div>
				</motion.div>
			</main>
		</>
	);
};

export default CounterPage;
