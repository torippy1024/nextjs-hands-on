import {NextRouter, Router} from 'next/router';
import {useState} from 'react';

type SearchBoxType = {
  router: NextRouter;
};

const SearchBox = ({router}: SearchBoxType) => {
  const [input, setInput] = useState('');
  return (
    <form
      className='form-control'
      onSubmit={(e) => {
        e.preventDefault();
        router.push({
          pathname: '/search',
          query: {
            q: input,
          },
        });
      }}
    >
      <div className='input-group'>
        <input
          type='text'
          className='border-2 px-2'
          value={input}
          placeholder='Search…'
          onChange={(e) => setInput(e.target.value)}
          onSubmit={() => alert('hoge')}
        />
        <button className='btn btn-square'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
            />
          </svg>
        </button>
      </div>
    </form>
  );
};

export default SearchBox;
