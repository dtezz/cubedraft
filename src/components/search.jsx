import React, { useState } from 'react';

const Search = (props) => {
  const [card, setCard] = useState({ image_uris: { normal: '' } });
  const [favorites, setFavorites] = useState([]);

  let cardImage;
  const submit = async (e) => {
    e.preventDefault();
    if (e.target.id === 'search') {
      const name = e.target[0].value;
      try {
        let data = await fetch(
          `https://api.scryfall.com/cards/named?fuzzy=${name}`
        );
        data = await data.json();
        setCard(data);
        e.target.reset();
        return;
      } catch (err) {
        alert('Card Name must be spelled correctly!');
        return;
      }
    } else if (e.target.id === 'random') {
      try {
        let data = await fetch(`https://api.scryfall.com/cards/random`);
        data = await data.json();
        setCard(data);
        return;
      } catch (err) {
        alert('Something went wrong!');
        return;
      }
    } else if (e.target.id === 'favorites') {
      if (!card.name) {
        alert("??? There isn't a card, dummy");
        return;
      } else {
        // console.log(card.name);
        let body = { cardName: card.name, image: card.image_uris.normal };
        body = JSON.stringify(body);
        const response = await fetch('/favorites', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: body,
        });
        if (response.status === 401) {
          alert("you ain't authorized, pal");
        }
      }
    }
  };

  const getFavorites = async () => {
    let response = await fetch('/favorites');
    if (response.status === 401) {
      alert("you ain't authorized, pal");
    }
    response = await response.json();
    // console.log(response[0].image);
    let placeholder = [];
    for (let i = 0; i < response.length; i++) {
      placeholder.push(<img src={`${response[i].image}`} />);
    }
    setFavorites(placeholder);
  };

  const removeFavorites = () => {
    setFavorites([]);
  };

  return (
    <div>
      <div className="searchBar">
        Search bar:
        <form id={'search'} onSubmit={submit}>
          <input
            type={'text'}
            name={'search'}
            placeholder="Enter Card Name"
          ></input>
          <input type={'submit'} name={'search'} value={'Go!'}></input>
        </form>
      </div>
      <div>
        <button id={'random'} onClick={submit}>
          Give me a random card please!
        </button>
      </div>
      <div>
        <img src={card.image_uris.normal} />
      </div>
      <button id={'favorites'} onClick={submit}>
        Add to favorites
      </button>
      <div>
        <button id={'userfavorites'} onClick={getFavorites}>
          See my favorites
        </button>
        <button id={'removefavorites'} onClick={removeFavorites}>
          Okay I've seen enough
        </button>
      </div>
      <div>{favorites}</div>
    </div>
  );
};

export default Search;
