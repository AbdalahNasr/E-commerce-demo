import React, { useState } from 'react';

const SearchForm = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform search logic here with the search term
    console.log('Search term:', searchTerm);
    // Reset the search term
    setSearchTerm('');
  };

  return (
    <form onSubmit={handleSubmit} className='w-75 mx-auto my-5'>
      <input
      className='form-control'
        type="text"
        placeholder="Enter search term"
        value={searchTerm}
        onChange={handleInputChange}
      />
<button className='btn bg-main text-light my-3'>search</button>
    </form>
  );
};

export default SearchForm;