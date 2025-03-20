import { useEffect, useState } from "react";
import { CgMenuRight, CgClose } from "react-icons/cg";
import Btn from "./UI/Btn";
import logo from "../assets/bold-fitness-logo.svg";
import { Link } from "react-router-dom";
import DarkModeSwitcher from "./layout/DarkModeSwitcher";

const links = ["program", "pricing", "affiliates", "products"];

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);

	const handleNavbg = () => {
		const nav = document.getElementById("navBar");
		if (nav) {
			if (window.scrollY >= 80) {
				setScrolled(true);
			} else {
				setScrolled(false);
			}
		}
	};

	useEffect(() => {
		window.addEventListener("scroll", handleNavbg);
	}, []);

	return (
		<>
			<nav
				className={`${scrolled ? "bg-[#000208e2] customBlur" : ""} py-5 fixed w-full top-0 left-0 z-40`}
				id="navBar"
			>
				<div className="max-ctn max-sm:px-2">
					<div className="flex items-center justify-between">
						<div className="w-full flex items-center justify-between">
							<div className="flex-shrink-0">
								<Link to="/" className="text-white font-bold text-xl">
									<img src={logo} alt="logo" style={{ width: "auto", height: "40px" }} />
								</Link>
							</div>
							<div className="hidden md:block">
								<div className="flex items-baseline space-x-4">
									{links.map((link, i) => (
										<a key={i} href={`/#${link}`} className="navLink">
											{link}
										</a>
									))}
									<Link to="/contact" className="navLink">
										Contact Us
									</Link>

									<div className="my-auto">
										<DarkModeSwitcher />
									</div>

									<Link to="/register">
										<Btn type="primary" label="Become A Member" btnAction="button" nav />
									</Link>
								</div>
							</div>
						</div>

						<div className="md:hidden flex gap-3">
							<div className="my-auto">
								<DarkModeSwitcher />
							</div>
							<Link to="/register">
								<Btn type="primary" label="Register" btnAction="button" nav />
							</Link>
							<button onClick={() => setIsOpen(!isOpen)} className="menuCtrOutline">
								{!isOpen ? <CgMenuRight className="block h-6 w-6" /> : <CgClose className="block h-6 w-6" />}
							</button>
						</div>
					</div>
				</div>
			</nav>

			{isOpen && (
				<div className="fixed top-0 left-0 z-999999 w-full max-w-[270px] h-screen py-20 md:hidden bg-bg/95 customBlur">
					<div className="px-2 py-14 space-y-2 sm:px-3">
						<div className="flex flex-col items-baseline gap-10">
							{links.map((link, i) => (
								<a key={i} href={`/#${link}`} className="navLink">
									{link}
								</a>
							))}

							<Link to="/contact" className="navLink">
								Contact Us
							</Link>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default Navbar;
