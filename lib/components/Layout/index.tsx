import Footer from '../Footer';
import Header from '../Header';
import {ReactNode} from 'react';

type LayoutType = {
  children: ReactNode;
  headerElements: JSX.Element[];
};

const Layout = ({children, headerElements}: LayoutType) => {
  return (
    <div data-theme='light' className='flex flex-col min-h-screen'>
      <Header elements={headerElements} />
      <div className='grow container mx-auto my-4 px-4 max-w-3xl'>
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
