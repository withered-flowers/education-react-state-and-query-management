import axios from "axios";
import { animate, stagger } from "motion";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import ErrorSubmit from "../components/add-data/ErrorSubmit";
import FormAddColor from "../components/add-data/FormAddColor";
import SuccessSubmit from "../components/add-data/SuccessSubmit";

const AddDataPage = () => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [success, setSuccess] = useState(null);
	const [error, setError] = useState(null);
	const formRef = useRef(null);
	const successIconRef = useRef(null);

	const {
		register,
		handleSubmit,
		reset,
		setValue,
		watch,
		formState: { errors },
	} = useForm({
		defaultValues: {
			name: "",
			year: new Date().getFullYear(),
			color: "#88e0c0",
			pantone_value: "",
		},
	});

	// Watch the color value
	// Used to set the color input value (either via hex / color picker)
	const colorValue = watch("color");

	// Form submission handler
	const onSubmit = async (data) => {
		setIsSubmitting(true);
		setError(null);
		setSuccess(null);

		try {
			const response = await axios.post("http://localhost:3000/colors", {
				...data,
				year: Number(data.year),
			});

			// ! ONLY FOR DEV PURPOSE - Sleep 2 seconds
			await new Promise((resolve) => setTimeout(resolve, 2000));

			// Animate form on success
			animate(
				formRef.current,
				{ scale: [1, 0.98, 1], y: [0, -5, 0] },
				{ duration: 0.5, easing: "ease-in-out" },
			);

			setSuccess(`Color "${response.data.data.name}" added successfully!`);
			reset(); // Reset form fields

			// Animate success icon
			if (successIconRef.current) {
				animate(
					successIconRef.current,
					{ scale: [0, 1.2, 1], rotate: [0, 10, 0] },
					{ duration: 0.6, easing: "ease-out" },
				);
			}
		} catch (err) {
			console.error(err);
			setError(err.response?.data?.message || "Failed to add color");

			// Shake animation for error
			animate(
				formRef.current,
				{ x: [0, -10, 10, -10, 10, 0] },
				{ duration: 0.5, easing: "ease-in-out" },
			);
		} finally {
			setIsSubmitting(false);
		}
	};

	// Animate form elements on initial render
	useEffect(() => {
		if (formRef.current) {
			// Animate form container
			animate(
				formRef.current,
				{ opacity: [0, 1], y: [20, 0] },
				{ duration: 0.6, easing: "ease-out" },
			);

			// Animate form fields
			animate(
				".form-field",
				{ opacity: [0, 1], x: [-20, 0] },
				{ delay: stagger(0.1), duration: 0.5, easing: "ease-out" },
			);
		}
	}, []);

	return (
		<main className="flex-grow flex flex-col items-center justify-center p-6 bg-primary-50">
			<div
				className="w-full max-w-2xl rounded-lg shadow-lg bg-white overflow-hidden"
				ref={formRef}
			>
				<div className="bg-gradient-to-r from-primary-400 to-tertiary-400 p-6 text-white">
					<h1 className="text-3xl font-bold">Add New Color</h1>
					<p className="mt-2 opacity-90">
						Fill the form below to add a new color to the collection
					</p>
				</div>

				{success && <SuccessSubmit success={success} ref={successIconRef} />}

				{error && <ErrorSubmit error={error} />}

				<FormAddColor
					register={register}
					handleSubmit={handleSubmit}
					onSubmit={onSubmit}
					errors={errors}
					isSubmitting={isSubmitting}
					colorValue={colorValue}
					setValue={setValue}
				/>
			</div>
		</main>
	);
};

export default AddDataPage;
