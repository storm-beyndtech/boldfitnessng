import GymGoons from "../assets/gym-goons.svg";
import { baseImageUrl } from "../util/utils";

export default function Affiliates() {
	return (
		<section
			id="affiliates"
			style={{ backgroundImage: `url(${baseImageUrl}affiliates-bg.svg?alt=media)` }}
			className="w-full bg-cover bg-center"
		>
			<div className="max-ctn flex flex-col items-center py-20">
				<div className="flex flex-col max-sm:gap-5 mx-auto">
					<h1 className="text-5xl font-poppins sm:text-[150px] font-extrabold text-center text-[#8C62FF]">
						MEET OUR
					</h1>
					<h1 className="text-5xl font-poppins sm:text-[130px] font-black text-center text-brandBlue2 -mt-10">
						AFFILIATES
					</h1>
				</div>

				<img className="" src={GymGoons} alt="GymGoons" />
			</div>
		</section>
	);
}