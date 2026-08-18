import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NuqsAdapter } from "nuqs/adapters/react-router/v7";
import { BrowserRouter, Route, Routes } from "react-router";
import { Components } from "./pages/Components";
import { Home } from "./pages/Home";
import { Layout } from "./pages/Layout";
import { PhotoDetails } from "./pages/PhotoDetails";

const queryClient = new QueryClient();

export default function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<NuqsAdapter>
					<Routes>
						<Route element={<Layout />}>
							<Route index element={<Home />} />
							<Route path="/components" element={<Components />} />
							<Route path="/fotos/:id" element={<PhotoDetails />} />
						</Route>
					</Routes>
				</NuqsAdapter>
			</BrowserRouter>
		</QueryClientProvider>
	);
}
