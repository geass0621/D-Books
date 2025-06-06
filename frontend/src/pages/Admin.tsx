const Admin: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-12">
      <h1 className="text-4xl font-bold mb-4">Admin Dashboard</h1>
      <p className="text-lg text-center max-w-2xl mb-4">
        This is the admin dashboard where you can add books and orders.
      </p>
      <div className="bg-base-300 rounded-lg p-6 mb-4 w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-2">Admin Features</h2>
        <ul className="list-disc list-inside text-left text-base">
          <li>Add Books</li>
          <li>View Orders</li>
        </ul>
      </div>
    </div>
  );
}

export default Admin;