import { useEffect, useRef, useState } from "react";
import { TbSquareRoundedCheck } from "react-icons/tb";
import Btn from "./UI/Btn";

const keyPoints = [
	"3 Free Sessions Monthly",
	"Advanced Training Facilities",
	"Supplements & Products",
	"Access to Personal Training",
	"Network of Like-Minds",
	"Friendly Environment",
];

export default function Pricing() {
	const slideSectionWrapperRef = useRef<HTMLDivElement>(null);
	const [canScrollLeft, setCanScrollLeft] = useState(false);
	const [canScrollRight, setCanScrollRight] = useState(true);

	const getScrollAmount = () => {
		// Card width (320px) + gap (20px on mobile, 40px on desktop)
		return window.innerWidth < 640 ? 340 : 360;
	};

	const updateScrollButtons = () => {
		if (slideSectionWrapperRef.current) {
			const { scrollLeft, scrollWidth, clientWidth } = slideSectionWrapperRef.current;
			setCanScrollLeft(scrollLeft > 0);
			setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
		}
	};

	useEffect(() => {
		const current = slideSectionWrapperRef.current;
		if (current) {
			current.addEventListener("scroll", updateScrollButtons);
			// Update on resize to handle layout changes
			window.addEventListener("resize", updateScrollButtons);
			updateScrollButtons();

			return () => {
				current.removeEventListener("scroll", updateScrollButtons);
				window.removeEventListener("resize", updateScrollButtons);
			};
		}
	}, []);

	const handleSlideBack = () => {
		if (slideSectionWrapperRef.current) {
			const scrollAmount = getScrollAmount();
			const currentScroll = slideSectionWrapperRef.current.scrollLeft;

			if (currentScroll < scrollAmount) {
				slideSectionWrapperRef.current.scrollTo({
					left: 0,
					behavior: "smooth",
				});
			} else {
				slideSectionWrapperRef.current.scrollBy({
					left: -scrollAmount,
					behavior: "smooth",
				});
			}
		}
	};

	const handleSlideFront = () => {
		if (slideSectionWrapperRef.current) {
			const scrollAmount = getScrollAmount();
			const currentScroll = slideSectionWrapperRef.current.scrollLeft;
			const maxScroll =
				slideSectionWrapperRef.current.scrollWidth - slideSectionWrapperRef.current.clientWidth;

			if (currentScroll + scrollAmount > maxScroll) {
				slideSectionWrapperRef.current.scrollTo({
					left: maxScroll,
					behavior: "smooth",
				});
			} else {
				slideSectionWrapperRef.current.scrollBy({
					left: scrollAmount,
					behavior: "smooth",
				});
			}
		}
	};

	return (
		<section className="py-20 sm:pt-10" id="pricing">
			<div className="max-ctn flex flex-col max-sm:flex-col-reverse items-center gap-10 py-20 max-sm:pb-10">
				<h2 className="text-5xl font-poppins sm:text-[150px] font-semibold text-center text-[#16161C]">
					Pricing
				</h2>

				{/* Slide controls */}
				<div className="flex justify-end space-x-4 pr-3 sm:hidden">
					<Btn type="small" direction="left" onClick={handleSlideBack} enabled={canScrollLeft} />
					<Btn type="small" direction="right" onClick={handleSlideFront} enabled={canScrollRight} />
				</div>
			</div>

			{/* Wrapper with scroll */}
			<div
				className="w-full flex md:justify-center gap-5 sm:gap-10 overflow-x-scroll 
          no-scrollbar scroll-smooth my-5 max-sm:pl-4"
				ref={slideSectionWrapperRef}
			>
				{/* Card items */}
				{[
					{ price: 19, period: "Monthly" },
					{ price: 51, period: "Quarterly" },
					{ price: 183, period: "Annual" },
				].map(({ price, period }, i) => (
					<div
						key={i}
						className={`w-[100%] max-w-[300px] px-7 py-12 rounded-[20px]
              flex flex-col justify-between gap-7.5 flex-shrink-0 border-[1px] ${
								i === 1 ? "border-brandBlue1" : "border-gray-900/20"
							} 
              hover:border-brandBlue1 transition-colors duration-200 ease-in-out`}
					>
						<div className="flex justify-between items-center">
							<h2 className="text-5xl text-bodydark1/80 dark:text-white font-semibold font-sans">
								₦{price}
								<span className="text-brandBlue3 text-[0.5em] font-medium">K</span>
							</h2>

							<h2 className="text-desc font-semibold text-lg text-right">
								{period} <span className="text-brandBlue1 block">Plan</span>
							</h2>
						</div>
						<div className="w-full flex flex-col gap-7 pt-15">
							{keyPoints.map((point, i) => (
								<div key={i} className="flex items-center justify-start gap-5">
									<TbSquareRoundedCheck className="text-lg text-brandBlue1 flex-shrink-0" />
									<p className="text-base font-sans font-normal text-desc">{point}</p>
								</div>
							))}
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
