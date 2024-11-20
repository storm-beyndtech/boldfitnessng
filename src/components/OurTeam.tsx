import { useEffect, useRef, useState, useCallback } from "react";
import { baseImageUrl } from "../util/utils";
import Btn from "./UI/Btn";

export default function OurTeam() {
	const slideSectionWrapperRef = useRef<HTMLDivElement>(null);
	const [canScrollLeft, setCanScrollLeft] = useState(false);
	const [canScrollRight, setCanScrollRight] = useState(true);

	// Memoize the update function
	const updateScrollButtons = useCallback(() => {
		if (slideSectionWrapperRef.current) {
			const { scrollLeft, scrollWidth, clientWidth } = slideSectionWrapperRef.current;
			setCanScrollLeft(scrollLeft > 10); // Small threshold for better UX
			setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
		}
	}, []);

	useEffect(() => {
		const current = slideSectionWrapperRef.current;
		if (current) {
			// Add resize observer to handle window resizing
			const resizeObserver = new ResizeObserver(updateScrollButtons);
			resizeObserver.observe(current);

			// Add scroll listener
			current.addEventListener("scroll", updateScrollButtons);

			// Initial check
			updateScrollButtons();

			return () => {
				current.removeEventListener("scroll", updateScrollButtons);
				resizeObserver.disconnect();
			};
		}
	}, [updateScrollButtons]);

	const getScrollAmount = useCallback(() => {
		if (!slideSectionWrapperRef.current) return 0;

		const isMobile = window.innerWidth < 640;
		const cardWidth = isMobile ? window.innerWidth - 48 : 483; // Account for padding
		const gap = isMobile ? 24 : 40; // sm:gap-10 = 40px

		// Calculate visible cards (slides per view)
		const containerWidth = slideSectionWrapperRef.current.clientWidth;
		const cardsPerView = Math.floor(containerWidth / (cardWidth + gap)) || 1; // Ensure at least 1 card

		// Scroll by the width of one full view of cards
		return (cardWidth + gap) * cardsPerView;
	}, []);

	const handleSlideBack = useCallback(() => {
		if (!slideSectionWrapperRef.current || !canScrollLeft) return;

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
	}, [canScrollLeft, getScrollAmount]);

	const handleSlideFront = useCallback(() => {
		if (!slideSectionWrapperRef.current || !canScrollRight) return;

		const scrollAmount = getScrollAmount();
		const currentScroll = slideSectionWrapperRef.current.scrollLeft;
		const maxScroll = slideSectionWrapperRef.current.scrollWidth - slideSectionWrapperRef.current.clientWidth;

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
	}, [canScrollRight, getScrollAmount]);



	return (
		<section className="py-20">
			<div className="max-ctn flex flex-col max-sm:flex-col-reverse items-center gap-10 pb-20 max-sm:pb-10">
				<h2 className="text-5xl font-poppins sm:text-[150px] font-semibold text-center text-white/5 select-none">
					Our Team
				</h2>

				{/* Slide controls */}
				<div className="flex justify-end space-x-4 pr-3">
					<Btn type="small" direction="left" onClick={handleSlideBack} enabled={canScrollLeft} />
					<Btn type="small" direction="right" onClick={handleSlideFront} enabled={canScrollRight} />
				</div>
			</div>

			{/* Wrapper with scroll */}
			<div
        className={`w-full flex sm:gap-10 overflow-x-scroll no-scrollbar my-5 sm:pl-7
          scroll-smooth transition-all duration-300 ease-in-out`}
				ref={slideSectionWrapperRef}
			>
				{[1, 2, 1, 2].map((_, i) => (
					<div key={i} className="relative w-full max-w-[483px] flex-shrink-0 px-3 group">
						<img
							className="w-full h-auto object-cover transition-transform duration-300
                group-hover:scale-[1.02]"
							src={`${baseImageUrl}team-member-${_}.svg?alt=media`}
							alt={`BoldFitnessNG Coach ${i + 1}`}
							loading="lazy"
						/>
					</div>
				))}
			</div>
		</section>
	);
}
