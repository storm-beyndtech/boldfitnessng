import { baseImageUrl } from "../util/utils";

const Hero = () => {
	return (
		<div className="w-full relative h-[70vh] sm:h-screen flex items-center justify-center">
			<img
				src={`${baseImageUrl}heroBg.svg?alt=media`}
				alt="Hero background"
				className="w-full h-full absolute top-0 left-0 object-top object-cover"
			/>
			<div className="max-ctn relative z-10 text-center px-4 sm:px-6 lg:px-8 pt-30">
				<h1 className="heroTitle">
					<span className="font-semibold">Be</span> BOLD<span className="text-brandBlue1 font-black">.</span>{" "}
					FIT
					<span className="text-brandBlue1 font-black">.</span>
				</h1>

				<h1 className="heroTitle2">UNSTOPPABLE</h1>
				<h1 className="heroTitle2 opacity-[0.06] -mt-10">UNSTOPPABLE</h1>
				<h1 className="heroTitle2 opacity-[0.02] -mt-10">UNSTOPPABLE</h1>
			</div>

			<div className="w-24 sm:w-30 rounded-xl overflow-hidden absolute top-[30%] right-[20%] z-20 backdrop-blur-lg">
				<img src={`${baseImageUrl}floatDesc-1.svg?alt=media`} alt="desc" className="w-full" />
			</div>

			<div className="w-20 rounded-xl overflow-hidden sm:w-30 absolute bottom-[25%] max-lg:bottom-[18%] left-[10%] z-20 backdrop-blur-lg">
				<img src={`${baseImageUrl}floatDesc-2.svg?alt=media`} alt="desc" className="w-full" />
			</div>

			<div className="w-20 rounded-xl overflow-hidden sm:w-30 absolute bottom-[10%] right-[30%] max-lg:right-[20%] z-20 backdrop-blur-lg">
				<img src={`${baseImageUrl}floatDesc-3.svg?alt=media`} alt="desc" className="w-full" />
			</div>
		</div>
	);
};

export default Hero;
