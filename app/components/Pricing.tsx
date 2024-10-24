"use client";
import React, { useRef } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaArrowLeftLong } from "react-icons/fa6";
import { TbSquareRoundedCheck } from "react-icons/tb";

const keyPoints = [
	"Over 3 Free Training Sessions Monthly",
	"Access to Advanced Training Facilities",
	"Top-tier Fitness Supplements & Products",
	"Access to Personal Training",
	"Supportive Network of Like-Minds",
	"Friendly Environment",
];

export default function Pricing() {
	const slideSectionWrapperRef = useRef<HTMLDivElement>(null);

	// Function to slide back (scroll to the left)
	const handleSlideBack = () => {
		if (slideSectionWrapperRef.current) {

			slideSectionWrapperRef.current.scrollBy({
				left: -310, // Adjust this value depending on your card width
				behavior: "smooth", // Smooth scrolling
			});
		}
	};

	// Function to slide forward (scroll to the right)
	const handleSlideFront = () => {
		if (slideSectionWrapperRef.current) {

			slideSectionWrapperRef.current.scrollBy({
				left: 310, // Adjust this value depending on your card width
				behavior: "smooth", // Smooth scrolling
			});
		}
	};

	return (
		<section className="py-20 sm:pt-5" id="pricing">
			<div className="max-ctn flex flex-col max-sm:flex-col-reverse items-center gap-10 pb-20 max-sm:pb-10">
				<h2 className="text-5xl font-poppins sm:text-[150px] font-semibold text-center text-white/5">
					Pricing
				</h2>

				{/* Slide controls */}
				<div className="flex justify-end space-x-4 pr-3 sm:hidden">
					<button
						onClick={handleSlideBack}
						className="w-12 h-12 grid place-content-center rounded-xl bg-brandBlue3/5 text-brandBlue1/20 text-2xl hover:text-brandBlue1"
					>
						<FaArrowLeftLong />
					</button>
					<button
						onClick={handleSlideFront}
						className="w-12 h-12 grid place-content-center rounded-xl bg-brandBlue3/5 text-brandBlue1/20 text-2xl hover:text-brandBlue1"
					>
						<FaArrowRightLong />
					</button>
				</div>
			</div>

			{/* Wrapper with scroll */}
			<div
				className="w-full flex md:justify-center gap-5 sm:gap-10 overflow-x-scroll no-scrollbar my-5 max-sm:pl-4"
				ref={slideSectionWrapperRef} // Reference to the wrapper
			>
				<div className="w-[100%] max-w-[320px] px-7.5 py-12 rounded-[30px] bg-transparent/5 flex flex-col justify-between gap-7.5 flex-shrink-0 border-[2px] border-gray-900 hover:border-brandBlue1">
					<div className="flex justify-between items-center">
						<div className="w-fit grid place-content-center rounded-[40%] bg-gray-900/60 py-4 px-3">
							<h2 className="text-3xl font-semibold font-sans">
								<span className="text-brandBlue3 text-[0.35em] font-medium">₦</span>
								<span className="text-[#D0D5DC] mx-1">19</span>
								<span className="text-brandBlue3 text-[0.4em] font-medium">K</span>
							</h2>
						</div>
						<h2 className="text-[#D0D5DC] font-semibold text-lg text-right">
							Monthly <span className="text-brandBlue1 block mt-1">Plan</span>
						</h2>
					</div>
					<div className="w-full flex flex-col gap-7 pt-15">
						{keyPoints.map((point, i) => (
							<div key={i} className="flex items-center justify-start gap-5">
								<TbSquareRoundedCheck className="text-lg text-brandBlue1 flex-shrink-0" />
                <p className="text-xs font-sans font-normal text-[#D0D5DC]/50">{ point }</p>
							</div>
						))}
					</div>
        </div>
        

				<div className="w-[100%] max-w-[320px] px-7.5 py-12 rounded-[30px] bg-transparent/5 flex flex-col justify-between gap-7.5 flex-shrink-0 border-[2px] border-gray-900 hover:border-brandBlue1">
					<div className="flex justify-between items-center">
						<div className="w-fit grid place-content-center rounded-[40%] bg-gray-900/60 py-4 px-3">
							<h2 className="text-3xl font-semibold font-sans">
								<span className="text-brandBlue3 text-[0.35em] font-medium">₦</span>
								<span className="text-[#D0D5DC] mx-1">51</span>
								<span className="text-brandBlue3 text-[0.4em] font-medium">K</span>
							</h2>
						</div>
						<h2 className="text-[#D0D5DC] font-semibold text-lg text-right">
							Quarterly <span className="text-brandBlue1 block mt-1">Plan</span>
						</h2>
					</div>
					<div className="w-full flex flex-col gap-7 pt-15">
						{keyPoints.map((point, i) => (
							<div key={i} className="flex items-center justify-start gap-5">
								<TbSquareRoundedCheck className="text-lg text-brandBlue1 flex-shrink-0" />
                <p className="text-xs font-sans font-normal text-[#D0D5DC]/50">{ point }</p>
							</div>
						))}
					</div>
        </div>
        

				<div className="w-[100%] max-w-[320px] px-7.5 py-12 rounded-[30px] bg-transparent/5 flex flex-col justify-between gap-7.5 flex-shrink-0 border-[2px] border-gray-900 hover:border-brandBlue1">
					<div className="flex justify-between items-center">
						<div className="w-fit grid place-content-center rounded-[40%] bg-gray-900/60 py-4 px-3">
							<h2 className="text-3xl font-semibold font-sans">
								<span className="text-brandBlue3 text-[0.35em] font-medium">₦</span>
								<span className="text-[#D0D5DC] mx-1">183</span>
								<span className="text-brandBlue3 text-[0.4em] font-medium">K</span>
							</h2>
						</div>
						<h2 className="text-[#D0D5DC] font-semibold text-lg text-right">
							Annual <span className="text-brandBlue1 block mt-1">Plan</span>
						</h2>
					</div>
					<div className="w-full flex flex-col gap-7 pt-15">
						{keyPoints.map((point, i) => (
							<div key={i} className="flex items-center justify-start gap-5">
								<TbSquareRoundedCheck className="text-lg text-brandBlue1 flex-shrink-0" />
                <p className="text-xs font-sans font-normal text-[#D0D5DC]/50">{ point }</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
