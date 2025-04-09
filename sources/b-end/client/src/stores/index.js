import { create } from "zustand";
// Sekarang kita akan menggunakan immer
// PERHATIKAN IMPORT-nya bukan package immer secara langsung
import { immer } from "zustand/middleware/immer";

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

// Nah untuk melihat pembedanya, mari kita buat sebuah store yang baru dengan nama useCounterImmerStore
export const useCounterImmerStore = create(
	// Di sini kita akan memanggil immer terlebih dahulu
	// anggap saja immer ini akan menjadi "middleware" sebelum memanggil fungsi yang memiliki parameter set
	immer((set) => ({
		// Selebihnya di dalam sini kita akan memperlakukannya sama seperti yang sebelum menggunakan immer

		counter: {
			firstNumber: 200,
			secondNumber: 750,
		},

		increaseFirst: () =>
			// Perbedaannya adalah:
			// Di dalam fungsi set:
			// - Langsung mengupdate firstNumber tanpa memerlukan spread operator

			// Hal ini bisa terjadi karena kita sudah membungkus fungsi di dalam immer
			set((state) => {
				// Di sini kita memperlakukan state.counter.firstNumber sebagai state yang akan bisa diupdate secara langsung, WALAUPUN sebenarnya state itu sifatnya "immutable" seperti layaknya useState di dalam react
				state.counter.firstNumber += 1;
			}),

		decreaseFirst: () =>
			set((state) => {
				state.counter.firstNumber -= 1;
			}),

		increaseSecond: () =>
			set((state) => {
				state.counter.secondNumber += 1;
			}),

		decreaseSecond: () =>
			set((state) => {
				state.counter.secondNumber -= 1;
			}),

		reset: () =>
			set((state) => {
				state.counter.firstNumber = 200;
				state.counter.secondNumber = 750;
			}),
	})),
);
