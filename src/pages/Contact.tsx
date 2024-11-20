import ContactUs from "../components/ContactUs";
import Footer from "../components/Footer";
import Hero2 from "../components/Hero2";
import Navbar from "../components/Navbar";
import { contactHero } from "../util/utils";

export default function Contact() {
	return (
		<div className="bg-bg relative">
			<Navbar />
			<Hero2 data={contactHero} />
			<ContactUs />
			<Footer />
		</div>
	);
}
