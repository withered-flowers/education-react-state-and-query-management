import { animate, stagger } from "motion";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import ErrorSubmit from "../components/add-data/ErrorSubmit";
import FormAddColor from "../components/add-data/FormAddColor";
import SuccessSubmit from "../components/add-data/SuccessSubmit";

// Import useMutation dari tanstack
import { useMutation, useQueryClient } from "@tanstack/react-query";

// Import addColor dari services yang sudah dibuat sebelumnya
import { addColor } from "../services";

const AddDataPage = () => {
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

	// Di sini kita akan memanggil queryClient yang sudah diprovide sebelumnya
	const queryClient = useQueryClient();

	// ? Di sini kita akan menggunakan useMutation dari tanstack

	// ? useMutation menerima parameter options yang berisi:
	// ? - mutateFn: function untuk melakukan mutation
	// ? - onSuccess: function untuk menangani response dari mutation
	// ? - onError: function untuk menangani error dari mutation

	// ? useMutation akan mengembalikan objek yang berisi:
	// ? - mutate: function untuk melakukan mutation
	// ? - isPending: boolean untuk mengecek apakah mutation sedang berlangsung
	const {
		mutate,

		// Supaya tidak mengubah kode di bawah, kita berikan alias isSubmitting,
		isPending: isSubmitting,
	} = useMutation({
		mutationFn: addColor,
		onSuccess: (data) => {
			// Animate form on success
			animate(
				formRef.current,
				{ scale: [1, 0.98, 1], y: [0, -5, 0] },
				{ duration: 0.5, easing: "ease-in-out" },
			);

			// ? Modif value dari response.data.data.name -> data.data.name
			// ? karena sekarang variable data dari argumen onSuccess
			setSuccess(`Color "${data.data.name}" added successfully!`);
			reset(); // Reset form fields

			// Animate success icon
			if (successIconRef.current) {
				animate(
					successIconRef.current,
					{ scale: [0, 1.2, 1], rotate: [0, 10, 0] },
					{ duration: 0.6, easing: "ease-out" },
				);
			}

			// Pada saat semuanya sudah selesai, kita harus memanggil invalidateQueries
			// Hal ini untuk memberitahukan dalam tanstack query, bahwa data "colors" sudah berubah
			queryClient.invalidateQueries({ queryKey: ["colors"] });
		},
		// ? Instead of menggunakan try-catch untuk mendapatkan error-nya
		// ? Di sini kita akan menggunakan onError untuk menangkap error pada saat terjadi mutasi data
		onError: (err) => {
			console.error(err);
			setError(err.response?.data?.message || "Failed to add color");

			// Shake animation for error
			animate(
				formRef.current,
				{ x: [0, -10, 10, -10, 10, 0] },
				{ duration: 0.5, easing: "ease-in-out" },
			);
		},
	});

	// Watch the color value
	// Used to set the color input value (either via hex / color picker)
	const colorValue = watch("color");

	// Nah di sini kita akan mengganti logic untuk melakukan onSubmit-nya
	const onSubmit = (data) => {
		setError(null);
		setSuccess(null);

		// TADA! di sini kita hanya perlu memanggil "mutation" saja,
		// karena selebihnya sudah di handle di dalam hooks useMutation itu sendiri
		mutate(data);
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
