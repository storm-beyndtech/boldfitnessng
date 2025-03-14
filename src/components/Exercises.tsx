import { baseImageUrl, exercises } from "../util/utils";

export default function Exercises() {
	return (
		<section
			className="max-ctn flex flex-col-reverse md:grid md:grid-cols-2 md:items-center gap-20 xl:gap-32 py-[50px] sm:pt-[150px]"
			id="exercises"
		>
			<img
				className="max-w-[575px] w-full rounded-[30px] overflow-hidden"
				src={`${baseImageUrl}back-squat.svg?alt=media`}
				alt="Back-Squat.svg"
			/>
			<div className="w-full max-w-[520px] flex flex-col gap-10">
				<p className="text-desc leading-8">
					<span className="font-medium text-black dark:text-desc">Exercises:</span> Elevate your fitness and
					well-being through targeted workouts that balance energy level and build lasting strength.
				</p>

				<div className="w-full grid grid-cols-2 gap-3 sm:gap-10 max-sm:gap-y-10">
					{exercises.map((exercise, i) => (
						<div key={i} className="w-[100%] flex flex-col gap-4">
							<div className="flex justify-between">
								<h3 className="text-black dark:text-desc font-medium text-sm sm:text-lg leading-[2]">
									{exercise.title}
								</h3>
								<div className="w-8 h-8 grid place-content-center rounded-lg bg-brandBlue3/5">
									<exercise.icon className="text-brandBlue3 text-sm" />
								</div>
							</div>
							<p className="text-[11px] sm:text-sm font-medium max-sm:font-normal text-desc leading-6">
								{exercise.desc}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
