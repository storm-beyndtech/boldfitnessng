"use client";
import React, { useRef } from "react";
import { programs } from "../utils/utils";
import LongArrow from "../assets/Long-Arrow.svg";
import LongArrow2 from "../assets/Long-Arrow-2.svg";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaArrowLeftLong } from "react-icons/fa6";

export default function Programs() {
	const slideSectionWrapperRef = useRef<HTMLDivElement>(null);

	// Function to slide back (scroll to the left)
	const handleSlideBack = () => {
		if (slideSectionWrapperRef.current) {
			slideSectionWrapperRef.current.scrollBy({
				left: -300, // Adjust this value depending on your card width
				behavior: "smooth", // Smooth scrolling
			});
		}
	};

	// Function to slide forward (scroll to the right)
	const handleSlideFront = () => {
		if (slideSectionWrapperRef.current) {
			slideSectionWrapperRef.current.scrollBy({
				left: 300, // Adjust this value depending on your card width
				behavior: "smooth", // Smooth scrolling
			});
		}
	};

	return (
		<section className="py-20">
			<div className="max-ctn flex items-end justify-between pb-15">
				<h2 className="text-3xl sm:text-5xl font-semibold text-white relative">
					<span className="block">Explore</span>{" "}
					<span className="block mt-4">
						<span className="text-brandBlue1"> Our </span> Program
					</span>
					<LongArrow className="absolute top-5 right-0 max-sm:top-2 max-sm:hidden" />
					<LongArrow2 className="absolute top-5 right-0 max-sm:top-2 sm:hidden" />
				</h2>

				{/* Slide controls */}
				<div className="flex justify-end mt-6 space-x-4 pr-3 max-sm:hidden">
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
				className="w-full flex gap-6 overflow-x-scroll no-scrollbar pl-4 my-5 sm:pl-7"
				ref={slideSectionWrapperRef} // Reference to the wrapper
			>
				{programs.map((program, i) => (
					<div
						key={i}
						className="w-[465px] max-sm:w-[400px] p-7.5 rounded-[20px] bg-[#000936]/10 flex flex-col justify-between gap-7.5 flex-shrink-0 border-[2px] border-[#000936]/10 hover:border-brandBlue1"
					>
						<div className="flex justify-between">
							<div className="grid">
								<h3 className="text-[#D0D5DC] font-medium text-lg leading-[2]">{program.title}</h3>
								<h3 className="text-[#D0D5DC] font-medium text-lg leading-[0]">{program.titleLine2}</h3>
							</div>
							<div className="w-15 h-15 grid place-content-center rounded-2xl bg-brandBlue3/5">
								<program.icon className="text-brandBlue3 text-2xl" />
							</div>
						</div>
						<p className="text-sm font-medium text-[#D0D5DC]/50 leading-7">{program.desc}</p>
					</div>
				))}
			</div>

			{/* Slide controls */}
			<div className="flex justify-start mt-10 space-x-4 pr-3 sm:hidden ml-4">
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
		</section>
	);
}
