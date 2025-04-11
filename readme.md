# Education React State and Query Management

## Daftar Isi

- [Education React State and Query Management](#education-react-state-and-query-management)
  - [Daftar Isi](#daftar-isi)
  - [Pengenalan State Management](#pengenalan-state-management)
  - [Penggunaan Zustand](#penggunaan-zustand)
    - [Instalasi Zustand](#instalasi-zustand)
    - [Membuat Store Dasar](#membuat-store-dasar)
    - [Menggunakan Store di Komponen](#menggunakan-store-di-komponen)
    - [Kelebihan Zustand](#kelebihan-zustand)
  - [Pengenalan Query Management](#pengenalan-query-management)
  - [Penggunaan TanStack Query](#penggunaan-tanstack-query)
    - [Instalasi TanStack Query](#instalasi-tanstack-query)
    - [Mengatur Query Client](#mengatur-query-client)
    - [Membuat Query Dasar](#membuat-query-dasar)
    - [Membuat Mutation](#membuat-mutation)
    - [Kelebihan TanStack Query](#kelebihan-tanstack-query)
  - [Let's Demo](#lets-demo)
    - [Disclaimer](#disclaimer)
    - [Step 1 - Setup Project (Server)](#step-1---setup-project-server)
    - [Step 2 - Setup Project (Client)](#step-2---setup-project-client)
    - [Step 3 - State Management dengan `Zustand`](#step-3---state-management-dengan-zustand)
    - [Step 4 - Zustand + Immer = steroid kuadrat](#step-4---zustand--immer--steroid-kuadrat)
    - [Step 5 - Welcome to TanStack Query](#step-5---welcome-to-tanstack-query)
    - [Step 6 - Fetch Data dengan TanStack Query](#step-6---fetch-data-dengan-tanstack-query)
    - [Step 7 - Add New Data dengan TanStack Query](#step-7---add-new-data-dengan-tanstack-query)

## Pengenalan State Management

Pada waktu aplikasi yang dibuat masih dirasa kecil, dan sudah mulai menggunakan component, mungkin masih enak enak saja ketika kita ingin mengelola state hanya menggunakan `useState` dan `props` saja.

Namun ketika aplikasi kita sudah menjadi cukup besar, nah, disinilah masalah akan muncul.

> Apakah menggunakan `useState` dan `props` masih aman aman saja?

Tentunya jawabannya adalah **`tydaque`**

Apalagi ketika kita ingin menggunakan State dari komponen yang secara posisinya jauh dari komponen yang ingin mengaksesnya.

Bayangkan bila kita memiliki struktur component seperti ini:

```jsx
// Komponen Parent (komponen utama)
function Parent() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Parent Component</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Tambah</button>

      {/* Meneruskan state count ke Child */}
      <Child count={count} setCount={setCount} />
    </div>
  );
}

// Komponen Child (anak)
function Child({ count, setCount }) {
  return (
    <div>
      <h2>Child Component</h2>
      <p>Count dari Parent: {count}</p>

      {/* Meneruskan lagi ke GrandChild */}
      <GrandChild count={count} setCount={setCount} />
    </div>
  );
}

// Komponen GrandChild (cucu)
function GrandChild({ count, setCount }) {
  return (
    <div>
      <h3>GrandChild Component</h3>
      <p>Count dari Parent: {count}</p>

      {/* Meneruskan lagi ke GreatGrandChild */}
      <GreatGrandChild count={count} setCount={setCount} />
    </div>
  );
}

// Komponen GreatGrandChild (cicit)
function GreatGrandChild({ count, setCount }) {
  return (
    <div>
      <h4>GreatGrandChild Component</h4>
      <p>Count dari Parent: {count}</p>
      <button onClick={() => setCount(count + 10)}>Tambah 10</button>
    </div>
  );
}
```

Perhatikan bagaimana kita harus terus meneruskan state `count` dan function `setCount` melalui setiap komponen, meskipun komponen tingkat menengah seperti `Child` dan `GrandChild` mungkin tidak benar-benar membutuhkannya. Ini disebut "prop drilling" dan menjadi sangat merepotkan saat aplikasi berkembang.

Lalu, bagaimanakah solusinya?

Nah, solusinya adalah dengan menggunakan sesuatu yang disebut dengan `state management`.

TL;DR `state management` adalah sebuah konsep yang digunakan untuk mengelola state dalam aplikasi React.

`state management` memungkinkan kita untuk mengelola state secara global dan mengaksesnya dari komponen mana pun dalam aplikasi kita.

Dalam React, terdapat beberapa pilihan `state management` yang populer, seperti Redux, MobX, dan Zustand. Pada pembelajaran ini, kita akan mempelajari cara menggunakan `Zustand`.

## Penggunaan Zustand

[Zustand](https://github.com/pmndrs/zustand) adalah library state management yang ringan dan mudah digunakan untuk React.

Nah untuk penggunaan Zustand ini, bisa dilakukan dengan cara sederhana sebagai berikut:

### Instalasi Zustand

```bash
npm install zustand
# atau
yarn add zustand
```

### Membuat Store Dasar

```javascript
// File: store/useCounter.js
// Import fungsi dari zustand
import { create } from "zustand";

const useCounterStore = create((set) => ({
  // State
  count: 0,

  // Method
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}));

// Jangan lupa export store untuk digunakan di component lain
export default useCounterStore;
```

### Menggunakan Store di Komponen

```jsx
// File: components/Counter.jsx
// Mengimport store Zustand yang telah dibuat
import useCounterStore from "../store/useCounter";

function Counter() {
  // Mengambil state dan actions dari Zustand store
  // - count: nilai state counter dari store
  // - increment, decrement, reset: fungsi/actions untuk memanipulasi state
  const { count, increment, decrement, reset } = useCounterStore();

  return (
    <div>
      <h2>Counter: {count}</h2>

      <button onClick={increment}>Tambah</button>
      <button onClick={decrement}>Kurang</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

export default Counter;
```

🔥🔥🔥 Dan **SELESAI** 🔥🔥🔥

Mudah sekali bukan untuk menggunakan `zustand` sebagai state management ini?

### Kelebihan Zustand

- Minimalis dan ringan
- API yang sederhana
- Tidak memerlukan Provider
- (NANTI) Mudah diintegrasikan dengan TypeScript

## Pengenalan Query Management

Pada bagian ini, kita akan membahas pentingnya manajemen query dalam aplikasi React modern. Manajemen query mencakup pengambilan, caching, sinkronisasi, dan pembaruan data server. TanStack Query (sebelumnya React Query) adalah solusi populer untuk masalah ini.

## Penggunaan TanStack Query

TanStack Query adalah library untuk mengambil, menyimpan, dan memperbarui data asinkron dalam React. Di bagian ini, kita akan mempelajari cara:

### Instalasi TanStack Query

```bash
npm install @tanstack/react-query
# atau
yarn add @tanstack/react-query
```

### Mengatur Query Client

```jsx
// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
);
```

### Membuat Query Dasar

```jsx
// src/components/Posts.jsx
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchPosts = async () => {
  const { data } = await axios.get("https://jsonplaceholder.typicode.com/posts");
  return data;
};

function Posts() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  if (isLoading) return <div>Memuat...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Daftar Postingan</h2>
      <ul>
        {data.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default Posts;
```

### Membuat Mutation

```jsx
// src/components/CreatePost.jsx
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const createPost = async (newPost) => {
  const { data } = await axios.post("https://jsonplaceholder.typicode.com/posts", newPost);
  return data;
};

function CreatePost() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      // Invalidate dan refresh queries dengan queryKey ['posts']
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      setTitle("");
      setBody("");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ title, body, userId: 1 });
  };

  return (
    <div>
      <h2>Buat Postingan Baru</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Judul:</label>
          <input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label htmlFor="body">Isi:</label>
          <textarea id="body" value={body} onChange={(e) => setBody(e.target.value)} />
        </div>
        <button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Menyimpan..." : "Simpan"}
        </button>
      </form>
    </div>
  );
}

export default CreatePost;
```

### Kelebihan TanStack Query

- Caching data otomatis
- Penanganan loading dan error state
- Pagination dan infinite scrolling
- Optimistic updates
- Refetching otomatis
- Devtools untuk debugging

Dengan kombinasi Zustand untuk state management lokal dan TanStack Query untuk manajemen data server, aplikasi React Anda akan memiliki arsitektur data yang kuat dan efisien.

## Let's Demo

Oke oke, sudah cukup yah teorinya dan contoh-contoh tanpa kenyataan yang adanya, yuk, daripada berlama-lama, mari sekarang kita akan melakukan demonya yah.

Pada demo ini kita akan menggunakan starter pack yang ada di [repo ini](https://github.com/withered-flowers/education-react-state-and-query-management)

Bukalah folder `sources/a-start` dan kita akan mulai untuk demo.

### Disclaimer

- Demo ini backend-nya menggunakan:
  - [`ElysiaJS`](https://elysiajs.com/), sehingga untuk menjalankannya **WAJIB** menggunakan [`bun`](https://bun.sh/)
  - [`Drizzle`](https://drizzle.io/)
  - [`LibSQL`](https://libsql.org/) sebagai databasenya (`SQLite`)
  - Untuk backendnya ini juga menggunakan `TypeScript`, dan bukan `JavaScript`, jadi kalau kebingungan untuk membaca kodenya, cukup jalankan servernya saja yah 😉
- Untuk frontend-nya sendiri juga menggunakan beberapa package external:
  - [`React`](https://reactjs.org/)
  - [`TailwindCSS`](https://tailwindcss.com/)
  - [`Motion`](https://motion.dev/docs)
  - [`React Hook Form`](https://react-hook-form.com/)
  - [`React Router`](https://reactrouter.com/)

Demo ini secara garis besarnya adalah sebagai berikut:

- Mengganti state `menghitung angka` dan seluruh fungsi yang berhubungan (_deterministik_) dengan menggunakan `zustand`
- Mengganti state `fetcher data` dan `tambah data` dan seluruh fungsi yang berhubungan (_non-deterministik_) dengan menggunakan `tanstack-query`

Yuk, kita mulai!

### Step 1 - Setup Project (Server)

Pastikan sebelum menuju langkah ini, situ sudah:

- Menginstall `git`
- Menginstall `bun` atau `node`
- Clone Repo ini

> Apabila tidak ingin install `bun` atau tidak menggunakan `bun`, maka step ini boleh di-skip yah !

1. Buka terminal, selanjutnya akan kita sebut `terminal-server`
1. Pindah ke folder `sources/a-start/server` dengan perintah:

   ```sh
   cd sources/a-start/server
   ```

1. Install package dengan perintah:

   ```sh
   bun install
   ```

1. Copy file `.env.example` menjadi file `.env`
1. Jalankan server dengan perintah:

   ```sh
   bun run local:seed
   bun run dev
   ```

1. Pastikan setelah menjalankan perintah di atas, muncul pesan `🦊 Elysia is running at localhost:3000`

Sampai di tahap ini, kita sudah berhasil menjalankan server kita dan siap untuk menjalankan client kita.

### Step 2 - Setup Project (Client)

Pada langkah ini kita akan menggunakan `npm` yang sudah kita sayangi dan gunakan terus-terusan yah !

Di sini kita akan menjalankan client (`React`) yang sudah dibuat sebelumnya, adapun langkah-langkahnya adalah sebagai berikut:

1. Buka terminal, selanjutnya akan kita sebut `terminal-client`
1. Buka folder `sources/a-start/client` dengan perintah:

   ```sh
   cd sources/a-start/client
   ```

1. Install package dengan perintah:

   ```sh
   npm install
   ```

1. Jalankan client dengan perintah:

   ```sh
   npm run dev
   ```

1. Pastikan setelah menjalankan perintah di atas, muncul pesan `➜  Local:   http://localhost:5173/`

1. Buka browser dan buka tautan `http://localhost:5173`

Sampai di tahap ini, kita sudah berhasil menjalankan client kita, dan kita sudah siap untuk menambahkan kode untuk belajar penggunaan `Zustand` dan `TanStack Query`.

### Step 3 - State Management dengan `Zustand`

Pada langkah ini kita akan mengganti state `count` yang sebelumnya menggunakan `useState` dan beberapa fungsi yang memodifikasi state tersebut (`increase`, `decrease`, dan `reset`) dengan menggunakan `Zustand`.

Langkah-langkahnya adalah sebagai berikut:

1. Pindah ke `terminal-client`
1. Stop aplikasi yang berjalan dengan `CTRL + C`
1. Install package `zustand` dengan perintah:

   ```sh
   npm install zustand
   ```

1. Buat file baru `store/index.js` dan modifikasi file menjadi seperti berikut:

   ```js
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
   ```

1. Modifikasi halaman `pages/CounterPage.jsx` untuk menggunakan `useCounterStore` yang sudah kita definisikan:

   ```jsx
   // eslint-disable-next-line no-unused-vars
   import { motion } from "motion/react";
   import { useState } from "react";
   import CounterCount from "../components/counter/CounterCount";

   // Import "hooks" useCounterStore
   import { useCounterStore } from "../stores";

   const CounterPage = () => {
     // Di sini kita tinggal import state dan method apa saja yang digunakan
     const { counter, increaseFirst } = useCounterStore((state) => state);

     // ! Supaya tidak terjadi bentrok, maka counter akan direname menjadi counterOld
     const [counterOld, setCounter] = useState({
       firstNumber: 0,
       secondNumber: 100,
     });

     // ! Supaya tidak bentrok, maka fungsi ini akan dicomment
     // const increaseFirst = () => {
     //  setCounter({
     //   ...counter,
     //   firstNumber: counter.firstNumber + 1,
     //  });
     // };

     const decreaseFirst = () => {
       setCounter({
         ...counter,
         firstNumber: counter.firstNumber - 1,
       });
     };

     const increaseSecond = () => {
       setCounter({
         ...counter,
         secondNumber: counter.secondNumber + 1,
       });
     };

     const decreaseSecond = () => {
       setCounter({
         ...counter,
         secondNumber: counter.secondNumber - 1,
       });
     };

     const reset = () => {
       setCounter({
         firstNumber: 0,
         secondNumber: 100,
       });
     };

     return (
       <>
         {/* Main Content */}
         <main className="flex-grow flex items-center justify-center p-6">
           <motion.div
             className="text-center bg-secondary-100 p-8 rounded-xl shadow-lg mx-auto"
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6 }}
           >
             <motion.div
               initial={{ scale: 0.9 }}
               animate={{ scale: 1 }}
               transition={{
                 type: "spring",
                 stiffness: 260,
                 damping: 20,
               }}
             >
               <h2 className="text-2xl font-medium text-secondary-400 mb-2">Counter</h2>

               <div className="flex gap-4 items-center justify-center">
                 <CounterCount
                   counterNumber={counter.firstNumber}
                   increase={increaseFirst}
                   decrease={decreaseFirst}
                 />

                 <CounterCount
                   counterNumber={counter.secondNumber}
                   increase={increaseSecond}
                   decrease={decreaseSecond}
                 />
               </div>
             </motion.div>

             <div className="flex justify-center gap-3">
               <motion.button
                 onClick={reset}
                 className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg"
                 whileHover={{ scale: 1.05 }}
                 whileTap={{ scale: 0.95 }}
               >
                 Reset
               </motion.button>
             </div>
           </motion.div>
         </main>
       </>
     );
   };

   export default CounterPage;
   ```

   Coba jalankan dan lihat hasilnya, apakah:

   - angka pertama menjadi 100,
   - angka kedua menjadi 500, dan
   - `increase` angka pertama bisa berjalan?

Nah sampai di titik ini, sebenarnya sudah cukup mudah, tapi kita masih merasakan hal berikut:

- `Loh kok kayak state lagi sih?`,
- `Jadi masih ribet donk yah?`
- `Malah jadi harus mikir "level nested" nya yah?`

Lalu kita harus bagaimana yah?

Nah di titik inilah `immer` comes to rescue!

### Step 4 - Zustand + Immer = steroid kuadrat

[`immer`](https://immerjs.github.io/immer/) adalah suatu package yang memudahkan kita untuk membuat state yang bersifat immutable tanpa harus menggunakan spread operator.

Dan bagusnya apa? `immer` ini sangat gampang sekali untuk diintegrasikan dengan `zustand`.

Jadi mari kita langsung gabungkan saja `immer` dengan `zustand`.

Di sini, kita akan menyelesaikan `zustand` untuk bisa menggunakan seluruh fungsi untuk Counter yah!

Langkah-langkahnya adalah sebagai berikut:

1. Install package `immer` dengan perintah:

   ```sh
   npm install immer
   ```

1. Modifikasi file `stores/index.js` menjadi sebagai berikut:

   ```js
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
   ```

1. Selanjutnya kita akan memodifikasi `pages/CounterPage.jsx` untuk menggunakan `useCounterImmerStore`

   ```jsx
   // eslint-disable-next-line no-unused-vars
   import { motion } from "motion/react";
   // ! Bye useState ~
   // import { useState } from "react";
   import CounterCount from "../components/counter/CounterCount";

   // Import "hooks" useCounterStore
   // import { useCounterStore } from "../stores";

   // Import "hooks" useCounterImmerStore
   import { useCounterImmerStore } from "../stores";

   const CounterPage = () => {
     // ! Di sini kita tinggal import state dan method apa saja yang digunakan
     // ! Tidak digunakan lagi, karena kita akan menggunakan useCounterImmerStore
     // const { counter, increaseFirst } = useCounterStore((state) => state);

     // Ganti useCounterStore dengan useCounterImmerStore
     const { counter, increaseFirst, decreaseFirst, increaseSecond, decreaseSecond, reset } =
       useCounterImmerStore((state) => state);

     // ! Supaya tidak terjadi bentrok, maka counter akan direname menjadi counterOld
     // ! Pada saat menggunakan useCounterImmerStore, ini sudah tidak dibutuhkan lagi!
     // const [counterOld, setCounter] = useState({
     //  firstNumber: 0,
     //  secondNumber: 100,
     // });

     // ! Supaya tidak bentrok, maka fungsi ini akan dicomment
     // const increaseFirst = () => {
     //  setCounter({
     //   ...counter,
     //   firstNumber: counter.firstNumber + 1,
     //  });
     // };

     // const decreaseFirst = () => {
     //  setCounter({
     //   ...counter,
     //   firstNumber: counter.firstNumber - 1,
     //  });
     // };

     // const increaseSecond = () => {
     //  setCounter({
     //   ...counter,
     //   secondNumber: counter.secondNumber + 1,
     //  });
     // };

     // const decreaseSecond = () => {
     //  setCounter({
     //   ...counter,
     //   secondNumber: counter.secondNumber - 1,
     //  });
     // };

     // const reset = () => {
     //  setCounter({
     //   firstNumber: 0,
     //   secondNumber: 100,
     //  });
     // };

     return (
       <>
         {/* Main Content */}
         <main className="flex-grow flex items-center justify-center p-6">
           <motion.div
             className="text-center bg-secondary-100 p-8 rounded-xl shadow-lg mx-auto"
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6 }}
           >
             <motion.div
               initial={{ scale: 0.9 }}
               animate={{ scale: 1 }}
               transition={{
                 type: "spring",
                 stiffness: 260,
                 damping: 20,
               }}
             >
               <h2 className="text-2xl font-medium text-secondary-400 mb-2">Counter</h2>

               <div className="flex gap-4 items-center justify-center">
                 <CounterCount
                   counterNumber={counter.firstNumber}
                   increase={increaseFirst}
                   decrease={decreaseFirst}
                 />

                 <CounterCount
                   counterNumber={counter.secondNumber}
                   increase={increaseSecond}
                   decrease={decreaseSecond}
                 />
               </div>
             </motion.div>

             <div className="flex justify-center gap-3">
               <motion.button
                 onClick={reset}
                 className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg"
                 whileHover={{ scale: 1.05 }}
                 whileTap={{ scale: 0.95 }}
               >
                 Reset
               </motion.button>
             </div>
           </motion.div>
         </main>
       </>
     );
   };

   export default CounterPage;
   ```

1. _The moment of truth_, kita buka browser dan lihat hasilnya.

   Apakah tetap berjalan sama dengan sebelumnya atau tidak?

Sampai pada titik ini kita sudah bisa menggunakan `zustand` dengan `immer` dengan cukup menyenangkan bukan?

Mari kita masuk ke permasalahan selanjutnya:

Ini kan "state" biasa saja, yang sifatnya deterministik / _client state_.

> Namun, Gimana jika kita ingin membuat state yang non-deterministik / _server state_? (misalnya, data tarikan dari API yang harus _ditungguin_, yang hasilnya bisa jadi berhasil ataupun error?)

Nah untuk menyelesaikan hal seperti ini, sebenarnya `zustand` juga bisa melakukannya, karena di `zustand`, fungsi di dalam store boleh bersifat `async`.

**TAPI**, bila kita menggunakan `zustand` saja, **SELURUH** state dan fungsi yang digunakan untuk _server state_ **HARUS** di-_handle_ sendiri.

Ini artinya:

- _server state_ (non-deterministik) (e.g. `isLoading`, `isPending`, `error`, dan `data`) harus di-_handle_ sendiri.
- Method yang berhubungan dengan _server state_ (non-deterministik) (`setIsLoading`, `setIsPending`, `setError`, `setData`, `fetchData`) harus di-_handle_ sendiri juga.

WAH, hal ini akan menjadi seperti "state" yang ujungnya di bawa ke `zustand` doank donk yah?

Malah jadi seperti "cuma mindahin state" dari Component ke `zustand`...

Apakah hal seperti ini sudah cukup menyenangkan?

Kalau sudah cukup, itu artinya, materi selesai sampai di sini yah, tidak perlu melihat langkah selanjutnya lagi 😈.

### Step 5 - Welcome to TanStack Query

`zustand` pada dasarnya adalah `State Management`, yang digunakan untuk meng-handle state yang hidupnya di client (`client state`)

Tapi apabila berhubungan dengan penarikan data dari eksternal (`server state`), ada baiknya kita tidak menggunakan `zustand` saja, karena jadinya akan terlalu "manual".

Nah untuk itu kita harus menggunakan `State Management` yang ditujukan untuk menghandle `server state`.

Dikenal juga dengan nama `Query Management`, dan yang populer di komunitas React adalah `Redux Toolkit Query (RTK Query)` dan `TanStack Query`.

Pada demo ini kita akan menggunakan `TanStack Query`.

### Step 6 - Fetch Data dengan TanStack Query

Pada langkah ini kita akan mengganti state untuk melakukan `fetch data` yang awalnya ada di component yang terpisah-pisah, akan di-"sederhanakan" dengan `TanStack Query`

Adapun langkah-langkahnya adalah sebagai berikut:

1. Install package `tanstack-query` dengan perintah:

   ```sh
   npm install @tanstack/react-query
   npm install -D @tanstack/eslint-plugin-query
   ```

1. Modifikasi file `main.jsx` untuk menggunakan `QueryClient` dan `QueryClientProvider` dari `@tanstack/react-query`, seperti berikut:

   ```jsx
   import { StrictMode } from "react";
   import { createRoot } from "react-dom/client";
   import "./index.css";
   import { BrowserRouter } from "react-router";
   import MyRoutes from "./routes/index.jsx";

   // Import QueryClient and QueryClientProvider dari @tanstack/react-query
   import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

   // Menginstansiasi QueryClient
   // QueryClient adalah class yang digunakan untuk mengelola state dari query
   const queryClient = new QueryClient();

   createRoot(document.getElementById("root")).render(
     <StrictMode>
       {/* // QueryClientProvider adalah komponen yang digunakan untuk menyediakan QueryClient ke seluruh aplikasi */}
       <QueryClientProvider client={queryClient}>
         <BrowserRouter>
           <MyRoutes />
         </BrowserRouter>
       </QueryClientProvider>
     </StrictMode>,
   );
   ```

1. Buat file baru `services/index.js` yang berfungsi untuk:

   - Mengelola `fetch` data dari API yang kita buat di server
   - Di dalam file ini kita akan membuat fungsi `fetchColors` dan `addNewColors`
   - Fungsi `fetchColors` digunakan untuk mengambil data postingan dari API
   - Fungsi `addNewColors` digunakan untuk menambahkan postingan baru ke API

   Pada langkah ini kita baru membuat filenya saja yah, belum menuliskan kode sama sekali.

1. Copy fungsi `fetchColors` yang ada di dalam file `pages/FetchDataPage.jsx` dan memasukkannya ke dalam file `services/index.js`, serta kodenya dimodifikasi menjadi seperti berikut:

   ```js
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
   ```

1. Modifikasi file `pages/FetchDataPage.jsx` untuk menggunakan hooks `useQuery` dari tanstack-query, sebagai berikut:

   ```jsx
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
         <h1 className="text-3xl font-bold mb-8 text-slate-500">Colors from BackEnd</h1>

         <div className="w-full max-w-3xl overflow-hidden rounded-lg shadow-lg">
           <TableColors colors={colors} />
         </div>
       </main>
     );
   };

   export default FetchDataPage;
   ```

   Perhatikan bahwa di sini kita menggunakan `isPending` dan `isFetching` (bukan `isLoading` secara langsung) dari TanStack Query.

   Untuk perbedaannya adalah sebagai berikut:

   |      Aspek       |           isLoading           |                   isFetching                   |                    isPending                     |
   | :--------------: | :---------------------------: | :--------------------------------------------: | :----------------------------------------------: |
   |   Kapan aktif?   | Saat initial load tanpa data. |     Saat mengambil atau memperbarui data.      |         Saat permintaan sedang diproses.         |
   |  Data tersedia?  |  Tidak ada data sama sekali.  |            Data mungkin sudah ada.             | Tidak terkait langsung dengan ketersediaan data. |
   | Penggunaan utama |   Menampilkan loading awal.   | Menampilkan status pengambilan atau pembaruan. |   Menunjukkan proses yang sedang berlangsung.    |

1. Jalankan aplikasi dan lihat di browser, apakah masih berjalan dengan baik?

Sampai di titik ini artinya kita sudah berhasil untuk menggantikan state yang sebelumnya kita buat secara mandiri, menjadi lebih "otomatis" karena sudah dihandle dengan baik oleh `TanStack Query`.

### Step 7 - Add New Data dengan TanStack Query

Pada langkah ini kita akan mengganti state untuk melakukan `add new data` yang awalnya ada di component yang terpisah-pisah, akan di-"sederhanakan" dengan `TanStack Query`

Adapun langkah-langkahnya adalah sebagai berikut:

1. Modifikasi file `services/index.js` untuk menambahkan fungsi `addColor` yang akan digunakan untuk menambahkan data warna baru ke server, adapun kodenya adalah sebagai berikut:

   ```js
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
   ```

1. Modifikasi file `pages/AddDataPage.jsx` untuk menggunakan `useMutation` dari tanstack query (bukan `useQuery` yah!).

   - Ambil data = `useQuery`
   - Mengubah data = `useMutation`

   ```jsx
   import { animate, stagger } from "motion";
   import { useEffect, useRef, useState } from "react";
   import { useForm } from "react-hook-form";
   import ErrorSubmit from "../components/add-data/ErrorSubmit";
   import FormAddColor from "../components/add-data/FormAddColor";
   import SuccessSubmit from "../components/add-data/SuccessSubmit";

   // Import useMutation dari tanstack
   import { useMutation } from "@tanstack/react-query";

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
   ```

1. Buka browser dan lihat hasilnya, apakah sudah bisa berhasil mengirimkan data ke server?
1. Jika sudah berhasil, cobalah buka kembali halaman `Fetch Data`-nya, apakah data sudah berhasil bertambah?

Sampai di titik ini, artinya kita sudah berhasil mengimplementasikan fitur tambah data dengan menggunakan useMutation yah.

Dan sampai di titik ini juga, artinya adalah kita sudah berhasil mempelajari `zustand` dan `tanstack query` dengan baik !

Cukup mudah bukan?

## References

- [Zustand](https://github.com/pmndrs/zustand)
- [Tanstack Query](https://tanstack.com/query/v4/)
