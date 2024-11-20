import { UserData } from "../types/types"; // Import the types
import searchIcon from "../assets/search-normal.svg";
import filterIcon from "../assets/filter.svg";
import { useState } from "react";

interface MembersListProps {
	members: UserData[] | [];
}

export default function MembersList({ members }: MembersListProps) {
	const [gymMembers, setGymMembers] = useState(members);

	// Handle search input
	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		const searchValue = e.target.value.toLowerCase();
		setGymMembers(
			members.filter(
				(member) =>
					member.firstName.toLowerCase().includes(searchValue) ||
					member.lastName.toLowerCase().includes(searchValue) ||
					member.email.toLowerCase().includes(searchValue) ||
					member.phoneNumber.toLowerCase().includes(searchValue) ||
					member.plan.toLowerCase().includes(searchValue),
			),
		);
	};

	return (
		<div className="p-[22px] rounded-[14px] bg-white">
			<h2 className="text-lg font-semibold text-[#383E49]">Members</h2>
			<p className="text-sm text-gray-500 mb-4">You have {members.length} members within the past year</p>

			{/* Search & Filter */}
			<div className="flex items-center justify-between gap-5 my-10">
				<div className="w-3/4 max-w-[380px] relative">
					<img src={searchIcon} alt="search" className="absolute left-3 top-4" />
					<input
						type="text"
						placeholder="Search members, Types, Status, Date"
						className="!pl-10 input"
						onChange={handleSearch}
					/>
				</div>

				<div className="p-3 flex-shrink-0 grid place-content-center border border-[#E0E0E0] rounded-xl">
					<img src={filterIcon} alt="filter" />
				</div>
			</div>

			{/* members Table */}
			<table className="w-full">
				<thead className="max-sm:hidden">
					<tr className="text-left font-semibold py-5 text-[#2B2F38]">
						<th>Name</th>
						<th>Email</th>
						<th>Phone</th>
						<th>Plan</th>
						<th>Status</th>
					</tr>
				</thead>
				<tbody>
					{gymMembers.map((member) => (
						<tr
							key={member._id}
							className="cursor-pointer hover:bg-gray-100/20 max-sm:flex max-sm:flex-col max-sm:mb-10 max-sm:gap-2"
						>
							<td className="sm:py-5 text-[#48505E]">
								{member.firstName} {member.lastName}
							</td>
							<td className="sm:py-5 text-[#48505E]">{member.email}</td>
							<td className="sm:py-5 text-[#48505E]">{member.phoneNumber}</td>
							<td className="sm:py-5">
								<span
									className={`px-3.5 py-1.5 text-sm font-medium rounded-[100px] ${
										member.status === "active"
											? "bg-[#12B76A14] text-[#12B76A]"
											: member.status === "pending"
											? "bg-[#F7900914] text-[#F79009]"
											: "bg-[#3850F014] text-[#3850F0]"
									}`}
								>
									{member.status}
								</span>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
