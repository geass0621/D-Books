const About: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12">
      <h1 className="text-4xl font-bold mb-4">About This Project</h1>
      <p className="text-lg text-center max-w-2xl mb-4">
        <span className="font-semibold">D-Books</span> is a full-stack demo bookstore application built by{" "}
        <span className="font-semibold">Dong Cuong</span> as a portfolio project. The goal is to showcase modern web development skills, including authentication, payments, admin/user roles, and a responsive, user-friendly UI.
      </p>
      <div className="bg-base-200 rounded-lg p-6 mb-4 w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-2">Key Features</h2>
        <ul className="list-disc list-inside text-left text-base">
          <li>Authentication with JWT (user & admin roles)</li>
          <li>Stripe payment integration (secure checkout)</li>
          <li>Cart sync between frontend (Redux/localStorage) & backend (MongoDB)</li>
          <li>Book browsing, search, and responsive design</li>
          <li>Admin dashboard for book & order management</li>
          <li>Order history, skeleton loaders, toasts, and more</li>
        </ul>
      </div>
      <div className="bg-base-200 rounded-lg p-6 mb-4 w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-2">Tech Stack</h2>
        <ul className="list-disc list-inside text-left text-base">
          <li>Frontend: React, Redux Toolkit, React Router, Tailwind CSS, Vite</li>
          <li>Backend: Node.js, Express, MongoDB, Stripe API</li>
        </ul>
      </div>
      <p className="text-base text-center max-w-2xl mb-2">
        <span className="font-semibold">About the Developer:</span> I am a passionate web developer focused on building robust, scalable, and user-centric applications. Connect with me on{" "}
        <a href="https://github.com/your-github" className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">GitHub</a> or{" "}
        <a href="mailto:dongcuong0621@gmail.com" className="text-blue-500 underline">email: dongcuong0621@gmail.com</a>.
      </p>
      <p className="text-sm text-gray-500 text-center">This project is for demonstration purposes only. No real purchases are processed.</p>
    </div>
  );
}

export default About;