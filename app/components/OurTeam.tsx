"use client";
import Image from "next/image";
import React, { useRef } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaArrowLeftLong } from "react-icons/fa6";
import { baseImageUrl } from "../utils/utils";

export default function OurTeam() {
	const slideSectionWrapperRef = useRef<HTMLDivElement>(null);

	// Function to slide back (scroll to the left)
	const handleSlideBack = () => {
		if (slideSectionWrapperRef.current) {
			const vwValue = window.innerWidth;

			slideSectionWrapperRef.current.scrollBy({
				left: -vwValue, // Adjust this value depending on your card width
				behavior: "smooth", // Smooth scrolling
			});
		}
	};

	// Function to slide forward (scroll to the right)
	const handleSlideFront = () => {
		if (slideSectionWrapperRef.current) {
			const vwValue = window.innerWidth;

			slideSectionWrapperRef.current.scrollBy({
				left: vwValue, // Adjust this value depending on your card width
				behavior: "smooth", // Smooth scrolling
			});
		}
	};

	return (
		<section className="py-20">
			<div className="max-ctn flex flex-col max-sm:flex-col-reverse items-center gap-10 pb-20 max-sm:pb-10">
				<h2 className="text-5xl font-poppins sm:text-[150px] font-semibold text-center text-white/5">
					Our Team
				</h2>

				{/* Slide controls */}
				<div className="flex justify-end space-x-4 pr-3">
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
				className="w-full flex sm:gap-10 overflow-x-scroll no-scrollbar my-5 sm:pl-7"
				ref={slideSectionWrapperRef} // Reference to the wrapper
			>
				<Image
					className="w-full max-w-[483px] flex-shrink-0 px-3"
					src={`${baseImageUrl}team-member-1.svg?alt=media`}
					width={483}
					height={548}
					alt="BoldFitnessNG Coach"
				/>
				<Image
					className="w-full sm:w-[500px] flex-shrink-0 px-3"
					src={`${baseImageUrl}team-member-2.svg?alt=media`}
					width={483}
					height={548}
					alt="BoldFitnessNG Coach"
				/>

				<Image
					className="w-full sm:w-[500px] flex-shrink-0 px-3"
					src={`${baseImageUrl}team-member-1.svg?alt=media`}
					width={483}
					height={548}
					alt="BoldFitnessNG Coach"
				/>
				<Image
					className="w-full sm:w-[500px] flex-shrink-0 px-3"
					src={`${baseImageUrl}team-member-2.svg?alt=media`}
					width={483}
					height={548}
					alt="BoldFitnessNG Coach"
				/>
			</div>
		</section>
	);
}
