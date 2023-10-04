import React, { useState } from 'react';

const Search = (props) => {
  const [image, setImage] = useState('');

  let cardImage = null;
  const submit = async (e) => {
    e.preventDefault();
    const name = e.target[0].value;
    try {
      const data = await fetch(
        `https://api.scryfall.com/cards/named?fuzzy=${name}`
      );
      const card = await data.json();
      cardImage = card.image_uris.normal;
      console.log(card.image_uris);
      setImage(cardImage);
    } catch (err) {
      alert('Card Name must be spelled correctly!');
    }
    e.target.reset();
  };

  return (
    <div>
      <form onSubmit={submit}>
        <input
          type={'text'}
          name={'search'}
          placeholder="Enter Card Name"
        ></input>
        <input type={'submit'} value={'Search'} id={'search'}></input>
      </form>
      <div>
        <img src={image} />
      </div>
    </div>
  );
};

export default Search;
