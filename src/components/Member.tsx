import Btn from "./UI/Btn";
import ArmSticker from "../assets/arm-sticker.svg?react";
import { Link } from "react-router-dom";
import { baseImageUrl } from "../util/utils";

export default function Member() {
	return (
		<section
			className="max-ctn flex flex-col-reverse md:grid md:grid-cols-2 md:items-center gap-20 xl:gap-32 py-[100px] sm:pb-10"
			id="become-a-member"
		>
			<div className="w-full max-w-[500px] flex flex-col gap-9">
				<h2 className="text-3xl sm:text-5xl font-semibold text-white relative">
					<span className="block">Become</span>{" "}
					<span className="block mt-4">
						A <span className="text-brandBlue1"> Member </span>
					</span>
					<ArmSticker className="absolute top-8 right-15 max-sm:top-5" />
				</h2>
				<p className="text-[#D0D5DC]/50 leading-8">
					Step into a world where the beat of determination meets the rhythm of wellness. Imagine a future
					where every heartbeat is a step towards a healthier, more vibrant life. Welcome to Bold Fitness NG,
					where we&apos;ve set our sights on a grand mission: to ignite a fitness revolution that dances through
					the heart of Nigeria, inspiring a nation to embrace the vitality of life itself.
				</p>

				<Link to="/register">
					<Btn type="primary" label="Become A Member" />
				</Link>
			</div>
			<img
				className="max-w-[630px] w-full"
				src={`${baseImageUrl}cable-crunch.svg?alt=media`}
				alt="Cable Crunch"
			/>
		</section>
	);
}
