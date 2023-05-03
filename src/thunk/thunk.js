import axios from "axios";

const BASE_URL = "https://pokeapi.co/api/v2/";

const instance = axios.create({
  baseURL: BASE_URL,
});

export const getAllPokemonsThunk = (params) => (dispatch) => {
  dispatch({ type: "LOADER_START" });
  instance
    .get(params)
    .then(({ data }) => dispatch({ type: "GET_POKEMONS", payload: data }));
};

export const getTypesThunk = (params) => (dispatch) => {
  dispatch({ type: "LOADER_START" });
  instance
    .get(params)
    .then(({ data }) => dispatch({ type: "GET_TYPES", payload: data }));
};

export const getPokemonItemThunk = (params) => async (dispatch) => {
  dispatch({ type: "LOADER_START_MODAL" });
  instance
    .get(params)
    .then(({ data }) => dispatch({ type: "GET_POKEMON_ITEM", payload: data }));
};

export const filterPokemon = (params) => async (dispatch) => {
  dispatch({ type: "LOADER_START" });
  instance.get(params).then(async ({ data }) => {
    const items = await data?.pokemon.map((el) => el.pokemon);
    dispatch({ type: "FILTER_POKEMON", payload: items });
  });
};
