import { useEffect, useState } from "react";
import Alert from "../../components/UI/Alert";
import { Plan } from "../../types/types";
import { PAYMENT_PLANS } from "../../util/utils";

export default function Settings() {
	const [plans, setPlans] = useState<Plan[]>(PAYMENT_PLANS);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [success, setSuccess] = useState<boolean>(false);
	const url = import.meta.env.VITE_REACT_APP_SERVER_URL;

	const fetchUtils = async (): Promise<void> => {
		try {
			setLoading(true);
			const res = await fetch(`${url}/utils`);
			const data = await res.json();

			if (res.ok && data.utils && data.utils[0] && data.utils[0].plans) {
				const retrievedPlans = data.utils[0].plans.map((plan: Plan) => ({
					...plan,
					features: Array.isArray(plan.features) ? plan.features : [],
				}));
				setPlans(retrievedPlans);
			} else {
				throw new Error(data.message || "Failed to fetch plans");
			}
		} catch (error) {
			console.error("Error fetching plans:", error instanceof Error ? error.message : String(error));
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchUtils();
	}, []);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault();
		setError(null);
		setSuccess(false);

		try {
			setLoading(true);
			const res = await fetch(`${url}/utils`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ plans }),
			});

			const data = await res.json();

			if (res.ok) {
				setSuccess(true);
				setTimeout(() => setSuccess(false), 3000);
			} else {
				throw new Error(data.message || "Failed to update plans");
			}
		} catch (error) {
			setError(error instanceof Error ? error.message : "An unknown error occurred");
		} finally {
			setLoading(false);
		}
	};

	const handlePlanChange = (index: number, field: keyof Plan, value: string | number): void => {
		const newPlans = [...plans];
		newPlans[index] = { ...newPlans[index], [field]: value };
		setPlans(newPlans);
	};

	const handleFeatureChange = (planIndex: number, featureIndex: number, value: string): void => {
		const newPlans = [...plans];
		const newFeatures = [...newPlans[planIndex].features];
		newFeatures[featureIndex] = value;
		newPlans[planIndex] = { ...newPlans[planIndex], features: newFeatures };
		setPlans(newPlans);
	};

	const addFeature = (planIndex: number): void => {
		const newPlans = [...plans];
		const newFeatures = [...newPlans[planIndex].features, "New feature"];
		newPlans[planIndex] = { ...newPlans[planIndex], features: newFeatures };
		setPlans(newPlans);
	};

	const removeFeature = (planIndex: number, featureIndex: number): void => {
		const newPlans = [...plans];
		const newFeatures = [...newPlans[planIndex].features];
		newFeatures.splice(featureIndex, 1);
		newPlans[planIndex] = { ...newPlans[planIndex], features: newFeatures };
		setPlans(newPlans);
	};

	const addPlan = (): void => {
		setPlans([
			...plans,
			{
				name: "New Plan",
				price: 0,
				features: ["Sample feature"],
				duration: 0,
			},
		]);
	};

	const removePlan = (index: number): void => {
		const newPlans = [...plans];
		newPlans.splice(index, 1);
		setPlans(newPlans);
	};

	return (
		<form onSubmit={handleSubmit} className="relative bg-white rounded-lg shadow dark:bg-boxdark">
			<div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-800">
				<h3 className="text-lg font-semibold text-gray-900 dark:text-white">Edit Gym Pricing</h3>
				<button
					type="button"
					onClick={addPlan}
					className="text-white bg-[#000aba] hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
				>
					New plan +
				</button>
			</div>

			<div className="sm:p-6 space-y-7">
				{plans.map((plan, planIndex) => (
					<div
						key={planIndex}
						className="px-4 py-5 mb-7.5 sm:border sm:border-gray-200 rounded-lg dark:border-gray-700"
					>
						<div className="flex justify-between items-center mb-7.5">
							<h4 className="text-md font-medium text-gray-900 dark:text-white">
								{plan.name ? `${plan.name} Plan` : `Plan ID:${planIndex + 1}`}
							</h4>
							<button
								type="button"
								onClick={() => removePlan(planIndex)}
								className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center"
							>
								Remove Plan
							</button>
						</div>

						<div className="grid grid-cols-6 gap-6 mb-5">
							<div className="col-span-6 sm:col-span-2">
								<label htmlFor={`plan-name-${planIndex}`} className="editPlanLabel">
									Plan Name
								</label>
								<input
									value={plan.name}
									onChange={(e) => handlePlanChange(planIndex, "name", e.target.value)}
									type="text"
									id={`plan-name-${planIndex}`}
									className="editPlanInput"
									required
								/>
							</div>

							<div className="col-span-6 sm:col-span-2">
								<label htmlFor={`plan-price-${planIndex}`} className="editPlanLabel">
									Price (in Naira)
								</label>
								<input
									value={plan.price !== 0 ? plan.price : ""}
									onChange={(e) => handlePlanChange(planIndex, "price", parseFloat(e.target.value) || 0)}
									type="number"
									id={`plan-price-${planIndex}`}
									className="editPlanInput"
									required
								/>
							</div>

							<div className="col-span-6 sm:col-span-2">
								<label htmlFor={`plan-duration-${planIndex}`} className="editPlanLabel">
									Duration (In Days)
								</label>
								<input
									value={plan.duration !== 0 ? plan.duration : ""}
									onChange={(e) => handlePlanChange(planIndex, "duration", parseFloat(e.target.value) || 0)}
									type="number"
									id={`plan-duration-${planIndex}`}
									className="editPlanInput"
									required
								/>
							</div>
						</div>

						<div className="mb-2">
							<div className="flex justify-between items-center mb-2">
								<label className="block text-sm font-medium text-gray-900 dark:text-gray-400">
									Plan Features ({plan.features.length})
								</label>
								<button
									type="button"
									onClick={() => addFeature(planIndex)}
									className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center"
								>
									Add Feature
								</button>
							</div>

							{plan.features && plan.features.length > 0 ? (
								plan.features.map((feature, featureIndex) => (
									<div key={featureIndex} className="flex items-center mb-4">
										<input
											value={feature}
											onChange={(e) => handleFeatureChange(planIndex, featureIndex, e.target.value)}
											type="text"
											className="editPlanInput !text-xs !text-gray-400"
											placeholder="Enter feature"
											required
										/>
										<button
											type="button"
											onClick={() => removeFeature(planIndex, featureIndex)}
											className="ml-2 text-red-600 hover:text-red-800"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="h-5 w-5"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
												/>
											</svg>
										</button>
									</div>
								))
							) : (
								<div className="text-gray-500 dark:text-gray-400 mb-2">No features added yet.</div>
							)}
						</div>
					</div>
				))}

				{error && <Alert type="danger" message={error} />}
				{success && <Alert type="success" message="Plans Updated Successfully!" />}
			</div>

			<div className="flex items-center p-6 space-x-3 rtl:space-x-reverse border-t border-gray-200 rounded-b dark:border-gray-800">
				<button
					type="submit"
					className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
					disabled={loading}
				>
					{loading ? "Saving..." : "Save All Changes"}
				</button>
			</div>
		</form>
	);
}
