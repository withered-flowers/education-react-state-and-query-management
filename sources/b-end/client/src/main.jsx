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
