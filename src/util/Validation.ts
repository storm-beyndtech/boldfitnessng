import { UserData } from "../types/types";

export const validateForm = (formData: UserData): string => {
	if (formData.plan === "none") return "Please select a membership plan";
	if (formData.firstName.length < 2) return "Please enter your first name";
	if (formData.lastName.length < 2) return "Please enter your last name";
	if (!formData.email.includes("@")) return "Please enter a valid email address";
	if (formData.phoneNumber.length < 10) return "Please enter a valid phone number";
	if (formData.gender === "none") return "Please select your gender";
	if (formData.dateOfBirth === "") return "Please enter your date of birth";
	if (formData.address.street.length < 5) return "Please enter your street address";
	if (formData.address.city.length < 2) return "Please enter your city";
	if (formData.address.state === "none") return "Please select your state";
	if (formData.address.zipCode.length < 5) return "Please enter a valid ZIP code";
	if (formData.accountType.length < 5) return "invalid account type";
	return "success";
};
