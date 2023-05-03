import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { CardItem } from "../components/Card/CardItem";
import styles from "./style.module.css";
import { Pagination } from "antd";
import { getAllPokemonsThunk, getTypesThunk } from "../thunk/thunk";
import { useDispatch } from "react-redux";

const Main = () => {
  const dispatch = useDispatch();
  const { pokemons, count } = useSelector((state) => state);

  const pagination = (page, pageSize) => {
    dispatch({ type: "USE_PAGINATION", payload: { page, pageSize } });
  };

  useEffect(() => {
    Promise.all([
      dispatch(getAllPokemonsThunk(`pokemon?limit=100000&offset=0`)),
      dispatch(getTypesThunk(`type`)),
    ]);
  }, []);

  return (
    <div>
      <div className={styles.pokemon_items}>
        {pokemons.slice(0, 20).map((el) => (
          <CardItem pokemon={el} key={el.url} />
        ))}
      </div>
      <Pagination
        total={count}
        pageSizeOptions={[10, 20, 50]}
        onChange={(page, sizePage) => pagination(page, sizePage)}
        defaultCurrent={1}
        defaultPageSize={20}
        className={styles.pagination_wrapper}
      />
    </div>
  );
};

export default Main;
