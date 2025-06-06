const PaymentCancel: React.FC = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Payment Cancelled</h1>
      <p className="text-lg text-gray-700 mb-4">
        Your payment has been cancelled. If you have any questions, please contact our support team.
      </p>
      <a href="/books" className="btn btn-primary">
        Return to Books
      </a>
    </div>
  );
}

export default PaymentCancel;