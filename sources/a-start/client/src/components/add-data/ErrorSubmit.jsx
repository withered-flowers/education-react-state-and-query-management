const ErrorSubmit = ({ error }) => {
	return (
		<div className="m-6 p-4 bg-secondary-100 text-secondary-800 rounded-lg flex items-center">
			<div className="mr-3 bg-secondary-500 text-white p-2 rounded-full">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-5 w-5"
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<title>Error Icon</title>
					<path
						fillRule="evenodd"
						d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
						clipRule="evenodd"
					/>
				</svg>
			</div>
			{error}
		</div>
	);
};

export default ErrorSubmit;
