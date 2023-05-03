import React, { useState } from "react";
import { Avatar, Card, Skeleton, Button, Modal, Image, Typography } from "antd";
import { getPokemonItemThunk } from "../../thunk/thunk";
import { useDispatch, useSelector } from "react-redux";
import { filterPokemon } from "../../thunk/thunk";

import styles from "../style.module.css";
const { Meta } = Card;

const CardItem = ({ pokemon }) => {
  const { loader, loaderModal, item } = useSelector((state) => state);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  const showModal = () => {
    const params = pokemon.url;
    setIsModalOpen(true);
    dispatch(getPokemonItemThunk(params));
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const searchWithParams = (params) => {
    setIsModalOpen(false);
    dispatch(filterPokemon(params));
  };

  return (
    <>
      <Card
        className={styles.pokemon_item}
        hoverable
        cover={
          <img
            alt="cover"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1200px-International_Pok%C3%A9mon_logo.svg.png"
          />
        }
        extra={
          <Button type="link" onClick={showModal}>
            More
          </Button>
        }
      >
        <Skeleton loading={loader} active>
          <Meta
            avatar={
              <Avatar src="https://play-lh.googleusercontent.com/NmEeHPGwAJ3ufNzrGQ4SJjlcdR1ZQudw9MZ0aIIb6zXV7T1R1ku8FhOYL_Cln9k-6e8=w600-h300-pc0xffffff-pd" />
            }
            title={`Name: ${pokemon.name}`}
          />
        </Skeleton>
      </Card>

      <Modal
        title={`Name: ${pokemon.name}`}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        cancelButtonProps={{ style: { display: "none" } }}
        closable={false}
      >
        <Skeleton loading={loaderModal} active>
          <Image src={item?.sprites?.back_default} />
          <div className={styles.modal_text}>
            <Typography>Abilities:</Typography>
            {item.abilities?.map((el, i) => (
              <Button
                key={el?.ability.name}
                onClick={(e) =>
                  searchWithParams(`/ability/${e.target.textContent}`)
                }
              >
                {el?.ability.name}
              </Button>
            ))}
          </div>
          <div>
            <Typography>Height: {item?.height}</Typography>
          </div>
          <div>
            <Typography>Weight: {item?.weight}</Typography>
          </div>
          <div className={styles.modal_text}>
            <Typography>Type:</Typography>
            {item?.types?.map((el) => (
              <Button
                onClick={(e) =>
                  searchWithParams(`/type/${e.target.textContent}`)
                }
              >
                {el.type.name}
              </Button>
            ))}
          </div>
          <div>
            <Typography>Stats:</Typography>
            <Typography>HP: {item.stats?.[0].base_stat}</Typography>
            <Typography>Attack: {item.stats?.[1].base_stat}</Typography>
            <Typography>Defense: {item.stats?.[2].base_stat}</Typography>
            <Typography>Special Attack: {item.stats?.[3].base_stat}</Typography>
            <Typography>
              Special Defense: {item.stats?.[4].base_stat}
            </Typography>
            <Typography>Speed: {item.stats?.[5].base_stat}</Typography>
          </div>
        </Skeleton>
      </Modal>
    </>
  );
};

export { CardItem };
