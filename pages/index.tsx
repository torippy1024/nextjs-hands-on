import type {NextPage} from 'next';
import Footer from '../lib/components/Footer';
import Header from '../lib/components/Header';

const Home: NextPage = () => {
  return (
    <div data-theme='light' className='flex flex-col min-h-screen'>
      <Header />
      <div className='grow container mx-auto my-4 px-4'>
        hogehoge
      </div>
      <Footer />
    </div>
  );
};

export default Home;
