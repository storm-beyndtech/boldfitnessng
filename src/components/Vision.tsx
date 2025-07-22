import Btn from "./UI/Btn";
import ArmSticker from "../assets/arm-sticker.svg?react";
import { Link } from "react-router-dom";
import { baseImageUrl } from "../util/utils";

export default function Vision() {
	return (
		<section
			className="max-ctn flex flex-col-reverse md:grid md:grid-cols-2 md:items-center gap-20 xl:gap-32 py-[100px] sm:pb-40"
			id="vision"
		>
			<div className="w-full max-w-[500px] flex flex-col gap-9">
				<h2 className="text-3xl sm:text-5xl font-bold dark:text-white text-black relative">
					<span className="block">Mission</span>{" "}
					<span className="block">
						<span className="dark:text-brandBlue1">& Vision </span>
					</span>
					<ArmSticker className="absolute top-8 right-15 max-sm:top-5" />
				</h2>
				<p className="text-desc leading-8">
					<span className="text-black dark:text-[#D0D5DC]">Picture this: </span>a state-of-the-art fitness
					haven where modern equipment meets expert guidance. Our commitment is to be the unrivalled fitness
					sanctuary in Nigeria, offering not just access to cutting-edge facilities but a personalized journey
					towards your fitness zenith.
				</p>

				<Link to="/register">
					<Btn type="primary" label="Become A Member" />
				</Link>
			</div>
			<img
				className="max-w-[630px] w-full rounded-[30px] overflow-hidden"
				src={`${baseImageUrl}swimming.svg?alt=media`}
				alt="Swimming"
			/>
		</section>
	);
}
