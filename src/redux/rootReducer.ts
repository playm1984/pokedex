type Pokemons = {
  name: string;
  url: string;
};

type GetPakemons = {
  results: Pokemons[];
  count: number;
};

type State = {
  pokemons: Pokemons[];
  count: number;
  data: Pokemons[];
  page: number;
  pageSize: number;
  loader: boolean;
  item: any;
  loaderModal: boolean;
  sort: "asc" | "desc";
  types: Pokemons[];
};

type Action<T extends string, P> = {
  type: T;
  payload: P;
};

type GetPokemon = Action<"GET_POKEMONS", GetPakemons>;
type GetPokemonItem = Action<"GET_POKEMON_ITEM", any>;
type LoaderStatus = Action<"LOADER_START", boolean>;
type LoaderStatusModal = Action<"LOADER_START_MODAL", boolean>;
type FilterPokemon = Action<"FILTER_POKEMON", any>;
type Pagination = Action<"USE_PAGINATION", { page: number; pageSize: number }>;
type SortPokemon = Action<"SORT_POKEMON", string>;
type GetTypes = Action<"GET_TYPES", GetPakemons>;

type Actions =
  | GetPokemon
  | LoaderStatus
  | GetPokemonItem
  | LoaderStatusModal
  | FilterPokemon
  | Pagination
  | SortPokemon
  | GetTypes;

const inisialState: State = {
  pokemons: [],
  count: 0,
  data: [],
  page: 0,
  pageSize: 20,
  loader: true,
  item: [],
  loaderModal: true,
  sort: "desc",
  types: [],
};

const rootReducer = (state: State = inisialState, action: Actions): State => {
  switch (action.type) {
    case "GET_POKEMONS": {
      const { count, results } = action.payload;

      return {
        ...state,
        pokemons: results.slice(0, 20),
        data: results,
        count,
        loader: false,
      };
    }

    case "GET_TYPES": {
      const { results } = action.payload;
      return {
        ...state,
        types: results,
      };
    }

    case "USE_PAGINATION": {
      const { page, pageSize } = action.payload;
      const newPokemons = state.data.slice(
        page * pageSize - pageSize,
        page * pageSize
      );

      return {
        ...state,
        page,
        pageSize,
        pokemons: newPokemons,
      };
    }

    case "GET_POKEMON_ITEM": {
      return {
        ...state,
        loaderModal: false,
        item: action.payload,
      };
    }

    case "FILTER_POKEMON": {
      return {
        ...state,
        pokemons: action.payload,
        count: action.payload.length,
        loader: false,
      };
    }

    case "SORT_POKEMON": {
      return {
        ...state,
        pokemons: state.data.sort((a, b) => {
          if (action.payload === "asc") {
            return a.name > b.name ? 1 : -1;
          } else {
            return a.name > b.name ? -1 : 1;
          }
        }),
      };
    }

    case "LOADER_START": {
      return {
        ...state,
        loader: true,
      };
    }

    case "LOADER_START_MODAL": {
      return {
        ...state,
        loaderModal: true,
      };
    }

    default:
      return state;
  }
};

export { rootReducer };
