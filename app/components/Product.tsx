import Link from "next/link";
import Btn from "./UI/Btn";
import { baseImageUrl } from "../utils/utils";
import Image from "next/image";
import ArmSticker from "../assets/arm-sticker.svg";

export default function Product() {
	return (
		<section
			className="max-ctn flex flex-col-reverse md:grid md:grid-cols-2 md:items-center gap-20 xl:gap-32 py-[100px] sm:pb-40"
			id="products"
		>
			<Image
				className="max-w-[630px] w-full"
				src={`${baseImageUrl}products.svg?alt=media`}
				width={630}
				height={500}
				alt="Products and Supplements"
			/>
			<div className="w-full max-w-[500px] flex flex-col gap-9">
				<h2 className="text-3xl sm:text-5xl font-semibold text-white relative">
					<span className="block text-brandBlue1">Gym</span>
					<span className="block my-2">Products &</span>
					<span className="text-brandBlue1 block">Supplements</span>
					<ArmSticker className="absolute top-8 right-15 max-sm:top-5" />
				</h2>
				<p className="text-[#D0D5DC]/50 leading-8">
					Unlock your full potential with premium gym products and supplements. Whether it's top-tier gear or
					performance-enhancing nutrition, we've got everything you need to crush your goals, recover faster,
					and feel unstoppable. Elevate your grind—every rep, every day.
				</p>

				<Link href="/register">
					<Btn type="primary" label="Contact Us" />
				</Link>
			</div>
		</section>
	);
}
