import { ApexOptions } from "apexcharts";
import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const options: ApexOptions = {
	colors: ["#092d4f", "#086de1"],
	grid: {
		show: true,
		borderColor: "#4b4b4b53",
		strokeDashArray: 0,
		position: "back",
		xaxis: {
			lines: {
				show: false,
			},
		},
		yaxis: {
			lines: {
				show: false,
			},
		},
		row: {
			colors: undefined,
			opacity: 0.5,
		},
		column: {
			colors: undefined,
			opacity: 0.5,
		},
		padding: {
			top: 0,
			right: 0,
			bottom: 0,
			left: 0,
		},
	},
	chart: {
		fontFamily: "Poppins, sans-serif",
		type: "bar",
		height: 400,
		stacked: true,
		toolbar: { show: false },
		zoom: { enabled: true },
		foreColor: "#94a3b8", // slate-400 - visible in both modes
	},
	responsive: [
		{
			breakpoint: 1536,
			options: {
				plotOptions: { bar: { borderRadius: 0, columnWidth: "15%" } },
			},
		},
	],
	plotOptions: {
		bar: {
			horizontal: false,
			borderRadius: 0,
			columnWidth: "15%",
			borderRadiusApplication: "end",
			borderRadiusWhenStacked: "last",
		},
	},
	dataLabels: { enabled: false },
	xaxis: {
		categories: ["M", "T", "W", "T", "F", "S", "S"],
		labels: {
			style: {
				colors: Array(7).fill("#94a3b8"), // slate-400 - visible in both modes
			},
		},
	},
	yaxis: {
		labels: {
			style: {
				colors: "#94a3b8", // slate-400 - visible in both modes
			},
		},
	},
	legend: {
		position: "top",
		horizontalAlign: "left",
		fontFamily: "Poppins",
		fontWeight: 500,
		fontSize: "12px",
		labels: {
			colors: "#94a3b8", // slate-400 - visible in both modes
		},
	},
	fill: { opacity: 1 },
};

interface ChartTwoState {
	series: {
		name: string;
		data: number[];
	}[];
}

const ChartTwo: React.FC = () => {
	const [state, setState] = useState<ChartTwoState>({
		series: [
			{
				name: "Members",
				data: [44, 55, 21, 27, 62, 43, 65],
			},
			{
				name: "Revenue",
				data: [13, 23, 30, 48, 53, 27, 15],
			},
		],
	});

	console.log(setState.length);

	return (
		<div className="col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark/60 dark:bg-boxdark xl:col-span-4">
			<div className="mb-15 justify-between gap-4 sm:flex">
				<div>
					<h4 className="text-black dark:text-white">Profit this week</h4>
				</div>
				<div>
					<div className="relative z-20 inline-block">
						<select
							name="#"
							id="#"
							className="relative z-20 inline-flex appearance-none bg-transparent py-1 pl-3 pr-8 text-sm font-medium outline-none"
						>
							<option value="">This Week</option>
							<option value="">Last Week</option>
						</select>
						<span className="absolute top-1/2 right-3 z-10 -translate-y-1/2">
							<svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path
									d="M0.47072 1.08816C0.47072 1.02932 0.500141 0.955772 0.54427 0.911642C0.647241 0.808672 0.809051 0.808672 0.912022 0.896932L4.85431 4.60386C4.92785 4.67741 5.06025 4.67741 5.14851 4.60386L9.09079 0.896932C9.19376 0.793962 9.35557 0.808672 9.45854 0.911642C9.56151 1.01461 9.5468 1.17642 9.44383 1.27939L5.50155 4.98632C5.22206 5.23639 4.78076 5.23639 4.51598 4.98632L0.558981 1.27939C0.50014 1.22055 0.47072 1.16171 0.47072 1.08816Z"
									fill="#637381"
								/>
								<path
									fillRule="evenodd"
									clipRule="evenodd"
									d="M1.22659 0.546578L5.00141 4.09604L8.76422 0.557869C9.08459 0.244537 9.54201 0.329403 9.79139 0.578788C10.112 0.899434 10.0277 1.36122 9.77668 1.61224L9.76644 1.62248L5.81552 5.33722C5.36257 5.74249 4.6445 5.7544 4.19352 5.32924C4.19327 5.32901 4.19377 5.32948 4.19352 5.32924L0.225953 1.61241C0.102762 1.48922 -4.20186e-08 1.31674 -3.20269e-08 1.08816C-2.40601e-08 0.905899 0.0780105 0.712197 0.211421 0.578787C0.494701 0.295506 0.935574 0.297138 1.21836 0.539529L1.22659 0.546578ZM4.51598 4.98632C4.78076 5.23639 5.22206 5.23639 5.50155 4.98632L9.44383 1.27939C9.5468 1.17642 9.56151 1.01461 9.45854 0.911642C9.35557 0.808672 9.19376 0.793962 9.09079 0.896932L5.14851 4.60386C5.06025 4.67741 4.92785 4.67741 4.85431 4.60386L0.912022 0.896932C0.809051 0.808672 0.647241 0.808672 0.54427 0.911642C0.500141 0.955772 0.47072 1.02932 0.47072 1.08816C0.47072 1.16171 0.50014 1.22055 0.558981 1.27939L4.51598 4.98632Z"
									fill="#637381"
								/>
							</svg>
						</span>
					</div>
				</div>
			</div>

			<div>
				<div id="chartTwo" className="-ml-5 -mb-9 !text-gray-400">
					<style>
						{`
              .apexcharts-text:is(.dark *) {
                fill: #ffffff !important;
              }
            `}
					</style>
					<ReactApexChart options={options} series={state.series} type="bar" height={400} />
				</div>
			</div>
		</div>
	);
};

export default ChartTwo;
