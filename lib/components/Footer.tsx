import { AiFillCalculator, AiOutlineTwitter, AiFillFacebook, AiFillYoutube, AiFillGithub } from 'react-icons/ai';

const Footer = () => {
  return (
    <footer className="footer items-center p-4 bg-neutral text-neutral-content">
      <div className="items-center grid-flow-col">
        <AiFillCalculator size={32} />
        <p>Copyright © 2022 - All right reserved</p>
      </div> 
      <div className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
        <a href="https://github.com/torippy1024" target="_blank" rel="noopener noreferrer"><AiFillGithub size={24} /></a>
      </div>
    </footer>
  );
};

export default Footer;