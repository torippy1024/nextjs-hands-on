import Footer from '../Footer';
import Header from '../Header';
import {ReactNode} from 'react';

type LayoutType = {
  children: ReactNode;
};

const Layout = ({children}: LayoutType) => {
  return (
    <div data-theme='light' className='flex flex-col min-h-screen'>
      <Header />
      <div className='grow container mx-auto my-4 px-4'>{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
