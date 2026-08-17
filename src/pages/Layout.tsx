import { Outlet } from "react-router";
import { MainHeader } from "../components/Header";
import { MainContent } from "../components/MainContent";

export function Layout() {
	return (
		<div className="py-6">
			<MainHeader />
			<MainContent>
				<Outlet />
			</MainContent>
		</div>
	);
}
