import React from "react";

const SuccessSubmit = ({ success, ref: successIconRef }) => {
	return (
		<div className="m-6 p-4 bg-primary-100 text-primary-800 rounded-lg flex items-center">
			<div
				ref={successIconRef}
				className="mr-3 bg-primary-500 text-white p-2 rounded-full"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-5 w-5"
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<title>Success Icon</title>
					<path
						fillRule="evenodd"
						d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
						clipRule="evenodd"
					/>
				</svg>
			</div>
			{success}
		</div>
	);
};

export default SuccessSubmit;
