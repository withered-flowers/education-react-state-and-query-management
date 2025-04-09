// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";

const Footer = () => {
	return (
		<motion.footer
			className="bg-tertiary-100 text-tertiary-700 py-4 text-center text-sm"
			initial={{ y: 50 }}
			animate={{ y: 0 }}
			transition={{ duration: 0.5 }}
		>
			created with ❤️ by withered-flowers - 2025
		</motion.footer>
	);
};

export default Footer;
