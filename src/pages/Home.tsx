import Affiliates from "../components/Affiliates";
import Exercises from "../components/Exercises";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Member from "../components/Member";
import Navbar from "../components/Navbar";
import Pricing from "../components/Pricing";
import Product from "../components/Product";
import Programs from "../components/Programs";
import SEO from "../components/SEO";
import Support from "../components/Support";
import Vision from "../components/Vision";

export default function Home() {
	return (
		<>
			<SEO
				title="Bold Fitness NG | Be Bold. Fit. Unstoppable 🏋"
				description="Step into a world where the beat of determination meets the rhythm of wellness."
				url="https://boldfitnessng.net"
			/>

			<div className="bg-blue-50 dark:bg-bg relative">
				<Navbar />
				<Hero />
				<Programs />
				<Member />
				<Support />
				<Exercises />
				<Pricing />
				<Vision />
				<Affiliates />
				<Product />
				<Footer />
			</div>
		</>
	);
}
