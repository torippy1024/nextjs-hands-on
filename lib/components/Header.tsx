import Head from 'next/head';
import {AiOutlineDown, AiOutlineMenu} from 'react-icons/ai';

type MenuType = {
  horizontal: boolean;
};

const Header = () => {
  const baseUrl = '/nextjs-hands-on';
  const Menu = ({horizontal}: MenuType) => 
    <ul className={`menu ${horizontal ? 'menu-horizontal' : 'bg-base-200'} p-0`}>
      <li><a>hoge1</a></li>
      <li><a>hoge2</a></li>
      <li tabIndex={0}>
        <a>
          Parent
          <AiOutlineDown />
        </a>
        <ul className='p-2 bg-base-200'>
          <li><a>Submenu 1</a></li>
          <li><a>Submenu 2</a></li>
        </ul>
      </li>
    </ul>;

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href={baseUrl+'/favicon.ico'} />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      </Head>
      <div className='navbar bg-base-200'>
        <div className='md:hidden flex-none'>
          <ul className='menu menu-horizontal p-0 bg-base-200'>
            <li tabIndex={0} className='z-10'>
              <a>
                <AiOutlineMenu />
              </a>
              <Menu horizontal={false} />
            </li>
          </ul>
        </div>
        <div className='flex-1'>
          <a className='btn btn-ghost normal-case text-xl'>Next.js</a>
        </div>
        <div className='hidden md:block flex-none'>
          <ul className='menu menu-horizontal p-0'>
            <Menu horizontal={true} />
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;