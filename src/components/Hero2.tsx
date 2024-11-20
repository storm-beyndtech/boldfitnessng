import { Link } from "react-router-dom";

type heroProps = {
	title: string;
	subtitle: string;
};

interface IHeroProps {
	data: heroProps;
}

export default function Hero2({ data }: IHeroProps) {
	return (
		<section className="bg-bg">
			<div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-30 relative z-10">
				<div className="flex justify-center">
					<Link
						className="inline-flex items-center gap-x-2 border text-sm p-1 ps-3 rounded-full transition hover:border-gray-600 bg-gray-800 border-gray-700 text-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-600"
						to="/register"
					>
						Join the community
						<span className="py-1.5 px-2.5 inline-flex justify-center items-center gap-x-2 rounded-full font-semibold text-sm text-gray-400 bg-gray-700">
							<svg
								className="flex-shrink-0 w-4 h-4"
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<path d="m9 18 6-6-6-6" />
							</svg>
						</span>
					</Link>
				</div>

				<div className="mt-5 max-w-2xl text-center mx-auto">
					<h1 className="block font-bold text-4xl md:text-5xl lg:text-6xl text-gray-200">{data.title} </h1>
				</div>

				<div className="mt-5 max-w-3xl text-center mx-auto">
					<p className="text-lg text-gray-400">{data.subtitle}</p>
				</div>
			</div>
		</section>
	);
}
