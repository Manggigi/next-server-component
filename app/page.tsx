"use client";
import React, { useEffect } from "react";

type Props = {
  params: {};
  searchParams: { [key: string]: string | string[] | undefined };
};

const Pokedex = (props: Props) => {
  const { params, searchParams } = props;

  const [pageNumber, setPageNumber] = React.useState(
    parseInt(searchParams.offset as string) || 0
  );
  const [pokemons, setPokemons] = React.useState<
    { name: string; url: string }[]
  >([]);

  const pokemonsCount = 60;

  useEffect(() => {
    async function getPokemons() {
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${pokemonsCount}&offset=${
          pokemonsCount * pageNumber
        }`
      );
      const data = await res.json();
      setPokemons(data.results);
    }

    getPokemons();
  }, [pageNumber]);

  const handleNextPage = () => {
    // 1292 is the total number of pokemons, but 1017 is the last pokemon that has data
    if (pokemonsCount * pageNumber < 1017) {
      setPageNumber(pageNumber + 1);
    } else {
      alert("You are on the last page");
    }
  };

  const handlePreviousPage = () => {
    if (pokemonsCount * pageNumber > pokemonsCount - 1) {
      setPageNumber(pageNumber - 1);
    } else {
      alert("You are on the first page");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div>
        <button
          type="button"
          onClick={handlePreviousPage}
          style={{ marginRight: "1em" }}
        >
          Previous Page
        </button>
        <button type="button" onClick={handleNextPage}>
          Next Page
        </button>
      </div>

      <div style={{ marginTop: "1em" }}>
        <p>params: {JSON.stringify(params)}</p>
        <p>searchParams: {JSON.stringify(searchParams)}</p>
      </div>

      <ul style={{ marginTop: "1em" }}>
        {pokemons.map((pokemon) => (
          <a key={pokemon.name} href={`/${pokemon.name}`}>
            <li>
              <h1 key={pokemon.name}>{pokemon.name}</h1>
            </li>
          </a>
        ))}
      </ul>
    </div>
  );
};

export default Pokedex;
