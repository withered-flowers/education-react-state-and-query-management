# Education React State and Query Management

## Daftar Isi

- [Pengenalan State Management](#pengenalan-state-management)
- [Penggunaan Zustand](#penggunaan-zustand)
- [Pengenalan Query Management](#pengenalan-query-management)
- [Penggunaan TanStack Query](#penggunaan-tanstack-query)

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

// Membuat store counter dengan Zustand
const useCounterStore = create((set) => ({
  // State awal dengan nilai count = 0
  count: 0,

  // Fungsi untuk menambah nilai count sebanyak 1
  increment: () => set((state) => ({ count: state.count + 1 })),

  // Fungsi untuk mengurangi nilai count sebanyak 1
  decrement: () => set((state) => ({ count: state.count - 1 })),

  // Fungsi untuk mengatur ulang nilai count menjadi 0
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
      {/* Menggunakan state count dari Zustand store */}
      <h2>Counter: {count}</h2>

      {/* Memanggil action increment saat tombol diklik */}
      <button onClick={increment}>Tambah</button>

      {/* Memanggil action decrement saat tombol diklik */}
      <button onClick={decrement}>Kurang</button>

      {/* Memanggil action reset saat tombol diklik */}
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

Yuk, kita mulai!

### Step 1 - Setup Project (Server)

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

1. asd
