import {AiFillCalculator, AiFillGithub} from 'react-icons/ai';

const Footer = () => {
  return (
    <footer className='footer p-4 bg-neutral text-neutral-content flex items-center justify-between'>
      <div className='items-center grid-flow-col'>
        <AiFillCalculator size={32} />
        <p>©torippy 2022</p>
      </div>
      <div className='grid-flow-col gap-4'>
        <a
          href='https://github.com/torippy1024'
          target='_blank'
          rel='noopener noreferrer'
        >
          <AiFillGithub size={24} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
