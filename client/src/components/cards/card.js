import React from "react";
import "./card.css";
import FormDialog from "../dialog/dialog";

export default function Card(props) {
  const [open, setOpen] = React.useState(false);
  const handleClickCard = () => {
    setOpen(true);
  };

  return (
    <>
      <FormDialog
        open={open}
        setOpen={setOpen}
        idEmail={props.idEmail}
        nome={props.nome}
        senha={props.senha}
        Card={props.Card}
        setCard={props.setCard}
        listCard={props.listCard}
        setListCard={props.setListCard}
      />
      <div className="card-container" onClick={() => handleClickCard()}>
        <h1 className="card-title">{props.idEmail}</h1>
        <p className="card-cost">{props.nome}</p>
        <p className="category">{props.senha}</p>
      </div>
    </>
  );
}
