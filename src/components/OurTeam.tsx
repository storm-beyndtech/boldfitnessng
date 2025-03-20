import { useEffect, useRef, useState, useCallback } from "react";
import Btn from "./UI/Btn";
import team1 from "../assets/team-member-1.svg";
import team2 from "../assets/team-member-2.svg";
import team3 from "../assets/team-member-3.svg";

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
		<section className="my-20 mb-0 bg-black dark:bg-transparent">
			<div className="bg-blue-50 dark:bg-transparent flex flex-col max-sm:flex-col-reverse items-center gap-5 pb-10 max-sm:pb-10">
				<h2 className="text-5xl font-poppins sm:text-[150px] font-semibold text-center text-[#16161c] select-none">
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
				className={`w-full max-w-fit mx-auto flex sm:gap-10 overflow-x-scroll no-scrollbar py-30 sm:pl-7`}
				ref={slideSectionWrapperRef}
			>
				{[team1, team2, team3].map((_, i) => (
					<div key={i} className="relative w-full max-w-[460px] flex-shrink-0 px-3 group">
						<img
							className="w-full h-auto object-cover transition-transform duration-300
                group-hover:scale-[1.02]"
							src={_}
							alt={`BoldFitnessNG Coach ${i + 1}`}
						/>
					</div>
				))}
			</div>
		</section>
	);
}
