import { useEffect, useState } from "react";
import Alert from "../../components/UI/Alert";

export default function Settings() {
	const [plans, setPlans] = useState([
		{ name: "Monthly", price: 20000 },
		{ name: "Quarterly", price: 80000 },
		{ name: "Annually", price: 240000 },
	]);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const url = import.meta.env.VITE_REACT_APP_SERVER_URL;

	const fetchUtils = async () => {
		try {
			const res = await fetch(`${url}/utils`);
			const data = await res.json();

      console.log(data.utils[0].plans)

			if (res.ok) {
				setPlans(data.utils[0].plans || plans);
			} else {
				throw new Error(data.message);
			}
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchUtils();
	}, []);

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		setError(null);

		try {
			setLoading(true);
			const res = await fetch(`${url}/utils`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ plans }),
			});

			const data = await res.json();

			if (res.ok) setSuccess(true);
			else throw new Error(data.message);
		} catch (error: any) {
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	const handlePlanChange = (index: number, field: string, value: string | number) => {
		const newPlans = [...plans];
		newPlans[index] = { ...newPlans[index], [field]: value };
		setPlans(newPlans);
	};

	return (
		<form onSubmit={handleSubmit} className="relative bg-white rounded-lg shadow dark:bg-boxdark">
			<div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-800">
				<h3 className="text-lg font-semibold text-gray-900 dark:text-white">Edit Gym Plans and Prices</h3>
			</div>
			<div className="p-6 space-y-6">
				{plans.map((plan, index) => (
					<div key={index} className="grid grid-cols-6 gap-7.5">
						<div className="col-span-6 sm:col-span-3">
							<label htmlFor={`plan-name-${index}`} className="editUserLabel !font-montserrat !text-xs dark:!text-gray-400">
								Plan Name
							</label>
							<input
								value={plan.name}
								onChange={(e) => handlePlanChange(index, "name", e.target.value)}
								type="text"
								id={`plan-name-${index}`}
								className="editUserInput !pl-3 !font-sans"
								disabled // Plan names are predefined
							/>
						</div>
						<div className="col-span-6 sm:col-span-3">
							<label htmlFor={`plan-price-${index}`} className="editUserLabel !font-montserrat !text-xs dark:!text-gray-400">
								Price (in Naira)
							</label>
							<input
								value={plan.price}
								onChange={(e) => handlePlanChange(index, "price", parseFloat(e.target.value))}
								type="number"
								id={`plan-price-${index}`}
								className="editUserInput !pl-3 !font-sans"
								required
							/>
						</div>
					</div>
				))}
				{error && <Alert type="danger" message={error} />}
				{success && <Alert type="success" message={"Plans Updated Successfully..."} />}
			</div>

			<div className="flex items-center p-6 space-x-3 rtl:space-x-reverse border-t border-gray-200 rounded-b dark:border-gray-800">
				<button
					type="submit"
					className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
				>
					{loading ? "Saving..." : "Save Changes"}
				</button>
			</div>
		</form>
	);
}
