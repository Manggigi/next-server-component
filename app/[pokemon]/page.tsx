import Image from "next/image";
import PokeAPI from "pokeapi-typescript";

async function getPokemon(nameOrId: string) {
  const result = await PokeAPI.Pokemon.resolve(nameOrId);
  // include
  return {
    name: result.name,
    sprites: result.sprites,
    id: result.id,
  };
}

type Props = {
  params: { pokemon: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

const Pokemon = async (props: Props) => {
  const { params, searchParams } = props;
  const pokemon = await getPokemon(params.pokemon);

  return (
    <>
      <a href="/" type="button">
        back
      </a>
      <div style={{ marginTop: "1em" }}>
        <p>params: {JSON.stringify(params)}</p>
        <p>searchParams: {JSON.stringify(searchParams)}</p>
        {/* <p>data: {JSON.stringify(pokemon, null, 2)}</p> */}
      </div>

      <p style={{ marginTop: "2em" }}>{pokemon.name}</p>
      <p>{pokemon.id}</p>
      <Image
        src={pokemon.sprites.front_default || ""}
        alt={pokemon.name}
        width={100}
        height={100}
      />
    </>
  );
};

export default Pokemon;
