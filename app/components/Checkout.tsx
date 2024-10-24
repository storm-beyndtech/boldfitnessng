import React, { useState } from 'react';
// import { useRouter } from 'next/router';
import { initiatePayment } from '@/services/payment';
import { UserData } from '@/types/types';
import { PAYMENT_PLANS } from '../utils/utils';
import { CustomerInformation, OrderSummary } from './CheckoutComponents';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import styles
import Alert from './UI/Alert';

interface CheckoutProps {
  userData: UserData;
  onPaymentSuccess: (reference: string) => void;
  onPaymentError: (error: string) => void;
}

export const Checkout: React.FC<CheckoutProps> = ({
  userData,
  onPaymentSuccess,
  onPaymentError,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  // const router = useRouter();
  const plan = PAYMENT_PLANS.find(_ => _.id === userData.plan);

  const handlePayment = async () => {
    if (isProcessing) return;

    setIsProcessing(true);
    try {
      const { authorizationUrl, reference } = await initiatePayment(userData);
      
      // Store reference in localStorage for verification after redirect
      localStorage.setItem('paymentReference', reference);
      
      // Redirect to Paystack checkout
      window.location.href = authorizationUrl;
    } catch (error) {
      onPaymentError(error instanceof Error ? error.message : 'Payment initialization failed');
      
      // Display error toast using react-toastify
      toast.error('Failed to initiate payment. Please try again.', {
        position: "top-right", // You can change the position
        autoClose: 5000, // Automatically close after 5 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (!plan) {
    return (
      <Alert type='warning' message='Invalid plan selected'/>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <OrderSummary plan={plan} />
          <CustomerInformation userData={userData} />
          
          <button
            onClick={handlePayment}
            disabled={isProcessing}
            className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 
                     focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 
                     transition-colors font-semibold text-lg disabled:opacity-50"
          >
            {isProcessing ? 'Processing...' : `Pay $${(plan.amount / 100).toFixed(2)}`}
          </button>

          <div className="mt-4 text-center text-sm text-gray-600">
            <p>Secure payment powered by Paystack</p>
          </div>
        </div>
      </div>

      {/* ToastContainer to display the toasts */}
      <ToastContainer />
    </div>
  );
};
