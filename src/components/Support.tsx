import { useState } from "react";
import Alert from "./UI/Alert";
import supportImage from "../assets/support.svg";

export default function Support() {
	const [fullName, setFullName] = useState("");
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState("");
	const url = import.meta.env.VITE_REACT_APP_SERVER_URL;

	const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError("");

		if (fullName.length < 5) return setError("Full name must be at least 5 characters");
		if (email.length < 5 || !email.includes("@")) return setError("Not a valid email address");
		if (message.length < 5) return setError("Message must be at least 5 characters");

		try {
			setLoading(true);
			const res = await fetch(`${url}/utils/contact`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ fullName, email, message }),
			});
			const data = await res.json();

			if (res.ok) setSuccess(data.message);
			else throw new Error(data.message);
		} catch (error: any) {
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<section className="py-30 bg-gray-50 dark:bg-[#01020c]" id="support">
			<div className="max-ctn">
				{/* Main Content */}
				<div className="grid lg:grid-cols-2 gap-16 items-start">
					{/* Contact Info & Form */}
					<div className="space-y-8">
						{/* Header */}
						<div className="mb-16">
							<p className="text-brandBlue1 font-medium text-sm uppercase tracking-wider mb-3">Need Help?</p>
							<h2 className="text-4xl sm:text-5xl font-bold text-black dark:text-white mb-4">
								We're Here <br /> to <span className="text-brandBlue1">Support</span> You
							</h2>
						</div>

						{/* Contact Methods */}
						<div className="flex flex-wrap justify-between gap-6">
							<div className="flex flex-wrap justify-center gap-3 bg-white dark:bg-[#0a0b14] p-4 lg:pr-10 rounded-2xl border border-gray-200 dark:border-[#1a1b23]">
								<div className="w-12 h-12 bg-brandBlue1/10 rounded-xl flex items-center justify-center">
									<svg
										className="w-6 h-6 text-brandBlue1"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
										/>
									</svg>
								</div>
								<div>
									<h3 className="font-semibold text-black dark:text-white mb-1">Call Us</h3>
									<p className="text-desc text-sm">+234 818 553 3663</p>
								</div>
							</div>

							<div className="flex flex-wrap justify-center gap-3 bg-white dark:bg-[#0a0b14] p-4 lg:pr-10 rounded-2xl border border-gray-200 dark:border-[#1a1b23]">
								<div className="w-12 h-12 bg-brandBlue1/10 rounded-xl flex items-center justify-center">
									<svg
										className="w-6 h-6 text-brandBlue1"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
										/>
									</svg>
								</div>
								<div>
									<h3 className="font-semibold text-black dark:text-white mb-1">Email Us</h3>
									<p className="text-desc text-sm">team@boldfitnessng.net</p>
								</div>
							</div>
						</div>

						{/* Contact Form */}
						<div className="bg-white dark:bg-[#0a0b14] p-8 rounded-2xl border border-gray-200 dark:border-[#1a1b23]">
							<h3 className="text-xl font-semibold text-black dark:text-white mb-6">Send us a message</h3>

							<form onSubmit={sendMessage} className="space-y-6">
								<div className="flex flex-wrap gap-4">
									<div>
										<label
											htmlFor="fullName"
											className="block text-sm font-medium text-black dark:text-white mb-2"
										>
											Full Name
										</label>
										<input
											type="text"
											id="fullName"
											className="w-full px-4 py-3 bg-gray-50 dark:bg-[#1a1b23] border border-gray-200 dark:border-[#2a2b33] rounded-xl text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brandBlue1 focus:border-transparent transition-colors"
											placeholder="Your name"
											value={fullName}
											onChange={(e) => setFullName(e.target.value)}
											required
										/>
									</div>

									<div>
										<label
											htmlFor="email"
											className="block text-sm font-medium text-black dark:text-white mb-2"
										>
											Email Address
										</label>
										<input
											type="email"
											id="email"
											className="w-full px-4 py-3 bg-gray-50 dark:bg-[#1a1b23] border border-gray-200 dark:border-[#2a2b33] rounded-xl text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brandBlue1 focus:border-transparent transition-colors"
											placeholder="your@email.com"
											value={email}
											onChange={(e) => setEmail(e.target.value)}
											required
										/>
									</div>
								</div>

								<div>
									<label
										htmlFor="message"
										className="block text-sm font-medium text-black dark:text-white mb-2"
									>
										Message
									</label>
									<textarea
										id="message"
										rows={4}
										className="w-full px-4 py-3 bg-gray-50 dark:bg-[#1a1b23] border border-gray-200 dark:border-[#2a2b33] rounded-xl text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brandBlue1 focus:border-transparent transition-colors resize-none"
										placeholder="How can we help you?"
										value={message}
										onChange={(e) => setMessage(e.target.value)}
										required
									></textarea>
								</div>

								<button
									type="submit"
									disabled={loading}
									className="w-full py-3 px-6 bg-brandBlue1 hover:bg-brandBlue1/90 text-white font-semibold rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-brandBlue1 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-[#0a0b14] disabled:opacity-50 disabled:cursor-not-allowed"
								>
									{loading ? "Sending..." : "Send Message"}
								</button>
							</form>

							{/* Alerts */}
							{error && (
								<div className="mt-4">
									<Alert type="warning" message={error} />
								</div>
							)}
							{success && (
								<div className="mt-4">
									<Alert type="success" message={success} />
								</div>
							)}
						</div>
					</div>

					{/* Support Image/Illustration */}
					<div className="lg:sticky lg:top-8">
						<img src={supportImage} alt="support" className="rounded-3xl" />
					</div>
				</div>
			</div>
		</section>
	);
}
