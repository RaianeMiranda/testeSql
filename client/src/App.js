import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { View, Text } from 'react-native';
import { TextInput, Button, Card } from 'react-native-paper';

function Test() {
  const [values, setValues] = useState({});
  const [listUsuario, setListUsuario] = useState([]);

  const handleChangeValues = (name, value) => {
    setValues((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const handleClickButton = () => {
    Axios.post('http://localhost:3306/register', {
      idEmail: values.email,
      nome: values.name,
      senha: values.senha,
    }).then(() => {
      setListUsuario([
        ...listUsuario,
        {
          idEmail: values.email,
          nome: values.name,
          senha: values.senha,
        },
      ]);
    });
  };

  useEffect(() => {
    Axios.get('http://localhost:3306/getCards')
      .then((response) => {
        setListUsuario(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ alignItems: 'center', marginTop: 50 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Cadastro</Text>
        <TextInput
          placeholder="nome"
          style={{ borderWidth: 1, borderRadius: 5, padding: 10, margin: 10, width: 250 }}
          value={values.name}
          onChangeText={(value) => handleChangeValues('name', value)}
        />
        <TextInput
          placeholder="email"
          style={{ borderWidth: 1, borderRadius: 5, padding: 10, margin: 10, width: 250 }}
          value={values.email}
          onChangeText={(value) => handleChangeValues('email', value)}
        />
        <TextInput
          secureTextEntry
          placeholder="senha"
          style={{ borderWidth: 1, borderRadius: 5, padding: 10, margin: 10, width: 250 }}
          value={values.password}
          onChangeText={(value) => handleChangeValues('password', value)}
        />
        <Button title="Cadastrar" onPress={handleClickButton} />
      </View>
      <View style={{ margin: 10 }}>
        {listUsuario.map((value) => (
          <Card key={value.idEmail} style={{ marginVertical: 5 }}>
            <Card.Content>
              <Text>{value.nome}</Text>
              <Text>{value.idEmail}</Text>
              <Text>{value.senha}</Text>
            </Card.Content>
          </Card>
        ))}
      </View>
    </View>
  );
}

export default Test;
