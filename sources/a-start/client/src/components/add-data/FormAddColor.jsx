const FormAddColor = ({
	register,
	handleSubmit,
	onSubmit,
	errors,
	isSubmitting,
	colorValue,
	setValue,
}) => {
	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="p-6 space-y-6 text-slate-600"
		>
			<div className="form-field">
				<label
					htmlFor="name"
					className="block text-sm font-medium text-primary-700 mb-1"
				>
					Color Name
				</label>
				<input
					{...register("name", { required: "Color name is required" })}
					id="name"
					type="text"
					className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 border-primary-200"
					placeholder="Ex: Vibrant Teal"
				/>
				{errors.name && (
					<p className="mt-1 text-sm text-secondary-600">
						{errors.name.message}
					</p>
				)}
			</div>

			<div className="form-field grid grid-cols-1 md:grid-cols-2 gap-6">
				<div>
					<label
						htmlFor="year"
						className="block text-sm font-medium text-primary-700 mb-1"
					>
						Year
					</label>
					<input
						{...register("year", {
							required: "Year is required",
							pattern: {
								value: /^\d{4}$/,
								message: "Please enter a valid 4-digit year",
							},
						})}
						id="year"
						type="number"
						className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 border-primary-200"
					/>
					{errors.year && (
						<p className="mt-1 text-sm text-secondary-600">
							{errors.year.message}
						</p>
					)}
				</div>

				<div>
					<label
						htmlFor="pantone_value"
						className="block text-sm font-medium text-primary-700 mb-1"
					>
						Pantone Value
					</label>
					<input
						{...register("pantone_value", {
							required: "Pantone value is required",
						})}
						id="pantone_value"
						type="text"
						className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 border-primary-200"
						placeholder="Ex: 14-4811"
					/>
					{errors.pantone_value && (
						<p className="mt-1 text-sm text-secondary-600">
							{errors.pantone_value.message}
						</p>
					)}
				</div>
			</div>

			<div className="form-field">
				<label
					htmlFor="color"
					className="block text-sm font-medium text-primary-700 mb-1"
				>
					Color (HEX value)
				</label>
				<div className="flex space-x-4 items-center">
					<input
						{...register("color", {
							required: "Color value is required",
							pattern: {
								value: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
								message: "Please enter a valid hex color",
							},
						})}
						id="color"
						type="text"
						className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 border-primary-200"
						placeholder="#88e0c0"
					/>
					<input
						type="color"
						value={colorValue}
						onChange={(e) => setValue("color", e.target.value)}
						className="w-12 h-12 rounded cursor-pointer"
					/>
				</div>
				{errors.color && (
					<p className="mt-1 text-sm text-secondary-600">
						{errors.color.message}
					</p>
				)}
			</div>

			<div className="form-field pt-4">
				<button
					type="submit"
					disabled={isSubmitting}
					className={`w-full px-6 py-3 text-white font-medium rounded-md shadow-sm 
        ${
					isSubmitting
						? "bg-primary-300 cursor-not-allowed"
						: "bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
				} transition-colors duration-200`}
				>
					{isSubmitting ? (
						<div className="flex items-center justify-center">
							<svg
								className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
							>
								<title>Loading Spinner</title>
								<circle
									className="opacity-25"
									cx="12"
									cy="12"
									r="10"
									stroke="currentColor"
									strokeWidth="4"
								/>
								<path
									className="opacity-75"
									fill="currentColor"
									d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
								/>
							</svg>
							Submitting...
						</div>
					) : (
						"Add Color"
					)}
				</button>
			</div>
		</form>
	);
};

export default FormAddColor;
