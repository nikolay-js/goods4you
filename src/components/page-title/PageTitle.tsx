import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface IPageTitle {
  title: string;
};

const PageTitle: React.FC<IPageTitle> = ({ title }) => {
  const location = useLocation();

  useEffect(() => {
    document.title = title;
  }, [location, title]);

  return null;
};

export default PageTitle;