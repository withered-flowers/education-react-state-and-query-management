// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";

const CounterCount = ({ counterNumber, decrease, increase }) => {
	return (
		<div className="flex flex-col p-8">
			<motion.div
				className="text-6xl font-bold text-secondary-400 mb-8"
				key={counterNumber}
				initial={{ scale: 0.8 }}
				animate={{ scale: 1 }}
				transition={{ type: "spring", stiffness: 500 }}
			>
				{counterNumber}
			</motion.div>

			<motion.div className="flex gap-4">
				<motion.button
					onClick={decrease}
					className="bg-pink-300 hover:bg-pink-400 text-pink-800 px-4 py-2 rounded-lg"
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
				>
					Decrease
				</motion.button>

				<motion.button
					onClick={increase}
					className="bg-teal-300 hover:bg-teal-400 text-teal-800 px-4 py-2 rounded-lg"
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
				>
					Increase
				</motion.button>
			</motion.div>
		</div>
	);
};

export default CounterCount;
