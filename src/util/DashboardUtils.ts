import { TbLayoutFilled, TbLayout } from "react-icons/tb";
import { PiUsersFour, PiUsersFourFill } from "react-icons/pi";
import { IoSettingsOutline, IoSettings } from "react-icons/io5";

export const adminNavItems = [
	{
		to: "/admin/",
		label: "Dashboard",
		icons: { default: TbLayout, active: TbLayoutFilled },
	},
	{
		to: "/admin/members",
		label: "Members",
		icons: { default: PiUsersFour, active: PiUsersFourFill },
	},
	{
		to: "/admin/profile",
		label: "Profile",
		icons: { default: IoSettingsOutline, active: IoSettings },
	},
];