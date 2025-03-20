import ContactUs from "../components/ContactUs";
import Footer from "../components/Footer";
import Hero2 from "../components/Hero2";
import Navbar from "../components/Navbar";
import SEO from "../components/SEO";
import { contactHero } from "../util/utils";

export default function Contact() {
	return (
		<>
			<SEO
				title="Bold Fitness NG | Be Bold. Fit. Unstoppable | Contact us 🏋"
				description="Step into a world where the beat of determination meets the rhythm of wellness."
				url="https://boldfitnessng.net"
			/>

			<div className="bg-bg relative">
				<Navbar />
				<Hero2 data={contactHero} />
				<ContactUs />
				<Footer />
			</div>
		</>
	);
}
