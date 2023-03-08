import React, { Component } from 'react';
import { AppRegistry, StyleSheet, TextInput, View, Alert, Button, Text } from 'react-native';

export default function App() {
  return (<MainProject></MainProject>)
};


class MainProject extends Component {

  constructor(props) {

    super(props)

    this.state = {

      UserNome: '',
      UserIdEmail: '',
      UserSenha: ''

    }

  };

  usuario = () => {


    const { UserNome } = this.state;
    const { UserIdEmail } = this.state;
    const { UserSenha } = this.state;



    fetch(' ftp.web2149.uni5.net', {
      method: 'POST',
      Header() {
        header.Add("Access-Control-Allow-Origin", "*")
        header.Add("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS")
        header.Add("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With")
      },
      body: JSON.stringify({

        nome: UserNome,

        idEmail: UserIdEmail,

        senha: UserSenha

      })

    }).then((response) => response.json())
      .then((responseJson) => {

        // Showing response message coming from server after inserting records.
        Alert.alert(responseJson);

      }).catch((error) => {
        console.error(error);
      });


  };

  render() {
    return (

      <View style={styles.MainContainer}>

        <Text style={{ fontSize: 20, color: "#000", textAlign: 'center', marginBottom: 15 }}>User Registration Form</Text>

        <TextInput

          // Adding hint in Text Input using Place holder.
          placeholder="Enter User nome"

          onChangeText={UserNome => this.setState({ UserNome })}

          // Making the Under line Transparent.
          underlineColorAndroid='transparent'

          style={styles.TextInputStyleClass}
        />

        <TextInput

          // Adding hint in Text Input using Place holder.
          placeholder="Enter User Email"

          onChangeText={UserIdEmail => this.setState({ UserIdEmail })}

          // Making the Under line Transparent.
          underlineColorAndroid='transparent'

          style={styles.TextInputStyleClass}
        />

        <TextInput

          // Adding hint in Text Input using Place holder.
          placeholder="Enter User Password"

          onChangeText={UserSenha => this.setState({ UserSenha })}

          // Making the Under line Transparent.
          underlineColorAndroid='transparent'

          style={styles.TextInputStyleClass}

          secureTextEntry={true}
        />

        <Button title="Click Here To Register" onPress={this.usuario} color="#2196F3" />



      </View>

    );
  }
}

const styles = StyleSheet.create({

  MainContainer: {

    justifyContent: 'center',
    flex: 1,
    margin: 10
  },

  TextInputStyleClass: {

    textAlign: 'center',
    marginBottom: 7,
    height: 40,
    borderWidth: 1,
    // Set border Hex Color Code Here.
    borderColor: '#2196F3',

    // Set border Radius.
    borderRadius: 5,

    // Set border Radius.
    //borderRadius: 10 ,
  }

});

AppRegistry.registerComponent('MainProject', () => MainProject);