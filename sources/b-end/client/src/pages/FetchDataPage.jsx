// ? Di sini axios sudah bisa dicomment, karena digunakan di services
// import axios from "axios";
import { animate, stagger } from "motion";
// ? Di sini sudah tidak ada useState-nya, karena state ada di tanstack-query
import { useEffect, useRef } from "react";
import LoadingBar from "../components/LoadingBar";
import TableColors from "../components/TableColors";

// ? Import useQuery dan fetchColors untuk fetch data ala tanstack-query
import { useQuery } from "@tanstack/react-query";
import { fetchColors } from "../services";

const FetchDataPage = () => {
	// ? Disable seluruh state yang ada di sini, karena semuanya sudah masuk ke tanstack-query
	// const [colors, setColors] = useState([]);
	// const [isLoading, setIsLoading] = useState(true);
	// const [error, setError] = useState(null);

	// ? Untuk ref, tetap digunakan, karena ini berhubungan dengan animasi
	const progressBarRef = useRef(null);

	// ? Mari kita mulai menggunakan tanstack-query, khususnya untuk fetch data, dengan menggunakan useQuery
	// useQuery adalah suatu hooks yang disediakan oleh tanstack query untuk melakukan fetch data dari server
	// useQuery menerima sebuah parameter berupa object
	// object ini akan memiliki dua property wajib, yaitu queryKey dan queryFn
	// - queryKey adalah kunci unik yang digunakan untuk mengidentifikasi query
	// - queryFn adalah fungsi yang digunakan untuk mengambil data dari server
	//   - (fungsi ini akan menggunakan services yang sudah kita buat sebelumnya)

	// useQuery ini SECARA OTOMATIS akan mengembalikan beberapa state dari server yang siap digunakan:
	// - isPending: boolean
	// - isError: boolean
	// - isSuccess: boolean
	// - error: object
	// - data: object
	const {
		// ? Walaupun sebenarnya ada isLoading di dalam tanstack query, tapi yang direkomendasikan untuk digunakan adalah isPending.
		// ? Tapi dalam aplikasi kita, kita ingin untuk SELALU menampilkan loading spinner ketika data sedang diambil.
		// ? Sehingga kita juga harus menggunakan isFetching untuk mengetahui apakah data sedang diambil dari server.
		// ? Untuk mengetahui perbedaan isLoading, isFetching, dan isPending, bisa dibaca di sini:
		// ? - https://isaichenko.dev/blog/is-pending-tanstack-query/

		// ! Kita berikan alias isPending sebagai isLoading hanya supaya kode di bawah tidak banyak berubah.
		isPending,
		isFetching,
		error,
		data: colors,
	} = useQuery({
		queryKey: ["colors"],
		// Ingat di sini kita memberikan fungsinya,
		// ! JANGAN DIINVOKE!
		queryFn: fetchColors,
	});

	// ! Di sini kita akan menonaktifkan useEffect ini karena sudah menggunakan tanstack query
	// useEffect(() => {
	// 	const fetchColors = async () => {
	// 		try {
	// 			setIsLoading(true);

	// 			// ? [ALT] - Use this if the response from localhost is not working
	// 			// const response = await axios.get("https://reqres.in/api/colors");
	// 			const response = await axios.get("http://localhost:3000/colors");

	// 			// ! ONLY FOR DEV PURPOSE - Sleep 2 seconds
	// 			await new Promise((resolve) => setTimeout(resolve, 2000));

	// 			setColors(response.data.data);
	// 			setIsLoading(false);
	// 		} catch (err) {
	// 			console.log(err);

	// 			setError("Failed to fetch colors");
	// 			setIsLoading(false);
	// 		}
	// 	};

	// 	fetchColors();
	// }, []);

	// Nah supaya kita bisa menampilkan loading spinner ketika data sedang diambil dari server,
	// kita harus menggabungkan isPending dengan isFetching.

	// ? Supaya kode di bawah kita ini tidak berubah banyak, maka kombinasi dari isPending dan isFetching kita namanya dengan isLoading saja.
	const isLoading = isPending || isFetching;

	useEffect(() => {
		if (isLoading && progressBarRef.current) {
			// Animate progress bar with continuous motion
			animate(
				progressBarRef.current,
				{
					scaleX: [0, 1.5],
					x: ["-100%", "100%"],
				},
				{
					duration: 1.5,
					repeat: Number.POSITIVE_INFINITY,
					easing: "ease-in-out",
				},
			);
		}
	}, [isLoading]);

	useEffect(() => {
		if (!isLoading && colors.length > 0) {
			// Animate table rows
			animate(
				".color-row",
				{ opacity: [0, 1], y: [20, 0] },
				{ delay: stagger(0.1), duration: 0.5, easing: "ease-in-out" },
			);

			// Animate color cells
			animate(
				".color-cell",
				{ scale: [0.8, 1], rotate: [5, 0] },
				{ delay: stagger(0.05, { start: 0.2 }), duration: 0.6 },
			);
		}
	}, [isLoading, colors]);

	if (isLoading) {
		return (
			<main className="flex-grow flex flex-col items-center justify-center p-6">
				<LoadingBar progressBarRef={progressBarRef} />
			</main>
		);
	}

	if (error) {
		return (
			<main className="flex-grow flex items-center justify-center p-6">
				<div className="text-xl font-semibold text-secondary-600 bg-secondary-100 p-4 rounded-lg shadow">
					{error}
				</div>
			</main>
		);
	}

	return (
		<main className="flex-grow flex flex-col items-center justify-center p-6 text-primary-800">
			<h1 className="text-3xl font-bold mb-8 text-slate-500">
				Colors from BackEnd
			</h1>

			<div className="w-full max-w-3xl overflow-hidden rounded-lg shadow-lg">
				<TableColors colors={colors} />
			</div>
		</main>
	);
};

export default FetchDataPage;
