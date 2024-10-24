import { CgSpinner } from "react-icons/cg";

type dataProp = {
	type: "primary" | "small";
	label: string;
	disabled?: boolean;
	btnAction?: "button" | "submit" | "reset" | undefined;
};

export default function Btn({ type, label, disabled, btnAction }: dataProp) {
	switch (type) {
		case "primary":
			return (
				<button
					disabled={disabled}
					type={btnAction}
					className={`text-[#C8E9FF] text-xs font-montserrat bg-bg/80 font-semibold rounded-xl px-5 py-2.5 text-center
             me-2 inline-flex items-center justify-center whitespace-nowrap border border-brandBlue3 hover:border-brandBlue2 ${
								disabled ? "opacity-50 cursor-not-allowed" : ""
							}`}
				>
					{disabled ? <CgSpinner className="w-4 h-4 text-white spin mr-2" /> : label}
				</button>
			);

		case "small":
			return (
				<button
					disabled={disabled}
					type={btnAction}
					className={`text-[#C8E9FF] text-sm font-montserrat bg-black/50 font-semibold rounded-xl px-[16.5px] py-[12.5px] text-center
             me-2 inline-flex items-center justify-center whitespace-nowrap border border-brandBlue3 hover:border-brandBlue2 ${
								disabled ? "opacity-50 cursor-not-allowed" : ""
							}`}
				>
					{disabled ? <CgSpinner className="w-4 h-4 text-white spin mr-2" /> : label}
				</button>
			);

		default:
			return;
	}
}
