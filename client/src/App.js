import React, { useState, useEffect } from "react";
import "./App.css";
import Axios from "axios";
import Card from "./components/cards/card";

function App() {
  const [values, setValues] = useState({});
  const [ListUsuario, setListUsuario] = useState();

  const handleChangeValues = (value) => {
    setValues((prevValue) => ({
      ...prevValue,
      [value.target.name]: value.target.value,
    }));
  };

  const handleClickButton = () => {
    Axios.post("http://localhost:3306/register", {
      idEmail: values.email,
      nome: values.name,
      senha: values.senha,
    }).then((response) => {
      console.log(response);
    });
  };

  useEffect(() => {
    Axios.get("http://localhost:3306/getCards").then((response) => {
      setListUsuario(response.data)
    })
  }, [])

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
      {typeof ListUsuario !== "undefined" && ListUsuario.map((value) => {
        return <Card key={value.id} 
        ListCard={ListUsuario} 
        setListCard={setListUsuario}
        id={value.id}
        idEmail={value.idEmail}
        nome={value.nome}
        senha={value.senha}
        ></Card>
      })}

    </div>
  );
}

export default App;
