const Footer: React.FC = () => {
  return (
    <footer className="bg-base-100  py-4 mt-8">
      <div className="container mx-auto text-center">
        <p className="text-sm">© {new Date().getFullYear()} BookStore. All rights reserved.</p>
        <p className="text-xs mt-2">Built with ❤️ using React and TypeScript</p>
      </div>
    </footer>
  );
}

export default Footer;