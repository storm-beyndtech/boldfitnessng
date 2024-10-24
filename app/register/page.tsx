"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import Alert from "../components/UI/Alert";
import { Checkout } from "../components/Checkout";
import Image from "next/image";
import { baseImageUrl } from "../utils/utils";
import Link from "next/link";

const plans = [
	{ value: "monthly", label: "Monthly Plan - ₦19,000" },
	{ value: "quarterly", label: "Quarterly Plan - ₦51,000" },
	{ value: "yearly", label: "Annual Plan - ₦183,000" },
];

const MembershipRegistration = () => {
	const [formData, setFormData] = useState({
		plan: "none",
		firstName: "",
		lastName: "",
		email: "",
		phone: "",
		address: "",
		city: "",
		state: "",
		zipCode: "",
	});
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const [showCheckout, setShowCheckout] = useState(false);

	const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
		setError(null);
		const { id, value } = e.target;
		setFormData((prev) => ({ ...prev, [id]: value }));
  };
  
  console.log(setLoading)

	const validateForm = (): string => {
		if (formData.plan === "none") return "Please select a membership plan";
		if (formData.firstName.length < 2) return "Please enter your first name";
		if (formData.lastName.length < 2) return "Please enter your last name";
		if (!formData.email.includes("@")) return "Please enter a valid email address";
		if (formData.phone.length < 10) return "Please enter a valid phone number";
		if (formData.address.length < 5) return "Please enter your street address";
		if (formData.city.length < 2) return "Please enter your city";
		if (formData.state.length < 2) return "Please enter your state";
		if (formData.zipCode.length < 5) return "Please enter a valid ZIP code";
		return "success";
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault();
		setError(null);

		const isValid = validateForm() === "success" ? true : setError(validateForm());

		if (isValid) {
			setShowCheckout(true);
		}
	};

  const handlePaymentSuccess = async (reference: string) => {
		try {
			// Here you would send both the user data and payment reference to your backend
			const response = await fetch("/api/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					...formData,
					paymentReference: reference,
				}),
			});

			if (!response.ok) {
				throw new Error("Registration failed");
			}

			// Handle successful registration (e.g., redirect to success page)
		} catch (error) {
			setError("Registration failed. Please try again.");
			setShowCheckout(false);
		}
	};

	const handlePaymentError = (error: string) => {
		setError(error);
		setShowCheckout(false);
	};

	if (showCheckout) {
		return (
			<Checkout
				userData={formData}
				onPaymentSuccess={handlePaymentSuccess}
				onPaymentError={handlePaymentError}
			/>
		);
	}

	return (
		<div className="flex min-h-screen bg-gray-50">
			{/* Left: Form Section */}
			<div className="w-full lg:w-1/2 flex justify-center items-center p-4">
				<div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8">
					<div className="mb-8 text-center  grid place-content-center">
						<Link href="/" className="w-15 mx-auto mb-5">
							<Image
								src={`${baseImageUrl}bold-fitness-logo-fav.svg?alt=media`}
								alt="logo"
								className="w-10"
								width={40}
								height={40}
							/>
						</Link>
						<h1 className="text-3xl font-semibold text-gray-900 font-montserrat">Become A Member</h1>
						<p className="mt-2 text-gray-600">Choose your plan and begin your fitness journey</p>
					</div>

					<form onSubmit={handleSubmit} className="space-y-6">
						<div>
							<label htmlFor="plan" className="editUserLabel">
								Select Membership Plan
							</label>
							<select id="plan" value={formData.plan} onChange={handleChange} className="editUserInput">
								<option value="none">Select a Plan</option>
								{plans.map((plan) => (
									<option key={plan.value} value={plan.value}>
										{plan.label}
									</option>
								))}
							</select>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-4 gap-y-5">
							<div>
								<label htmlFor="firstName" className="editUserLabel">
									First Name
								</label>
								<input
									id="firstName"
									value={formData.firstName}
									onChange={handleChange}
									className="editUserInput"
									type="text"
									required
								/>
							</div>

							<div>
								<label htmlFor="lastName" className="editUserLabel">
									Last Name
								</label>
								<input
									id="lastName"
									value={formData.lastName}
									onChange={handleChange}
									className="editUserInput"
									type="text"
									required
								/>
							</div>

							<div>
								<label htmlFor="email" className="editUserLabel">
									Email
								</label>
								<input
									id="email"
									value={formData.email}
									onChange={handleChange}
									className="editUserInput"
									type="email"
									required
								/>
							</div>

							<div>
								<label htmlFor="phone" className="editUserLabel">
									Phone Number
								</label>
								<input
									id="phone"
									value={formData.phone}
									onChange={handleChange}
									className="editUserInput"
									type="tel"
									required
								/>
							</div>
						</div>

						<div>
							<label htmlFor="address" className="editUserLabel">
								Street Address
							</label>
							<input
								id="address"
								value={formData.address}
								onChange={handleChange}
								className="editUserInput"
								type="text"
								required
							/>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
							<div>
								<label htmlFor="city" className="editUserLabel">
									City
								</label>
								<input
									id="city"
									value={formData.city}
									onChange={handleChange}
									className="editUserInput"
									type="text"
									required
								/>
							</div>

							<div>
								<label htmlFor="state" className="editUserLabel">
									State
								</label>
								<input
									id="state"
									value={formData.state}
									onChange={handleChange}
									className="editUserInput"
									type="text"
									required
								/>
							</div>

							<div>
								<label htmlFor="zipCode" className="editUserLabel">
									ZIP Code
								</label>
								<input
									id="zipCode"
									value={formData.zipCode}
									onChange={handleChange}
									className="editUserInput"
									type="text"
									required
								/>
							</div>
						</div>

						{error && <Alert type="warning" message={error} />}

						<button
							type="submit"
							disabled={loading}
							className="w-full bg-brandBlue3 text-white py-4 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 font-semibold font-montserrat"
						>
							{loading ? "Processing..." : "Proceed to Checkout"}
						</button>
					</form>
				</div>
			</div>

			{/* Right: Image Section */}
			<div className="hidden lg:block w-1/2 relative">
				<Image
					src={`${baseImageUrl}auth-bg.svg?alt=media`}
					fill
					quality={100}
					priority
					alt="Auth background"
					className="object-top object-cover"
				/>
			</div>
		</div>
	);
};

export default MembershipRegistration;
