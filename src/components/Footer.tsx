import Thread from "../assets/thread.svg?react";
import Email from "../assets/email.svg?react";
import IG from "../assets/ig.svg?react";
import { Link } from "react-router-dom";
import { baseImageUrl } from "../util/utils";

export interface MenuGroup {
	name: string;
	href: string;
}

const aboutLinks = [
	{ name: "Company", href: "#" },
	{ name: "Fitness Locations", href: "#" },
	{ name: "Terms & Condition", href: "#" },
	{ name: "Privacy Policy", href: "#" },
];

const otherLinks = [
	{ name: "Program & Exercises", href: "#" },
	{ name: "Become a Member", href: "#" },
	{ name: "Affiliates", href: "#affiliates" },
	{ name: "Pricing", href: "#" },
];

export default function Footer() {
	return (
		<section className="bg-transparent/40 text-white">
			<div className="flex w-full flex-col gap-10 pt-20 max-ctn">
				<div className="w-full flex grow flex-row flex-wrap gap-5 justify-between lg:flex-nowrap lg:items-start leading-[27.2px] max-sm:gap-y-12">
					{/*Company Logo */}
					<div className="max-w-[200px] flex flex-col gap-3">
						<Link to="/">
							<img
								src={`${baseImageUrl}bold-fitness-logo.svg?alt=media`}
								alt="logo"
								className="w-auto h-18 -ml-2"
							/>
						</Link>

						<p className="text-[#D0D5DC]/50 text-sm hover:text-brandBlue2 leading-8">
							Bold Fitness NG, KM 4 Poly Nekede Rd, 460114, Owerri, Imo, Owerri
						</p>
					</div>

					{/*About  Links */}
					<div className="w-full max-w-fit flex flex-col gap-3">
						<h2 className="font-montserrat font-medium text-base mb-5">About Us</h2>

						{aboutLinks.map((link) => (
							<Link to={link.href} key={link.name} className="text-[#D0D5DC]/50 text-sm hover:text-brandBlue2 leading-8">
								{link.name}
							</Link>
						))}
					</div>

					{/* Other Links */}
					<div className="w-full max-w-fit flex flex-col gap-3">
						<h2 className="font-montserrat font-medium text-base mb-5">Useful Links</h2>

						{otherLinks.map((link) => (
							<Link to={link.href} key={link.name} className="text-[#D0D5DC]/50 text-sm hover:text-brandBlue2 leading-8">
								{link.name}
							</Link>
						))}
					</div>

					{/* CONTACT */}
					<div className="w-full max-w-fit flex flex-col gap-3">
						<h2 className="font-montserrat font-medium text-base mb-5">Reach Out to Us</h2>
						<a href="#" className="text-[#D0D5DC]/50 text-sm hover:text-brandBlue2">
							+234-814-925-4910
						</a>

						<div className="flex items-center gap-3 mt-2">
							<a className="">
								<Thread />
							</a>
							<a className="">
								<Email />
							</a>
							<a className="">
								<IG />
							</a>
						</div>
					</div>
				</div>

				<p className="text-[#D0D5DC]/30 text-center pb-10 max-sm:text-xs mt-20">
					2024 © All rights reserved, Bold Fitness NG
				</p>
			</div>
		</section>
	);
}
