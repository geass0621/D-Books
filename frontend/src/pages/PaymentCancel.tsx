const PaymentCancel: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Payment Cancelled</h1>
      <p className="text-gray-600 mb-6">Your payment has been cancelled. If this was a mistake, you can try again.</p>
      <a href="/" className="text-blue-500 hover:underline">Return to Home</a>
    </div>
  );
}

export default PaymentCancel;