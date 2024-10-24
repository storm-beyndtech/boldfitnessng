import Link from "next/link";
import Btn from "./UI/Btn";
import { baseImageUrl } from "../utils/utils";
import Image from "next/image";
import ArmSticker from "../assets/arm-sticker.svg";

export default function Vision() {
	return (
		<section
			className="max-ctn flex flex-col-reverse md:grid md:grid-cols-2 md:items-center gap-20 xl:gap-32 py-[100px] sm:pb-40"
			id="vision"
		>
			<div className="w-full max-w-[500px] flex flex-col gap-9">
				<h2 className="text-3xl sm:text-5xl font-semibold text-white relative">
					<span className="block">Mission</span>{" "}
					<span className="block mt-4">
						<span className="text-brandBlue1">& Vision </span>
					</span>
					<ArmSticker className="absolute top-8 right-15 max-sm:top-5" />
				</h2>
				<p className="text-[#D0D5DC]/50 leading-8">
					<span className="text-[#D0D5DC]">Picture this: </span>a state-of-the-art fitness haven where modern
					equipment meets expert guidance. Our commitment is to be the unrivalled fitness sanctuary in
					Nigeria, offering not just access to cutting-edge facilities but a personalized journey towards your
					fitness zenith.
				</p>

				<Link href="/register">
					<Btn type="primary" label="Become A Member" />
				</Link>
			</div>
			<Image
				className="max-w-[630px] w-full"
				src={`${baseImageUrl}swimming.svg?alt=media`}
				width={630}
				height={500}
				alt="Swimming"
			/>
		</section>
	);
}
