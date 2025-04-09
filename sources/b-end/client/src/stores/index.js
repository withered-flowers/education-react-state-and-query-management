import { create } from "zustand";

// Di sini kita akan membuat sebuah store (tempat menampung state secara global)
// via fungsi `create` dari zustand

// Untuk konvensi penamaannya, biasanya ditulis dengan camelCase, dan karena ini hooks, maka gunakan use<NamaDomain / NamaState>Store.
// Karena ini Counter, maka kita akan menggunakan nama useCounterStore
export const useCounterStore = create(
	// [PARAMS] create menerima sebuah fungsi yang menerima 1 parameter:
	// - `set` ini digunakan untuk mengubah state secara global
	// [RETURN] create megembalikan objek yang berisi:
	// - state yang berisi data yang akan digunakan
	// - method untuk mengubah state
	(set) => ({
		// State atau data global
		counter: {
			firstNumber: 100,
			secondNumber: 500,
		},

		// Method yang nanti bisa digunakan
		// Bila ingin memberikan data, kita gunakan parameter di dalam fungsi ini
		increaseFirst: () =>
			// set merupakan fungsi yang digunakan untuk mengubah state secara global
			// Menerima sebuah fungsi yang akan mengembalikan objek yang berisi data yang akan digunakan

			set(
				// Fungsi di dalam ini bisa menerima state
				// Yang akan digunakan untuk memodifikasi variable global (state) yang ada di dalam store

				// TL;DR:
				// Fungsi yang kita definisikan (1) akan menerima sebuah fungsi bernama `set` (2)
				// `set` akan menerima sebuah fungsi untuk memodifikasi state (3)
				(state) => ({
					// ! State ini SEHARUSNYA bersifat immutable sehingga seharusnya, bila datanya nested, kita membutuhkan spread operator
					// ! NAMUN pada zustand, hal ini tidak diperlukan lagi, karena secara OTOMATIS, hal ini sudah dilakukan, enak kan?
					// ...state,
					counter: {
						// ! SAYANGNYA, hal ini hanya berlaku pada LEVEL PERTAMA SAJA!
						// Karena counter ini adalah state di LEVEL KEDUA, sehingga kita perlu menggunakan spread operator untuk menggabungkan state lama dengan state baru
						...state.counter,
						firstNumber: state.counter.firstNumber + 1,
					},
				}),
			),
	}),
);

export default useCounterStore;
