import { useEffect, useRef, useState } from "react";
import LongArrow from "../assets/Long-Arrow.svg?react";
import LongArrow2 from "../assets/Long-Arrow-2.svg?react";
import { programs } from "../util/utils";
import Btn from "./UI/Btn";

export default function Programs() {
	const slideSectionWrapperRef = useRef<HTMLDivElement>(null);
	const [canScrollLeft, setCanScrollLeft] = useState(false);
	const [canScrollRight, setCanScrollRight] = useState(true);

	const updateScrollButtons = () => {
		if (slideSectionWrapperRef.current) {
			const { scrollLeft, scrollWidth, clientWidth } = slideSectionWrapperRef.current;
			setCanScrollLeft(scrollLeft > 0);
			setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10); // 10px threshold
		}
	};

	useEffect(() => {
		const current = slideSectionWrapperRef.current;
		if (current) {
			current.addEventListener("scroll", updateScrollButtons);
			// Initial check
			updateScrollButtons();
			return () => current.removeEventListener("scroll", updateScrollButtons);
		}
	}, []);

	const getScrollAmount = () => {
		const isMobile = window.innerWidth < 640;
		const cardWidth = isMobile ? 400 : 465;
		const gap = 24;
		return cardWidth + gap;
	};

	const handleSlideBack = () => {
		if (slideSectionWrapperRef.current) {
			const scrollAmount = getScrollAmount();
			const currentScroll = slideSectionWrapperRef.current.scrollLeft;

			// If at the start, scroll to the beginning smoothly
			if (currentScroll < scrollAmount) {
				slideSectionWrapperRef.current.scrollTo({
					left: 0,
				});
			} else {
				slideSectionWrapperRef.current.scrollBy({
					left: -scrollAmount,
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

			// If near the end, scroll to the end smoothly
			if (currentScroll + scrollAmount > maxScroll) {
				slideSectionWrapperRef.current.scrollTo({
					left: maxScroll,
				});
			} else {
				slideSectionWrapperRef.current.scrollBy({
					left: scrollAmount,
				});
			}
		}
	};

	return (
		<section className="py-20 bg-white dark:bg-transparent" id="program">
			<div className="max-ctn flex items-end justify-between pb-15">
				<h2 className="text-3xl sm:text-5xl font-semibold text-black dark:text-white relative">
					<span className="block">Explore</span>{" "}
					<span className="block">
						<span className="dark:text-brandBlue1 text-black"> Our </span> Program
					</span>
					<LongArrow className="absolute top-5 right-0 max-sm:top-2 max-sm:hidden" />
					<LongArrow2 className="absolute top-5 right-0 max-sm:top-2 sm:hidden" />
				</h2>

				{/* Slide controls */}
				<div className="flex justify-end mt-6 space-x-4 pr-3 max-sm:hidden">
					<Btn type="small" direction="left" onClick={handleSlideBack} enabled={canScrollLeft} />
					<Btn type="small" direction="right" onClick={handleSlideFront} enabled={canScrollRight} />
				</div>
			</div>

			{/* Wrapper with scroll */}
			<div
				className="w-full flex gap-6 overflow-x-scroll no-scrollbar pl-4 my-5 sm:pl-7 transition-transform animate-duration-300 animate-ease-in-out"
				ref={slideSectionWrapperRef}
			>
				{programs.map((program, i) => (
					<div
						key={i}
						className="w-[450px] max-sm:w-[400px] p-7.5 rounded-[20px] bg-[#e8f3ff]/50 dark:bg-[#01020c] flex flex-col justify-between gap-7.5 flex-shrink-0 border-[2px] border-[#000936]/5 hover:border-brandBlue1"
					>
						<div className="flex justify-between">
							<div className="grid">
								<h3 className="text-black dark:text-[#D0D5DC] font-medium text-lg leading-[2]">
									{program.title}
								</h3>
								<h3 className="text-black dark:text-[#D0D5DC] font-medium text-lg leading-[0]">
									{program.titleLine2}
								</h3>
							</div>
							<div className="w-15 h-15 grid place-content-center rounded-2xl bg-brandBlue3/5">
								<program.icon className="text-brandBlue3 text-2xl" />
							</div>
						</div>
						<p className="text-sm font-medium text-desc leading-7">{program.desc}</p>
					</div>
				))}
			</div>

			{/* Slide controls */}
			<div className="flex justify-start mt-10 space-x-4 pr-3 sm:hidden ml-4">
				<Btn type="small" direction="left" onClick={handleSlideBack} enabled={canScrollLeft} />
				<Btn type="small" direction="right" onClick={handleSlideFront} enabled={canScrollRight} />
			</div>
		</section>
	);
}
