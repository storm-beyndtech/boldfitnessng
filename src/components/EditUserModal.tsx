import { useEffect, useState } from "react";
import Alert from "./UI/Alert";

export default function EditUserModal({ userData, handleUserData }: any) {
  const [formData, setFormData] = useState<any>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
    gender: "",
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
    },
    plan: "",
    status: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const url = import.meta.env.VITE_REACT_APP_SERVER_URL;

  useEffect(() => {
    if (userData) {
      setFormData({
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        phoneNumber: userData.phoneNumber,
        dateOfBirth: userData.dateOfBirth,
        gender: userData.gender,
        address: {
          street: userData.address?.street || "",
          city: userData.address?.city || "",
          state: userData.address?.state || "",
          zipCode: userData.address?.zipCode || "",
        },
        plan: userData.plan,
        status: userData.status,
      });
    }
  }, [userData]);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    if (name.includes("address.")) {
      const field = name.split(".")[1];
      setFormData((prev: any) => ({
        ...prev,
        address: { ...prev.address, [field]: value },
      }));
    } else {
      setFormData((prev: any) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError(null);

    try {
      setLoading(true);
      const res = await fetch(`${url}/auth/${userData._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
      } else {
        throw new Error(data.message);
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${url}/auth/${userData._id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
        handleUserData(null);
      } else {
        throw new Error(data.message);
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black/30 backdrop-blur-lg fixed top-0 left-0 right-0 z-99999 flex items-center justify-center w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-screen max-h-full">
      <div className="relative w-full max-w-2xl max-h-full">
        <form onSubmit={handleSubmit} className="relative bg-white rounded-lg shadow dark:bg-boxdark">
          <div className="flex items-start justify-between p-4 border-b dark:border-gray-800">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Edit User</h3>
            <button
              onClick={() => handleUserData(null)}
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          <div className="p-6 space-y-6">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="firstName" className="editUserLabel !font-montserrat !text-xs dark:!text-gray-400">First Name</label>
                <input value={formData.firstName} onChange={handleInputChange} name="firstName" type="text" className="editUserInput !pl-3 font-sans" required />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="lastName" className="editUserLabel !font-montserrat !text-xs dark:!text-gray-400">Last Name</label>
                <input value={formData.lastName} onChange={handleInputChange} name="lastName" type="text" className="editUserInput !pl-3 font-sans" required />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="email" className="editUserLabel !font-montserrat !text-xs dark:!text-gray-400">Email</label>
                <input value={formData.email} onChange={handleInputChange} name="email" type="email" className="editUserInput !pl-3 font-sans" required />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="phoneNumber" className="editUserLabel !font-montserrat !text-xs dark:!text-gray-400">Phone Number</label>
                <input value={formData.phoneNumber} onChange={handleInputChange} name="phoneNumber" type="text" className="editUserInput !pl-3 font-sans" required />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="address.street" className="editUserLabel !font-montserrat !text-xs dark:!text-gray-400">Street</label>
                <input value={formData.address.street} onChange={handleInputChange} name="address.street" type="text" className="editUserInput !pl-3 font-sans" required />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="address.city" className="editUserLabel !font-montserrat !text-xs dark:!text-gray-400">City</label>
                <input value={formData.address.city} onChange={handleInputChange} name="address.city" type="text" className="editUserInput !pl-3 font-sans" required />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="plan" className="editUserLabel !font-montserrat !text-xs dark:!text-gray-400">Plan</label>
                <select name="plan" value={formData.plan} onChange={handleInputChange} className="editUserInput !pl-3 font-sans">
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="anually">Annually</option>
                </select>
              </div>
            </div>
            {error && <Alert type="danger" message={error} />}
            {success && <Alert type="success" message="User Updated Successfully" />}
          </div>

          <div className="flex items-center p-6 space-x-3 border-t border-gray-200 rounded-b dark:border-gray-800">
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
            <button
              onClick={handleDelete}
              className="text-white bg-red-600 hover:bg-red-700 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              {loading ? "Deleting..." : "Delete User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
