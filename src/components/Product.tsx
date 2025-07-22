import Btn from "./UI/Btn";
import ArmSticker from "../assets/arm-sticker.svg?react";
import { baseImageUrl } from "../util/utils";
import { Link } from "react-router-dom";

export default function Product() {
	return (
		<section
			className="max-ctn flex flex-col-reverse md:grid md:grid-cols-2 md:items-center gap-20 xl:gap-32 py-[100px] sm:pb-40"
			id="products"
		>
			<img
				className="max-w-[630px] w-full rounded-[30px] overflow-hidden"
				src={`${baseImageUrl}products.svg?alt=media`}
				alt="Products and Supplements"
			/>
			<div className="w-full max-w-[500px] flex flex-col gap-9">
				<h2 className="text-3xl sm:text-5xl font-bold dark:text-white text-black relative">
					<span className="block darktext-brandBlue1">Gym</span>
					<span className="block my-2">Products &</span>
					<span className="darktext-brandBlue1 block">Supplements</span>
					<ArmSticker className="absolute top-8 right-15 max-sm:top-5" />
				</h2>
				<p className="text-desc leading-8">
					Unlock your full potential with premium gym products and supplements. Whether it&apos;s top-tier
					gear or performance-enhancing nutrition, we&apos;ve got everything you need to crush your goals,
					recover faster, and feel unstoppable. Elevate your grind—every rep, every day.
				</p>

				<Link to="/contact">
					<Btn type="primary" label="Contact Us" />
				</Link>
			</div>
		</section>
	);
}
