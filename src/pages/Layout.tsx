import { Outlet } from "react-router";
import { MainHeader } from "../components/Header";

export function Layout() {
	return (
		<div className="py-6">
			<MainHeader />
			<Outlet />
		</div>
	);
}
