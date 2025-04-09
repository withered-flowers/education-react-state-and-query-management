// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
// ! Bye useState ~
// import { useState } from "react";
import CounterCount from "../components/counter/CounterCount";

// Import "hooks" useCounterStore
// import { useCounterStore } from "../stores";

// Import "hooks" useCounterImmerStore
import { useCounterImmerStore } from "../stores";

const CounterPage = () => {
	// ! Di sini kita tinggal import state dan method apa saja yang digunakan
	// ! Tidak digunakan lagi, karena kita akan menggunakan useCounterImmerStore
	// const { counter, increaseFirst } = useCounterStore((state) => state);

	// Ganti useCounterStore dengan useCounterImmerStore
	const {
		counter,
		increaseFirst,
		decreaseFirst,
		increaseSecond,
		decreaseSecond,
		reset,
	} = useCounterImmerStore((state) => state);

	// ! Supaya tidak terjadi bentrok, maka counter akan direname menjadi counterOld
	// ! Pada saat menggunakan useCounterImmerStore, ini sudah tidak dibutuhkan lagi!
	// const [counterOld, setCounter] = useState({
	// 	firstNumber: 0,
	// 	secondNumber: 100,
	// });

	// ! Supaya tidak bentrok, maka fungsi ini akan dicomment
	// const increaseFirst = () => {
	// 	setCounter({
	// 		...counter,
	// 		firstNumber: counter.firstNumber + 1,
	// 	});
	// };

	// const decreaseFirst = () => {
	// 	setCounter({
	// 		...counter,
	// 		firstNumber: counter.firstNumber - 1,
	// 	});
	// };

	// const increaseSecond = () => {
	// 	setCounter({
	// 		...counter,
	// 		secondNumber: counter.secondNumber + 1,
	// 	});
	// };

	// const decreaseSecond = () => {
	// 	setCounter({
	// 		...counter,
	// 		secondNumber: counter.secondNumber - 1,
	// 	});
	// };

	// const reset = () => {
	// 	setCounter({
	// 		firstNumber: 0,
	// 		secondNumber: 100,
	// 	});
	// };

	return (
		<>
			{/* Main Content */}
			<main className="flex-grow flex items-center justify-center p-6">
				<motion.div
					className="text-center bg-secondary-100 p-8 rounded-xl shadow-lg mx-auto"
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

						<div className="flex gap-4 items-center justify-center">
							<CounterCount
								counterNumber={counter.firstNumber}
								increase={increaseFirst}
								decrease={decreaseFirst}
							/>

							<CounterCount
								counterNumber={counter.secondNumber}
								increase={increaseSecond}
								decrease={decreaseSecond}
							/>
						</div>
					</motion.div>

					<div className="flex justify-center gap-3">
						<motion.button
							onClick={reset}
							className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg"
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
						>
							Reset
						</motion.button>
					</div>
				</motion.div>
			</main>
		</>
	);
};

export default CounterPage;
