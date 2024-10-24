import { Poppins, Montserrat, Michroma } from "next/font/google";
import "./globals.css";

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={`${poppins.variable} ${montserrat.variable} ${michroma.variable}`}>{children}</body>
		</html>
	);
}
