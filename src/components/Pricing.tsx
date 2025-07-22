import { useEffect, useRef, useState } from "react";
import { TbSquareRoundedCheck } from "react-icons/tb";
import Btn from "./UI/Btn";
import { Link } from "react-router-dom";
import { Plan } from "../types/types";
import { PAYMENT_PLANS } from "../util/utils";

// Define UtilsResponse type
interface UtilsResponse {
	utils: Array<{ plans: Array<Plan> }>;
	message?: string;
}

// Format price to K format (e.g., 19K, 51K, 183K)
const formatPrice = (price: number): number => {
	return price / 1000;
};

export default function Pricing() {
	const slideSectionWrapperRef = useRef<HTMLDivElement>(null);
	const [canScrollLeft, setCanScrollLeft] = useState(false);
	const [canScrollRight, setCanScrollRight] = useState(false);

	// Add state for plans and loading
	const [plans, setPlans] = useState<Plan[]>(PAYMENT_PLANS);
	const [loading, setLoading] = useState(true);
	const [isOverflowing, setIsOverflowing] = useState(false);

	const url = import.meta.env.VITE_REACT_APP_SERVER_URL;

	const getScrollAmount = () => {
		// Card width (300px) + gap (40px on desktop, 20px on mobile)
		return window.innerWidth < 640 ? 320 : 340;
	};

	const checkOverflow = () => {
		if (slideSectionWrapperRef.current) {
			const { scrollWidth, clientWidth } = slideSectionWrapperRef.current;
			const hasOverflow = scrollWidth > clientWidth;
			setIsOverflowing(hasOverflow);
			setCanScrollRight(hasOverflow);
		}
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
			window.addEventListener("resize", () => {
				updateScrollButtons();
				checkOverflow();
			});

			// Initial check
			updateScrollButtons();
			checkOverflow();

			return () => {
				current.removeEventListener("scroll", updateScrollButtons);
				window.removeEventListener("resize", checkOverflow);
			};
		}
	}, []);

	// Check overflow when plans change
	useEffect(() => {
		checkOverflow();
	}, [plans]);

	// Effect to fetch plans when component mounts
	useEffect(() => {
		fetchUtils();
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

	// Fetch Pricing
	const fetchUtils = async (): Promise<void> => {
		try {
			setLoading(true);
			const res = await fetch(`${url}/utils`);
			const data = (await res.json()) as UtilsResponse;

			if (res.ok && data.utils && data.utils[0] && data.utils[0].plans) {
				const retrievedPlans = data.utils[0].plans.map((plan) => ({
					...plan,
					features: Array.isArray(plan.features) ? plan.features : [],
				}));
				setPlans(retrievedPlans);
			} else {
				console.warn(data.message || "Failed to fetch plans");
			}
		} catch (error) {
			console.error("Error fetching plans:", error instanceof Error ? error.message : String(error));
		} finally {
			setLoading(false);
		}
	};

	return (
		<section className="py-20" id="pricing">
			<div className="max-ctn flex flex-col items-center gap-10 py-20 max-sm:pb-10">
				<h2 className="text-5xl sm:text-[140px] font-bold dark:font-semibold text-center text-[#16161C] dark:text-gray-50">
					Pricing
				</h2>

				{/* Desktop pagination buttons - only show if plans overflow */}
				{isOverflowing && !loading && (
					<div className="hidden md:flex justify-center space-x-4 mb-4">
						<Btn type="small" direction="left" onClick={handleSlideBack} enabled={canScrollLeft} />
						<Btn type="small" direction="right" onClick={handleSlideFront} enabled={canScrollRight} />
					</div>
				)}

				{/* Mobile pagination buttons */}
				<div className="flex md:hidden justify-end space-x-4 pr-3 w-full">
					<Btn type="small" direction="left" onClick={handleSlideBack} enabled={canScrollLeft} />
					<Btn type="small" direction="right" onClick={handleSlideFront} enabled={canScrollRight} />
				</div>
			</div>

			{/* Loading indicator */}
			{loading && (
				<div className="flex justify-center items-center py-4">
					<div className="animate-pulse text-brandBlue1">Loading plans...</div>
				</div>
			)}

			<div className="max-w-full md:max-w-[1400px] mx-auto px-4 relative">
				{/* Wrapper with scroll */}
				<div
					className="w-full flex justify-center gap-5 sm:gap-10 overflow-x-auto
            no-scrollbar scroll-smooth my-5 max-sm:pl-4"
					ref={slideSectionWrapperRef}
				>
					{plans.map((plan, i) => (
						<div
							key={i}
							className={`w-[300px] flex-shrink-0 px-7 py-12 rounded-[20px]
                flex flex-col gap-7 border-[1px] ${
									i === 1 ? "border-brandBlue1" : "border-gray-500/10 dark:border-gray-600/10"
								} 
                hover:border-brandBlue1 transition-colors duration-200 ease-in-out
                ${loading ? "opacity-70" : ""}`}
						>
							<div className="flex justify-between items-center">
								<h2 className="text-5xl text-bodydark1/80 dark:text-white font-semibold font-poppins">
									₦{formatPrice(plan.price)}
									<span className="text-brandBlue3 text-[0.5em] font-semibold">K</span>
								</h2>

								<h2 className="text-desc font-semibold text-lg text-right">
									{plan.name} <span className="text-brandBlue1 block">Plan</span>
								</h2>
							</div>

							<Link
								to="/register"
								className="w-full py-3 rounded-xl border border-brandBlue3 text-brandBlue3 tracking-wide text-center font-medium hover:bg-brandBlue1/5 transition-colors"
							>
								Register
							</Link>

							<div className="w-full flex flex-col gap-5 pt-15">
								{plan.features.map((feature, j) => (
									<div key={j} className="flex items-center justify-start gap-3">
										<TbSquareRoundedCheck className="text-lg text-brandBlue1 flex-shrink-0" />
										<p className="text-base font-sans font-normal text-desc">{feature}</p>
									</div>
								))}
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
