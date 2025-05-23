interface PageContentProps {
  title: string;
  children: React.ReactNode;
}

const PageContent: React.FC<PageContentProps> = ({ title, children }) => {
  return (
    <div>
    <h1>{ title } </h1>
      { children }
  </div>
  );
}

export default PageContent;