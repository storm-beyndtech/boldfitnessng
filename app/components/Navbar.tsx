"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { CgMenuRight, CgClose } from "react-icons/cg";
import Image from "next/image";
import { baseImageUrl } from "../utils/utils";
import Btn from "./UI/Btn";

const links = ["program", "pricing", "affiliates", "products"];

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);

	const handleNavbg = () => {
		const nav = document.getElementById("navBar");
		if (nav) {
			if (window.scrollY >= 150) {
				nav.style.position = "fixed";
				nav.style.backdropFilter = "blur(10px)";
			} else {
				nav.style.position = "absolute";
				nav.style.backdropFilter = "none";
			}
		}
	};

	useEffect(() => {
		window.addEventListener("scroll", handleNavbg);
	}, []);

	return (
		<nav className="py-5 absolute w-full top-0 left-0 z-40" id="navBar">
			<div className="max-ctn">
				<div className="flex items-center justify-between">
					<div className="w-full flex items-center justify-between">
						<div className="flex-shrink-0">
							<Link href="/" className="text-white font-bold text-xl">
								<Image
									src={`${baseImageUrl}bold-fitness-logo.svg?alt=media`}
									alt="logo"
									className="w-auto h-10"
									width={100}
									height={40}
								/>
							</Link>
						</div>
						<div className="hidden md:block">
							<div className="flex items-baseline space-x-4">
								{links.map((link, i) => (
									<Link key={i} href={`/#${link}`} className="navLink">
										{link}
									</Link>
								))}
								<Link href="/register">
									<Btn type="primary" label="Become A Member" btnAction="button" />
								</Link>
							</div>
						</div>
					</div>

					<div className="md:hidden flex gap-3">
						<Link href="/register">
							<Btn type="primary" label="Register" btnAction="button" />
						</Link>
						<button onClick={() => setIsOpen(!isOpen)} className="menuCtrOutline">
							{!isOpen ? <CgMenuRight className="block h-6 w-6" /> : <CgClose className="block h-6 w-6" />}
						</button>
					</div>
				</div>
			</div>

			{isOpen && (
				<div className="absolute top-0 left-0 w-full max-w-[270px] h-screen py-20 md:hidden bg-bg/70 backdrop-blur-lg">
					<div className="px-2 py-14 space-y-2 sm:px-3">
						<div className="flex flex-col items-baseline gap-10">
							{links.map((link, i) => (
								<Link key={i} href={`/#${link}`} className="navLink">
									{link}
								</Link>
							))}
						</div>
					</div>
				</div>
			)}
		</nav>
	);
};

export default Navbar;
