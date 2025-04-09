const LoadingBar = ({ progressBarRef }) => {
	return (
		<>
			<div className="text-2xl font-semibold text-primary-700 mb-6">
				Loading Colors...
			</div>

			<div className="w-64 h-2 bg-primary-100 rounded-full overflow-hidden relative mb-8">
				<div
					ref={progressBarRef}
					className="h-full bg-gradient-to-r from-primary-300 via-primary-500 to-primary-300 rounded-full absolute"
					style={{ width: "50%" }}
				/>
			</div>

			<div className="flex gap-3 justify-center items-center">
				{[...Array(5)].map((_, i) => (
					<div
						key={`${i + 1}`}
						className="w-5 h-5 rounded-full"
						style={{
							backgroundColor:
								i % 3 === 0
									? "var(--color-tertiary-400)"
									: i % 3 === 1
										? "var(--color-secondary-400)"
										: "var(--color-primary-400)",
							animation: `bounce 1.5s infinite ${i * 0.15}s`,
						}}
					/>
				))}
			</div>
		</>
	);
};

export default LoadingBar;
