import { BrowserRouter, Route, Routes } from "react-router";
import { Components } from "./pages/Components";
import { Home } from "./pages/Home";
import { Layout } from "./pages/Layout";
import { PhotoDetails } from "./pages/PhotoDetails";

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<Layout />}>
					<Route index element={<Home />} />
					<Route path="/components" element={<Components />} />
					<Route path="/fotos/:id" element={<PhotoDetails />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}
