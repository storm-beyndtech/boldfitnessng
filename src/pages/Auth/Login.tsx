import { useState, ChangeEvent, FormEvent } from "react";
import { baseImageUrl } from "../../util/utils";
import Alert from "../../components/UI/Alert";
import { Link, useNavigate } from "react-router-dom";
import eye from "../../assets/eye.svg";
import eyeSlash from "../../assets/eye-slash.svg";
import Btn from "../../components/UI/Btn";
import { sendRequest } from "../../util/sendRequest";
import { contextData } from "../../context/AuthContext";

const Login = () => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const { login } = contextData();
	const navigate = useNavigate();

	// Function to toggle password visibility
	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
		setError(null);
		const { id, value } = e.target;
		setFormData((prev) => ({ ...prev, [id]: value }));
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault();
		setError(null);
		setLoading(true);

		try {
			const res = await sendRequest("/auth/login", "POST", {
				email: formData.email,
				password: formData.password,
			});
			login(res);
			navigate("/admin");
		} catch (error:any) {
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex bg-gray-100 max-sm:bg-white min-h-screen">
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
							<p className="mt-2 text-gray-400 text-xs pl-1">Welcome Back 👋</p>
							<h1 className="text-[2.5rem] font-semibold text-gray-800 font-montserrat">Login</h1>
						</div>
					</div>

					<form onSubmit={handleSubmit} className="min-w-[300px] space-y-6">
						<div>
							<label htmlFor="email" className="inputLabel">
								Email
							</label>
							<input
								id="email"
								value={formData.email}
								onChange={handleChange}
								className="input"
								placeholder="name@example.com"
								type="email"
								required
							/>
						</div>

						<label className="inputLabel relative">
							Password
							<input
								value={formData.password}
								onChange={(e) => handleChange(e)}
								type={showPassword ? "text" : "password"}
								className="input pr-10 mt-1.5"
								placeholder="••••••••"
								required
								id="password"
								autoComplete="new-password"
							/>
							<span
								onClick={togglePasswordVisibility}
								className="absolute right-3 top-[50%] translate-y-1 cursor-pointer"
							>
								{showPassword ? <img src={eyeSlash} alt="eye" /> : <img src={eye} alt="eye" />}
							</span>
						</label>

						{error && <Alert type="danger" message={error} />}

						<Btn type="auth" label="Login" disabled={loading} btnAction="submit" />

						{/* <div className="flex gap-2 mb-6">
							<p className="text-sm font-semibold">
								Forgot Password?{" "}
								<a href="#" className="text-blue-600">
									Reset
								</a>
							</p>
						</div> */}
					</form>
				</div>
			</div>

			{/* Right: Image Section */}
			<div className="h-screen overflow-y-hidden hidden lg:flex justify-end w-1/2  sticky top-0 right-0">
				<img
					src={`${baseImageUrl}auth-bg.svg?alt=media`}
					alt="Auth right background"
					className="w-full object-top object-cover"
				/>
			</div>
		</div>
	);
};

export default Login;
