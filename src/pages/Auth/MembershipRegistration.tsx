import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { baseImageUrl, PAYMENT_PLANS } from "../../util/utils";
import { Link } from "react-router-dom";
import { validateForm } from "../../util/Validation";
import Paystack from "@paystack/inline-js";
import RegistrationForm from "../../components/RegistrationForm";
import { sendRequest } from "../../util/sendRequest";
import { AiOutlineLoading3Quarters, AiOutlineCheckCircle, AiOutlineWarning } from "react-icons/ai";
import SEO from "../../components/SEO";
import { Plan } from "../../types/types";

const Modal = ({ isOpen, children }: any) => {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
			<div className="bg-boxdark/20 backdrop-blur-md rounded-lg shadow-xl border border-white/20 min-w-[300px] transform transition-all">
				{children}
			</div>
		</div>
	);
};

const StatusDisplay = ({ status }: { status: "processing" | "uploading" | "success" | "error" }) => {
	const displays = {
		processing: {
			icon: <AiOutlineLoading3Quarters className="h-12 w-12 text-white animate-spin" />,
			title: "Processing Payment",
			message: "Please wait while we verify your payment...",
		},
		uploading: {
			icon: <AiOutlineLoading3Quarters className="h-12 w-12 text-white animate-spin" />,
			title: "Creating Account",
			message: "Setting up your membership profile...",
		},
		success: {
			icon: <AiOutlineCheckCircle className="h-12 w-12 text-green-400" />,
			title: "Welcome Aboard!",
			message: "Check Your Email For Membership Details",
		},
		error: {
			icon: <AiOutlineWarning className="h-12 w-12 text-red-400" />,
			title: "Registration Failed",
			message: "Please try again or contact support",
		},
	};

	const display = displays[status];

	return (
		<div className="flex flex-col items-center justify-center p-8 space-y-4">
			{display.icon}
			<div className="text-center space-y-2">
				<h3 className="text-lg font-semibold text-white">{display.title}</h3>
				<p className="text-[10px] text-white/80">{display.message}</p>
			</div>
		</div>
	);
};

const MembershipRegistration = () => {
	const PaystackPK = import.meta.env.VITE_REACT_APP_PAYSTACK_PK;
	const url = import.meta.env.VITE_REACT_APP_SERVER_URL;
	const initialValues = {
		plan: "none",
		firstName: "",
		lastName: "",
		email: "",
		phoneNumber: "",
		gender: "none",
		dateOfBirth: "",
		address: {
			street: "",
			city: "",
			state: "none",
			zipCode: "",
		},
		accountType: "member",
	};

	const [formData, setFormData] = useState(initialValues);
	const [plans, setPlans] = useState(PAYMENT_PLANS);
	const [error, setError] = useState<null | string>(null);
	const [loading, setLoading] = useState(false);
	const [modalStatus, setModalStatus] = useState<null | string>(null);

	//Fetch Pricing
	const fetchUtils = async (): Promise<void> => {
		try {
			const res = await fetch(`${url}/utils`);
			const data = await res.json();

			if (res.ok && data.utils && data.utils[0] && data.utils[0].plans) {
				const retrievedPlans = data.utils[0].plans.map((plan: Plan) => ({
					...plan,
					features: Array.isArray(plan.features) ? plan.features : [],
				}));
				setPlans(retrievedPlans);
			} else {
				console.warn(data.message || "Failed to fetch plans");
			}
		} catch (error) {
			console.error("Error fetching plans:", error instanceof Error ? error.message : String(error));
		}
	};

	useEffect(() => {
		fetchUtils();
	}, []);

	// Handle input change
	const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
		setError(null);
		const { id, value } = e.target;

		if (["street", "city", "state", "zipCode"].includes(id)) {
			setFormData((prev) => ({
				...prev,
				address: {
					...prev.address,
					[id]: value,
				},
			}));
		} else {
			setFormData((prev) => ({ ...prev, [id]: value }));
		}
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault();
		setError(null);
		setLoading(true);

		const validationMessage = validateForm(formData);
		if (validationMessage !== "success") {
			setError(validationMessage);
			setLoading(false);
			return;
		}

		const plan = plans.find((plan) => plan.name === formData.plan);
		if (!plan) {
			setError("Please enter a valid plan");
			setLoading(false);
			return;
		}

		try {
			const res = await fetch(`${url}/auth/validate/${formData.email}`);

			if (!res.ok) {
				setError("User already exist, please try a different email");
				setLoading(false);
				return;
			}

			const popup = new Paystack();
			popup.checkout({
				key: PaystackPK,
				email: formData.email,
				amount: plan.price * 100,
				phone: formData.phoneNumber,
				channels: ["card", "ussd", "qr", "eft", "mobile_money", "bank_transfer"],
				onSuccess: async ({ reference }) => {
					try {
						setModalStatus("processing");
						await sendRequest("/pay/verify", "POST", {
							reference,
						});

						setModalStatus("uploading");
						await sendRequest("/pay/handle-success", "POST", {
							...formData,
							paymentRef: reference,
						});

						setModalStatus("success");
						setTimeout(() => setModalStatus(null), 5000);
						setFormData(initialValues);
					} catch (error) {
						setModalStatus("error");
						setTimeout(() => setModalStatus(null), 3000);
					}
				},
				onLoad: (response) => {
					console.log("onLoad: ", response);
				},
				onCancel: () => {
					setModalStatus(null);
					setLoading(false);
				},
				onError: (error) => {
					console.log("Error: ", error.message);
					setModalStatus("error");
					setTimeout(() => setModalStatus(null), 3000);
				},
			});
		} catch (error) {
			setError("Registration failed. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<SEO
				title="Bold Fitness NG | Be Bold. Fit. Unstoppable | Become a member 🏋"
				description="Step into a world where the beat of determination meets the rhythm of wellness."
				url="https://boldfitnessng.net"
			/>
			<div className="flex bg-gray-100 max-sm:bg-white">
				{/* Left: Form Section */}
				<div className="w-full lg:w-1/2 grid sm:place-content-center px-5 py-10">
					<div className="w-full max-w-2xl bg-white rounded-2xl sm:p-7.5">
						<div className="mb-10 flex items-center">
							<Link to="/" className="h-16 w-16 flex border-r-[0.5px] border-gray-300 mr-2">
								<img
									src={`${baseImageUrl}bold-fitness-logo-fav.svg?alt=media`}
									alt="logo"
									className="h-full w-auto"
								/>
							</Link>
							<div>
								<p className="mt-2 text-gray-400 text-xs pl-1">Select Plan & Proceed</p>
								<h1 className="text-[2rem] font-semibold text-gray-800 font-montserrat">Register</h1>
							</div>
						</div>
						<RegistrationForm
							formData={formData}
							handleChange={handleChange}
							handleSubmit={handleSubmit}
							loading={loading}
							error={error}
							plans={plans}
							setFormData={setFormData}
						/>
					</div>
				</div>

				{/* Right: Image Section */}
				<div className="h-screen overflow-y-hidden hidden lg:flex justify-end w-1/2 sticky top-0 right-0">
					<img
						src={`${baseImageUrl}auth-bg.svg?alt=media`}
						alt="Auth right background"
						className="w-full object-top object-cover"
					/>
				</div>

				{/* Status Modal */}
				<Modal isOpen={modalStatus !== null}>
					{modalStatus && (
						<StatusDisplay status={modalStatus as "processing" | "uploading" | "success" | "error"} />
					)}
				</Modal>
			</div>
		</>
	);
};

export default MembershipRegistration;
