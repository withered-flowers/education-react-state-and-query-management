// ? Jangan lupa import axios di sini
import axios from "axios";

export const fetchColors = async () => {
	// Tidak membutuhkan try-catch, karena nanti error diurus oleh tanstack query
	// try {
	// ! Tidak dibutuhkan lagi, karena nanti di-urus oleh tanstack query
	// setIsLoading(true);

	// ? [ALT] - Use this if the response from localhost is not working
	// const response = await axios.get("https://reqres.in/api/colors");
	const response = await axios.get("http://localhost:3000/colors");

	// ! ONLY FOR DEV PURPOSE - Sleep 2 seconds
	await new Promise((resolve) => setTimeout(resolve, 2000));

	// ! Harus dimodifikasi, karena ini adalah data yang dikembalikan
	// setColors(response.data.data);
	return response.data.data;

	// ! Tidak dibutuhkan lagi, karena nanti di-urus oleh tanstack query
	// setIsLoading(false);

	// Tidak membutuhkan try-catch, karena nanti error diurus oleh tanstack query
	// } catch (err) {
	//   console.log(err);

	//   setError("Failed to fetch colors");
	//   setIsLoading(false);
	// }
};

// Apabila dituliskan bersih tanpa comment yang membingungkan
// Fungsi di atas akan menjadi seperti ini
export const fetchColorsWithoutComment = async () => {
	const response = await axios.get("http://localhost:3000/colors");

	// ! ONLY FOR DEV PURPOSE - Sleep 2 seconds
	await new Promise((resolve) => setTimeout(resolve, 2000));

	return response.data.data;
};

// Fungsi untuk menambahkan warna baru
// Fokusnya hanyalah pada data yang dikirim ke server
// ! TIDAK MEMILIKI UI LOGIC!
export const addColor = async (colorData) => {
	const response = await axios.post("http://localhost:3000/colors", {
		...colorData,
		year: Number(colorData.year),
	});

	// ! ONLY FOR DEV PURPOSE - Sleep 2 seconds
	await new Promise((resolve) => setTimeout(resolve, 2000));

	return response.data;
};
