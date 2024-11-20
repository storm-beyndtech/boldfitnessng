import { baseImageUrl } from "../util/utils";

const Hero = () => {
	return (
		<div className="w-full relative h-[70vh] sm:h-screen flex items-center justify-center">
			<img
				src={`${baseImageUrl}heroBg.svg?alt=media`}
				alt="Hero background"
				className="w-full h-full absolute top-0 left-0 object-top object-cover"
			/>
			<div className="max-ctn relative z-10 text-center px-4 sm:px-6 lg:px-8">
				<h1 className="font-michroma mb-6 text-3xl sm:text-4xl md:text-5xl tracking-[0.375em] text-white">
					<span className="title-stroke">U</span>
					<span className="title-stroke text-[0.85em]">N</span>
					<span className="title-stroke text-[0.7em]">LEA</span>
					<span className="title-stroke text-[0.85em]">S</span>
					<span className="title-stroke">H</span>
				</h1>

				<h1 className="heroTitle2">YOUR CHAKRA</h1>
				<h1 className="heroTitle2 opacity-[0.06] -mt-10">YOUR CHAKRA</h1>
				<h1 className="heroTitle2 opacity-[0.02] -mt-10">YOUR CHAKRA</h1>
			</div>

			<div className="w-24 sm:w-30 rounded-xl overflow-hidden absolute top-[30%] right-[20%] z-20 backdrop-blur-lg">
				<img
					src={`${baseImageUrl}floatDesc-1.svg?alt=media`}
					alt="desc"
					className="w-full"
				/>
			</div>

			<div className="w-20 rounded-xl overflow-hidden sm:w-30 absolute bottom-[30%] left-[15%] z-20 backdrop-blur-lg">
				<img
					src={`${baseImageUrl}floatDesc-2.svg?alt=media`}
					alt="desc"
					className="w-full"
				/>
			</div>

			<div className="w-20 rounded-xl overflow-hidden sm:w-30 absolute bottom-[10%] right-[30%] z-20 backdrop-blur-lg">
				<img
					src={`${baseImageUrl}floatDesc-3.svg?alt=media`}
					alt="desc"
					className="w-full"
				/>
			</div>
		</div>
	);
};

export default Hero;
