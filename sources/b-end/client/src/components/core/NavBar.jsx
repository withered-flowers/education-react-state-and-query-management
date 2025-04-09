// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";

const NavBar = () => {
	return (
		<motion.nav
			className="bg-primary-100 text-primary-700 shadow-lg"
			initial={{ y: -50 }}
			animate={{ y: 0 }}
			transition={{ duration: 0.5 }}
		>
			<div className="container mx-auto px-4 py-3 flex justify-between items-center">
				<motion.div className="text-xl font-bold" whileHover={{ scale: 1.05 }}>
					Belajar Beruang + Query
				</motion.div>
				<div className="flex gap-6">
					<motion.a
						href="/"
						className="hover:text-indigo-700 font-medium"
						whileHover={{ scale: 1.1 }}
					>
						Counter
					</motion.a>
					<motion.a
						href="/data"
						className="hover:text-indigo-700 font-medium"
						whileHover={{ scale: 1.1 }}
					>
						Fetch Data
					</motion.a>
					<motion.a
						href="/add-data"
						className="hover:text-indigo-700 font-medium"
						whileHover={{ scale: 1.1 }}
					>
						Add New Data
					</motion.a>
				</div>
			</div>
		</motion.nav>
	);
};

export default NavBar;
