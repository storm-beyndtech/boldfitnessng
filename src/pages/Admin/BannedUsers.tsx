import EditUserModal from "../../components/EditUserModal";
import PageLoader from "../../components/PageLoader";
import { contextData } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import { TfiSearch } from "react-icons/tfi";

const tableTitles = ["User", "Plan & Phone", "Action"];

export default function BannedUsers() {
	const { user: admin } = contextData();
	const [users, setUsers] = useState<any>(null);
	const [filteredUsers, setFilteredUsers] = useState<any>(null);
	const [userData, setUserData] = useState(null);
	const [fetching, setFetching] = useState(true);
	const [reFetch, setReFetch] = useState(true);
	const url = import.meta.env.VITE_REACT_APP_SERVER_URL;

	const fetchUsers = async () => {
		try {
			const res = await fetch(`${url}/auth/members`);
			const data = await res.json();
			if (res.ok) {
				const filtered = data.members.filter((user: any) => user._id !== admin._id && user?.disabled);
				setUsers(filtered);
				setFilteredUsers(filtered);
			} else {
				throw new Error(data.message);
			}
		} catch (error) {
			console.error(error);
		} finally {
			setFetching(false);
		}
	};

	useEffect(() => {
		fetchUsers();
	}, [reFetch]);

	const handleUserData = (userObj: any) => {
		setUserData(userObj);
		setReFetch(!reFetch);
	};

	const handleSearch = (search: string) => {
		const filtered = users.filter(
			(user: any) =>
				user.email.toLowerCase().includes(search) || user.firstName.toLowerCase().includes(search),
		);
		setFilteredUsers(filtered);
	};

	if (fetching) return <PageLoader />;

	return (
		<div className="relative">
			<div className="py-3 bg-white dark:bg-transparent mb-5 flex justify-center">
				<label htmlFor="table-search" className="sr-only">
					Search
				</label>
				<div className="relative">
					<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
						<TfiSearch className="h-3 text-gray-500 dark:text-gray-400" />
					</div>
					<input
						onChange={(e) => handleSearch(e.target.value)}
						type="text"
						className="editUserInput"
						placeholder="Search for users"
					/>
				</div>
			</div>

      <div className="overflow-auto no-scrollbar border border-gray-500/20 rounded-xl">

			<table className="min-w-full text-sm text-left">
				<thead className="text-sm bg-gray-50 dark:bg-boxdark dark:text-white/70">
					<tr>
						{tableTitles.map((title) => (
							<th key={title} scope="col" className="px-6 py-3 font-medium">
								{title}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{filteredUsers?.map((user: any) => (
						<tr
							key={user._id}
							className="bg-white border-b dark:bg-black dark:border-gray-900 hover:bg-gray-50 dark:hover:bg-boxdark"
						>
							<th
								scope="row"
								className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white mb-1"
							>
								<div>{user.firstName}</div>
								<div className="text-xs text-gray-500">
									{user.email.length > 17 ? user.email.slice(0, 15) + "..." : user.email}
								</div>
							</th>
							<td className="px-6 py-4 capitalize font-medium text-gray-900 whitespace-nowrap dark:text-white mb-1">
								{" "}
								<div>{user.plan}</div>
								<div className="text-xs text-gray-500">{user.phoneNumber}</div>
							</td>
							{/* <td className="px-6 py-4"></td> */}
							<td className="px-6 py-4">
								<button onClick={() => handleUserData(user)} className="text-blue-600 dark:text-blue-500">
									Edit user
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
      </div>

			{userData && <EditUserModal userData={userData} handleUserData={handleUserData} />}
		</div>
	);
}
