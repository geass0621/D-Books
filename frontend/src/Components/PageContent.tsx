interface PageContentProps {
  title: string;
  children: React.ReactNode;
}

const PageContent: React.FC<PageContentProps> = ({ title, children }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      <div className="bg-base-100 p-6 rounded-lg shadow-md">
        {children}
      </div>
    </div>
  );
}

export default PageContent;