import Affiliates from "../components/Affiliates";
import Exercises from "../components/Exercises";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Member from "../components/Member";
import Navbar from "../components/Navbar";
import OurTeam from "../components/OurTeam";
import Pricing from "../components/Pricing";
import Product from "../components/Product";
import Programs from "../components/Programs";
import Vision from "../components/Vision";

export default function Home() {
	return (
		<div className="bg-blue-50 dark:bg-bg relative">
			<Navbar />
			<Hero />
			<Programs />
			<Member />
			<OurTeam />
			<Exercises />
			<Pricing />
			<Vision />
			<Affiliates />
			<Product />
			<Footer />
		</div>
	);
}
