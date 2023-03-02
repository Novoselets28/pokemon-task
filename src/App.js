import React, { useState, useEffect } from 'react';
import axios from 'axios';
import cheerio from 'cheerio';

const PokemonList = () => {
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('https://scrapeme.live/shop/');
      const $ = cheerio.load(result.data);

      const pokemonList = $('.product-small')
        .map((i, el) => {
          const id = parseInt($(el).find('.product-small__id').text());
          const name = $(el).find('.product-small__title').text();
          const price = $(el).find('.product-small__price').text();
          const sku = $(el).find('.product-small__sku').text();
          const image_url = $(el).find('.attachment-shop_catalog').attr('src');

          return { id, name, price, sku, image_url };
        })
        .get();

      setPokemon(pokemonList);
    };

    fetchData();
  }, []);

  return (
    <ul>
      {pokemon.map((p) => (
        <li key={p.id}>
          <h2>{p.name}</h2>
          <img src={p.image_url} alt={p.name} />
          <p>Price: {p.price}</p>
          <p>SKU: {p.sku}</p>
        </li>
      ))}
    </ul>
  );
};

export default PokemonList;

