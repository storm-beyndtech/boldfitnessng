export interface NavItems {
	to: string;
	label: string;
	icons: { default: any; active: any };
}

export interface UserData {
  _id?: string;
	plan: string | "monthly" | "quarterly" | "anually"| "none";
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber: string;
	dateOfBirth: string;
	gender: string | "Male" | "Female" | "Other"| "none";
	address: {
		street: string;
		city: string;
		state: string;
		zipCode: string;
  };
  status?: "active" | "pending" | "expired";
  accountType: 'admin' | 'member' | string
}

export interface Plan {
	_id?: string;
	name: string;
	price: number;
	features: string[];
	duration: number;
}

export interface PaymentInitiateResponse {
	authorizationUrl: string;
	reference: string;
}
