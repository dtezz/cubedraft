import React, { useState } from 'react';

const Search = (props) => {
  const [image, setImage] = useState('');

  let cardImage;
  let card;
  const submit = async (e) => {
    e.preventDefault();
    if (e.target.id === 'search') {
      const name = e.target[0].value;
      try {
        const data = await fetch(
          `https://api.scryfall.com/cards/named?fuzzy=${name}`
        );
        const card = await data.json();
        cardImage = card.image_uris.normal;
        // console.log(card.image_uris);
        setImage(cardImage);
        e.target.reset();
      } catch (err) {
        alert('Card Name must be spelled correctly!');
      }
    } else if (e.target.id === 'random') {
      try {
        const data = await fetch(`https://api.scryfall.com/cards/random`);
        card = await data.json();
        cardImage = card.image_uris.normal;
        // console.log(card.image_uris);
        setImage(cardImage);
      } catch (err) {
        alert('Something went wrong!');
      }
    }
  };

  return (
    <div>
      <form id={'search'} onSubmit={submit}>
        <input
          type={'text'}
          name={'search'}
          placeholder="Enter Card Name"
        ></input>
        <input type={'submit'} name={'search'} value={'Search'}></input>
      </form>
      <button id={'random'} onClick={submit}>
        Give me a random card please!
      </button>
      <div>
        <img src={image} />
      </div>
    </div>
  );
};

export default Search;
