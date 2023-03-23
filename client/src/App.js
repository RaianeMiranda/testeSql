import React, { useState, useEffect } from "react";
import Axios from "axios";
import Card from "./components/cards/card";

function Test() {
  const [values, setValues] = useState({});
  const [listUsuario, setListUsuario] = useState([]);

  const handleChangeValues = (event) => {
    setValues((prevValue) => ({
      ...prevValue,
      [event.target.name]: event.target.value,
    }));
  };

  const handleClickButton = () => {
    Axios.post("http://localhost:3306/register", {
      idEmail: values.email,
      nome: values.name,
      senha: values.senha,
    })
      .then(() => {
        setListUsuario([
          ...listUsuario,
          {
            idEmail: values.email,
            nome: values.name,
            senha: values.senha,
          }
        ])
      });
  };

  useEffect(() => {
    Axios.get("http://localhost:3306/getCards")
      .then((response) => {
        setListUsuario(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
      
  }, []);

  return (
    <div className="app-container">
      <div className="register-container">
        <h1>Cadastro</h1>
        <input
          type="text"
          name="name"
          placeholder="nome"
          className="register-input"
          onChange={handleChangeValues}
        />
        <input
          type="text"
          name="email"
          placeholder="email"
          className="register-input"
          onChange={handleChangeValues}
        />
        <input
          type="password"
          name="senha"
          placeholder="senha"
          className="register-input"
          onChange={handleChangeValues}
        />
        <button onClick={handleClickButton}>Cadastrar</button>
      </div>
      {console.log(listUsuario)}
      {listUsuario.map((value) => (
        <Card
          key={value.idEmail}
          idEmail={value.idEmail}
          nome={value.nome}
          senha={value.senha}
          listUsuario={listUsuario}
          setListUsuario={setListUsuario}
        />
      ))}
    </div>
  );
}

export default Test;
