import { useState } from "react";
import Alert from "./UI/Alert";

export default function ContactUs() {
	const [fullName, setFullName] = useState("");
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState("");
	const url = import.meta.env.VITE_REACT_APP_SERVER_URL;

	const sendMessage = async (e: any) => {
		e.preventDefault();
		setError("");

		if (fullName.length < 5) return setError("Full name must be at least 5 characters");
		if (email.length < 5 || !email.includes("@")) return setError("Not a valid email address");
		if (fullName.length < 5) return setError("Message must be at least 5 characters");

		try {
			setLoading(true);
			const res = await fetch(`${url}/contact`, {
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
		<section className="bg-gray-100 py-20">
			<div className="py-5 px-4 mx-auto max-w-screen-sm">
				<p className="mb-2 font-medium font-montserrat text-gray-500 text-xl max-sm:hidden">Got a technical issue?</p>
        <h2 className="mb-10 font-montserrat text-6xl font-bold text-gray-900">Chat <span className="max-sm:block">With Us.</span></h2>
				<form onSubmit={sendMessage} className="space-y-8">
					<div>
						<label
							htmlFor="fullName"
							className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
						>
							Full Name
						</label>
						<input
							type="text"
							id="fullName"
							className="input"
							placeholder="Jane Doe"
							value={fullName}
							onChange={(e) => setFullName(e.target.value)}
							required
						/>
					</div>

					<div>
						<label
							htmlFor="email"
							className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
						>
							Your email
						</label>
						<input
							type="email"
							id="email"
							className="input"
							placeholder="name@gmail.com"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</div>

					<div className="sm:col-span-2">
						<label
							htmlFor="message"
							className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
						>
							Your message
						</label>
						<textarea
							id="message"
							rows={6}
							className="input"
							placeholder="Leave a comment..."
							value={message}
							onChange={(e) => setMessage(e.target.value)}
						></textarea>
					</div>
					<button
						type="submit"
						className="py-3 px-5 text-sm font-semibold font-montserrat text-center text-white rounded-lg bg-brandBlue3 sm:w-fit hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
					>
						{!loading ? "Send Message" : "Sending..."}
					</button>
				</form>
				{error.length > 0 && <Alert type="warning" message={error} />}
				{success.length > 0 && <Alert type="success" message={success} />}
			</div>
		</section>
	);
}
