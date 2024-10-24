import { Poppins, Montserrat, Michroma } from "next/font/google";
import "./globals.css";
import { Metadata } from "next";

const poppins = Poppins({
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
	subsets: ["latin"],
	variable: "--font-poppins",
	display: "swap",
});

const montserrat = Montserrat({
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
	subsets: ["latin"],
	variable: "--font-montserrat",
	display: "swap",
});

const michroma = Michroma({
	weight: ["400"],
	subsets: ["latin"],
	variable: "--font-michroma",
	display: "swap",
});

export const metadata: Metadata = {
	title: "Bold Fitness NG",
	description: "Step into a world where the beat of determination meets the rhythm of wellness.",
	// Open Graph Meta Tags for Social Media Previews
	openGraph: {
		title: "Bold Fitness NG",
		description: "Step into a world where the beat of determination meets the rhythm of wellness.",
		url: "https://boldfitnessng.net", // Your website URL
		siteName: "Bold Fitness NG",
		images: [
			{
				url: "https://firebasestorage.googleapis.com/v0/b/boldfitness-ed634.appspot.com/o/meta-seo.png?alt=media",
				width: 1200,
				height: 630,
				alt: "Bold Fitness NG Cover Image",
			},
		],
		locale: "en_US",
		type: "website",
	},
	// Twitter Card Meta Tags for better Twitter previews
	twitter: {
		card: "summary_large_image",
		title: "Bold Fitness NG",
		description: "Step into a world where the beat of determination meets the rhythm of wellness.",
		images: ["https://firebasestorage.googleapis.com/v0/b/boldfitness-ed634.appspot.com/o/meta-seo.png?alt=media"],
	},
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={`${poppins.variable} ${montserrat.variable} ${michroma.variable}`}>{children}</body>
		</html>
	);
}
