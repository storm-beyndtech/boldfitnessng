// components/checkout/OrderSummary.tsx
import { UserData, Plan } from "@/types/types";


export const OrderSummary: React.FC<{
	plan: Plan;
}> = ({ plan }) => {
	return (
		<div className="mb-8">
			<h2 className="text-2xl font-bold text-gray-900 mb-4">Order Summary</h2>
			<div className="border-t border-b border-gray-200 py-4">
				<div className="flex justify-between mb-2">
					<span className="font-medium">{plan.name}</span>
					<span className="font-medium">${(plan.amount / 100).toFixed(2)}</span>
				</div>
				<p className="text-sm text-gray-600">{plan.interval} subscription</p>
			</div>
			<div className="mt-4">
				<h3 className="font-medium mb-2">Features:</h3>
				<ul className="list-disc list-inside text-sm text-gray-600">
					{plan.features.map((feature) => (
						<li key={feature}>{feature}</li>
					))}
				</ul>
			</div>
		</div>
	);
};


export const CustomerInformation: React.FC<{
	userData: UserData;
}> = ({ userData }) => {
	return (
		<div className="mb-8">
			<h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Information</h3>
			<div className="grid grid-cols-2 gap-4 text-sm">
				<div>
					<p className="text-gray-600">Name</p>
					<p className="font-medium">
						{userData.firstName} {userData.lastName}
					</p>
				</div>
				<div>
					<p className="text-gray-600">Email</p>
					<p className="font-medium">{userData.email}</p>
				</div>
				<div>
					<p className="text-gray-600">Phone</p>
					<p className="font-medium">{userData.phone}</p>
				</div>
				<div>
					<p className="text-gray-600">Address</p>
					<p className="font-medium">
						{userData.address}, {userData.city}, {userData.state} {userData.zipCode}
					</p>
				</div>
			</div>
		</div>
	);
};