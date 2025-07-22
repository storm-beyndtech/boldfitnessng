import { useEffect, useState } from "react";
import { sendRequest } from "../util/sendRequest";
import { TbUsers } from "react-icons/tb";
import { UserData } from "../types/types";

interface Stat {
	title: string;
	value: number;
}

export default function MembersStats() {
	const [stats, setStats] = useState<Stat[]>([
		{ title: "Monthly Users", value: 0 },
		{ title: "Quarterly Users", value: 0 },
		{ title: "Annual Users", value: 0 },
		{ title: "Total Users", value: 0 },
	]);

	const fetchUsers = async () => {
		try {
			const res = await sendRequest("/auth/members", "GET", null);
			const users: UserData[] = res.members;

			const nonAdminUsers = users.filter((user) => user.accountType !== "admin");
			const monthly = nonAdminUsers.filter((user) => user.plan === "monthly").length;
			const quarterly = nonAdminUsers.filter((user) => user.plan === "quarterly").length;
			const annually = nonAdminUsers.filter((user) => user.plan === "annually").length;

			console.log(monthly);

			setStats([
				{ title: "Monthly Users", value: monthly },
				{ title: "Quarterly Users", value: quarterly },
				{ title: "Annual Users", value: annually },
				{ title: "Total Users", value: nonAdminUsers.length },
			]);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		fetchUsers();
	}, []);

	return (
		<div className="col-span-12 border border-stroke bg-white py-7 dark:border-strokedark/60 dark:bg-boxdark">
			<div className="grid grid-cols-1 gap-10 sm:gap-5 sm:grid-cols-2 xl:grid-cols-4 xl:gap-0">
				{stats.map((stat: any, i: number) => (
					<div
						key={i}
						className={`flex items-center justify-between px-7.5 gap-1 border-stroke pb-5 dark:border-strokedark/40 ${
							i === stats.length - 1 ? "" : "xl:border-r"
						} xl:pb-0`}
					>
						<div className="flex flex-col justify-between items-start font-montserrat">
							<h4 className="mb-2.5 text-2xl font-medium text-black dark:text-white">{stat.value}</h4>
							<div className="flex gap-3">
								<p className="text-xs text-black dark:text-gray-500">{stat.title}</p>
								<span className={stat.value > 0 ? "text-[#49eb9d] text-xs" : "text-brandBlue3 text-xs"}>
									{stat.value / 100}%
								</span>
							</div>
						</div>
						<TbUsers className="text-lg text-black dark:text-gray-500" strokeWidth={1.5} />
					</div>
				))}
			</div>
		</div>
	);
}
