import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Logo from "../../assets/bold-fitness-logo.svg";
import { CiGrid42 } from "react-icons/ci";
import { PiUsersFourLight } from "react-icons/pi";
import { RxChevronDown } from "react-icons/rx";
import { HiOutlineKey } from "react-icons/hi2";
import { CiLogout } from "react-icons/ci";
import { contextData } from "../../context/AuthContext";
import SidebarLinkGroup from "./SidebarLinkGroup";
import { VscMenu } from "react-icons/vsc";
import DarkModeSwitcher from "./DarkModeSwitcher";

interface SidebarProps {
	sidebarOpen: boolean;
	setSidebarOpen: (arg: boolean) => void;
}

export default function AdminSidebar({ sidebarOpen, setSidebarOpen }: SidebarProps) {
	const location = useLocation();
	const { pathname } = location;
	const { logout } = contextData();
	const [sidebarExpanded, setSidebarExpanded] = useState(false);
	const trigger = useRef<any>(null);
	const sidebar = useRef<any>(null);

	// close on click outside
	useEffect(() => {
		const clickHandler = ({ target }: MouseEvent) => {
			if (!sidebar.current || !trigger.current) return;
			if (!sidebarOpen || sidebar.current.contains(target) || trigger.current.contains(target)) return;
			setSidebarOpen(false);
		};
		document.addEventListener("click", clickHandler);
		return () => document.removeEventListener("click", clickHandler);
	});

	// close if the esc key is pressed
	useEffect(() => {
		const keyHandler = ({ keyCode }: KeyboardEvent) => {
			if (!sidebarOpen || keyCode !== 27) return;
			setSidebarOpen(false);
		};
		document.addEventListener("keydown", keyHandler);
		return () => document.removeEventListener("keydown", keyHandler);
	});

	return (
		<aside
			ref={sidebar}
			className={`text-xs absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-boxdark duration-300 ease-linear lg:static lg:translate-x-0 ${
				sidebarOpen ? "translate-x-0" : "-translate-x-full"
			}`}
		>
			{/* <!-- SIDEBAR HEADER --> */}
			<div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
				<NavLink to="/">
					<img src={Logo} alt="Logo" className="h-9 w-auto" />
        </NavLink>
        
        <DarkModeSwitcher />

				<button
					ref={trigger}
					onClick={() => setSidebarOpen(!sidebarOpen)}
					aria-controls="sidebar"
					aria-expanded={sidebarOpen}
					className="block lg:hidden"
				>
					<VscMenu className="fill-current" />
				</button>
			</div>

			<div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
				<nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
					<div>
						<>
							<ul className="mb-10 flex flex-col gap-1.5">
								<li>
									<NavLink
										to="/admin"
										className={`text-xs group relative flex items-center gap-2.5 rounded-sm py-2.5 px-7.5 text-gray-300 font-montserrat duration-300 ease-in-out hover:bg-black dark:hover:bg-black ${
											(pathname === "/admin") && "bg-black"
										}`}
									>
										<CiGrid42 className="text-xl" />
										Dashboard
									</NavLink>
								</li>

								<SidebarLinkGroup activeCondition={pathname === "/" || pathname.includes("admin")}>
									{(handleClick, open) => {
										return (
											<>
												<NavLink
													to="#"
													className={`text-xs group relative flex items-center gap-2.5 rounded-sm py-2.5 px-7.5 text-gray-300 font-montserrat duration-300 ease-in-out hover:bg-black dark:hover:bg-black ${
														(pathname === "/" || pathname.includes("admin/members")) &&
														"bg-black"
													}`}
													onClick={(e) => {
														e.preventDefault();
														sidebarExpanded ? handleClick() : setSidebarExpanded(true);
													}}
												>
													<PiUsersFourLight className="text-xl" />
													Manage Users
													<RxChevronDown />
												</NavLink>
												<div className={`text-xs translate transform overflow-hidden ${!open && "hidden"}`}>
													<ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
														<li>
															<NavLink
																to="/admin/members"
																className={({ isActive }) =>
																	"group relative flex items-center gap-2.5 rounded-md px-7.5 text-desc duration-300 ease-in-out hover:text-white " +
																	(isActive && "!text-white")
																}
															>
																Members
															</NavLink>
														</li>

														<li>
															<NavLink
																to="/admin/banned-users"
																className={({ isActive }) =>
																	"group relative flex items-center gap-2.5 rounded-md px-7.5 text-desc duration-300 ease-in-out hover:text-white " +
																	(isActive && "!text-white")
																}
															>
																Banned Users
															</NavLink>
														</li>
													</ul>
												</div>
											</>
										);
									}}
								</SidebarLinkGroup>
							</ul>
						</>
					</div>
					<div>
						{
							<>
								<ul className="flex flex-col gap-1.5">
									<li>
										<NavLink
											to="/admin/settings"
											className={`text-xs group relative flex items-center gap-2.5 rounded-sm py-2.5 px-7.5 text-gray-300 font-montserrat duration-300 ease-in-out hover:bg-black dark:hover:bg-black ${
												pathname.includes("settings") && "bg-black"
											}`}
										>
											<HiOutlineKey className="text-xl" />
											Settings
										</NavLink>
									</li>
									<NavLink
										to="#"
										className={`text-xs group relative flex items-center gap-2.5 rounded-sm py-2.5 px-7.5 text-gray-300 font-montserrat duration-300 ease-in-out hover:bg-black dark:hover:bg-black`}
										onClick={() => logout()}
									>
										<CiLogout className="text-xl" />
										Sign out
									</NavLink>
								</ul>
							</>
						}
					</div>
				</nav>
			</div>
		</aside>
	);
}
