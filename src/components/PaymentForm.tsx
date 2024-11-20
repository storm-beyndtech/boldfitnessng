import { useState, ChangeEvent, FormEvent } from "react";

type FormData = {
  fullName: string;
  cardNumber: string;
  expiration: string;
  cvv: string;
};

type Errors = {
  fullName?: string;
  cardNumber?: string;
  expiration?: string;
  cvv?: string;
};

export default function PaymentForm() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    cardNumber: "",
    expiration: "",
    cvv: "",
  });

  const [errors, setErrors] = useState<Errors>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const validateForm = (): boolean => {
    const newErrors: Errors = {};

    if (!formData.fullName) newErrors.fullName = "Full name is required.";
    if (!formData.cardNumber || !/^4[0-9]{12}(?:[0-9]{3})?$/.test(formData.cardNumber))
      newErrors.cardNumber = "Enter a valid Visa card number.";
    if (!formData.expiration || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiration))
      newErrors.expiration = "Enter a valid expiration date (MM/YY).";
    if (!formData.cvv || !/^\d{3}$/.test(formData.cvv))
      newErrors.cvv = "Enter a valid 3-digit CVV.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form data submitted:", formData);
      // Handle the payment processing here
    }
  };

  return (
    <section className="bg-white py-8">
      <div className="mx-auto max-w-screen-xl px-4">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">Payment</h2>
          <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12">
            <form onSubmit={handleSubmit} className="w-full rounded-lg border border-gray-200 bg-white p-6 shadow-sm lg:max-w-xl">
              <div className="mb-6 grid grid-cols-2 gap-4">
                {/* Full name input */}
                <div className="col-span-2 sm:col-span-1">
                  <label htmlFor="fullName" className="mb-2 block text-sm font-medium text-gray-900">
                    Full name (as displayed on card)*
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
                    placeholder="Bonnie Green"
                    required
                  />
                  {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
                </div>

                {/* Card number input */}
                <div className="col-span-2 sm:col-span-1">
                  <label htmlFor="cardNumber" className="mb-2 block text-sm font-medium text-gray-900">
                    Card number*
                  </label>
                  <input
                    type="text"
                    id="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
                    placeholder="xxxx-xxxx-xxxx-xxxx"
                    required
                  />
                  {errors.cardNumber && <p className="text-red-500 text-sm">{errors.cardNumber}</p>}
                </div>

                {/* Expiration date input */}
                <div>
                  <label htmlFor="expiration" className="mb-2 block text-sm font-medium text-gray-900">
                    Card expiration*
                  </label>
                  <input
                    type="text"
                    id="expiration"
                    value={formData.expiration}
                    onChange={handleChange}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
                    placeholder="MM/YY"
                    required
                  />
                  {errors.expiration && <p className="text-red-500 text-sm">{errors.expiration}</p>}
                </div>

                {/* CVV input */}
                <div>
                  <label htmlFor="cvv" className="mb-2 block text-sm font-medium text-gray-900">
                    CVV*
                  </label>
                  <input
                    type="text"
                    id="cvv"
                    value={formData.cvv}
                    onChange={handleChange}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
                    placeholder="•••"
                    required
                  />
                  {errors.cvv && <p className="text-red-500 text-sm">{errors.cvv}</p>}
                </div>
              </div>

              <button type="submit" className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300">
                Pay now
              </button>
            </form>

            <div className="mt-6 grow sm:mt-8 lg:mt-0">
              <div className="space-y-4 rounded-lg border border-gray-100 bg-gray-50 p-6">
                <div className="space-y-2">
                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500">Original price</dt>
                    <dd className="text-base font-medium text-gray-900">$6,592.00</dd>
                  </dl>
                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500">Savings</dt>
                    <dd className="text-base font-medium text-green-500">-$299.00</dd>
                  </dl>
                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500">Store Pickup</dt>
                    <dd className="text-base font-medium text-gray-900">$99</dd>
                  </dl>
                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500">Tax</dt>
                    <dd className="text-base font-medium text-gray-900">$799</dd>
                  </dl>
                </div>
                <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2">
                  <dt className="text-base font-bold text-gray-900">Total</dt>
                  <dd className="text-base font-bold text-gray-900">$7,191.00</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
