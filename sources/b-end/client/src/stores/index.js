import { create } from "zustand";

// Di sini kita akan membuat sebuah store (tempat menampung state secara global)
// via fungsi `create` dari zustand

// Untuk konvensi penamaannya, biasanya ditulis dengan camelCase, dan karena ini hooks, maka gunakan use<NamaDomain / NamaState>Store.
// Karena ini Counter, maka kita akan menggunakan nama useCounterStore
const useCounterStore = create(
	// [PARAMS] create menerima sebuah fungsi yang menerima 1 parameter:
	// - `set` ini digunakan untuk mengubah state secara global
	// [RETURN] create megembalikan objek yang berisi:
	// - state yang berisi data yang akan digunakan
	// - method untuk mengubah state
	(set) => ({
		// State atau data global
		count: 0,

		// Method yang nanti bisa digunakan
		increase: () =>
			set(
				// set merupakan fungsi yang digunakan untuk mengubah state secara global
				// [PARAMS] menerima sebuah parameter yang merupakan "state" yang mengacu pada state global yang bisa diubah
				// [RETURN] mengembalikan objek yang berisi data yang akan digunakan
				(state) => ({ count: state.count + 1 }),
			),
		decrease: () => set((state) => ({ count: state.count - 1 })),
		reset: () => set({ count: 0 }),
	}),
);

export default useCounterStore;
