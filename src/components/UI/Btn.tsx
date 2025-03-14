import { CgSpinner } from "react-icons/cg";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";

type dataProp = {
	type?: "primary" | "small" | "auth";
	label?: string;
	disabled?: boolean;
	btnAction?: "button" | "submit" | "reset" | undefined;
	direction?: "left" | "right";
	onClick?: () => void;
	enabled?: boolean;
	nav?: boolean;
};

export default function Btn({
	type,
	label,
	disabled,
	btnAction,
	direction,
	onClick,
	enabled,
	nav,
}: dataProp) {
	switch (type) {
		case "primary":
			return (
				<button
					aria-label={label}
					disabled={disabled}
					type={btnAction}
					className={`${
						!nav ? "text-black" : "text-white"
					} dark:text-white text-xs font-montserrat font-semibold rounded-xl px-5 py-2.5 text-center inline-flex items-center justify-center whitespace-nowrap border border-brandBlue3 hover:border-brandBlue2 ${
						disabled ? "opacity-50 cursor-not-allowed" : ""
					}`}
				>
					{disabled ? <CgSpinner className="w-4 h-4 text-white spin" /> : label}
				</button>
			);

		case "auth":
			return (
				<button
					aria-label={label}
					disabled={disabled}
					type={btnAction}
					className={`bg-brandBlue3 text-white py-3 px-7.5 mt-7.5 rounded-lg hover:bg-blue-700 transition-colors font-semibold font-montserrat text-sm ${
						disabled ? "opacity-50 cursor-not-allowed" : ""
					}`}
				>
					{disabled ? <CgSpinner className="w-4 h-4 text-white spin" /> : label}
				</button>
			);

		case "small":
			return (
				<div
					onClick={enabled ? onClick : undefined}
					className={`w-12 h-12 grid place-content-center rounded-full border-2 border-brandBlue3 cursor-pointer 
              bg-brandBlue1/5 text-lg dark:text-brandBlue1 text-black hover:bg-brandBlue3/10
              ${enabled ? "" : "opacity-50 cursor-not-allowed border-0"}`}
				>
					{direction === "left" ? <FaArrowLeftLong /> : <FaArrowRightLong />}
				</div>
			);

		default:
			return;
	}
}
