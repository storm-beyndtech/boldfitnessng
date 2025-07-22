import Btn from "./UI/Btn";
import ArmSticker from "../assets/arm-sticker.svg?react";
import { Link } from "react-router-dom";
import { baseImageUrl } from "../util/utils";

export default function Member() {
	return (
		<section
			className="max-ctn flex flex-col md:grid md:grid-cols-2 md:items-center gap-20 xl:gap-32 py-[100px]"
			id="become-a-member"
		>
			<img
				className="max-w-[630px] w-full rounded-[30px] overflow-hidden"
				src={`${baseImageUrl}cable-crunch.svg?alt=media`}
				alt="Cable Crunch"
			/>

			<div className="w-full max-w-[500px] flex flex-col gap-9">
				<h2 className="text-3xl sm:text-5xl font-bold text-black dark:text-white relative">
					<span className="block">Become</span>{" "}
					<span className="block">
						A <span className="dark:text-brandBlue1 text-black"> Member </span>
					</span>
					<ArmSticker className="absolute top-8 right-15 max-sm:top-5" />
				</h2>
				<p className="text-desc leading-8">
					Step into a world where the beat of determination meets the rhythm of wellness. Imagine a future
					where every heartbeat is a step towards a healthier, more vibrant life. Welcome to Bold Fitness NG,
					where we&apos;ve set our sights on a grand mission: to ignite a fitness revolution that dances
					through the heart of Nigeria, inspiring a nation to embrace the vitality of life itself.
				</p>

				<Link to="/register">
					<Btn type="primary" label="Become A Member" />
				</Link>
			</div>
		</section>
	);
}
