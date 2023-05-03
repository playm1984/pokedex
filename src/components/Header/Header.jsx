import React from "react";
import { Space, Select, Typography, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getAllPokemonsThunk } from "../../thunk/thunk";
import style from "../style.module.css";
import { filterPokemon } from "../../thunk/thunk";

const Header = () => {
  const dispatch = useDispatch();
  const { types } = useSelector((state) => state);

  const handleChange = (value) => {
    dispatch({ type: "SORT_POKEMON", payload: value });
  };

  const changeType = (params) => {
    dispatch(filterPokemon(params));
  };
  return (
    <>
      <Space className={style.header}>
        <h1>Pokedex</h1>
        <div className={style.sort_wrapper}>
          <Typography>Sort by Name:</Typography>
          <Select
            className={style.sort_select}
            title="Sort by Name:"
            style={{ width: 120 }}
            onChange={handleChange}
            options={[
              { value: "asc", label: "A-Z" },
              { value: "deck", label: "Z-A" },
            ]}
          />
          <Button
            onClick={() =>
              dispatch(getAllPokemonsThunk(`pokemon?limit=100000&offset=0`))
            }
          >
            All Pokemons
          </Button>
        </div>
      </Space>
      <Space className={style.types}>
        {types.map((el) => (
          <Button size="small" onClick={() => changeType(el.url)}>
            {el.name}
          </Button>
        ))}
      </Space>
    </>
  );
};

export default Header;
