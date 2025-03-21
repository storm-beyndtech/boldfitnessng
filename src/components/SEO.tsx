import { Helmet } from "react-helmet";

interface SEOProps {
	title: string;
	description: string;
	url: string;
}

const SEO: React.FC<SEOProps> = ({ title, description, url }) => {
	return (
		<Helmet>
			<title>{title}</title>
			<meta name="description" content={description} />
			<meta
				name="keywords"
				content="bold fitness ng. boldfitness ng, bold fitness, be bold, Boldfitness ng, Transform your fitness journey with our bold fitness web app! Achieve your fitness goals with personalized workout plans, gym tracking, and home workouts. Whether you're into strength training, cardio workouts, or HIIT sessions, our app helps you build muscle, lose weight, and track progress. Join a vibrant fitness community, stay motivated, and embrace a healthy lifestyle with tools for nutrition tracking, exercise routines, and body transformation. Download the ultimate personal trainer app for fitness motivation and results! bold fitness in owerri, boldfitness in owerri, Owerri number 1 fitness brand, Nigeria fitness brands nigeria gym brands imo state fitness centers Gym in owerri gym in owerri fitness center near me fitness near me gym center near me Gym near me Exercise center Gym supplements fitness supplement "
			/>
			<meta name="robots" content="index, follow" />
			<meta property="og:title" content={title} />
			<meta property="og:description" content={description} />
			<meta property="og:url" content={url} />
			<meta property="og:image" content="https://www.boldfitnessng.net/logo.png" />
			<meta property="og:type" content="website" />
		</Helmet>
	);
};

export default SEO;
