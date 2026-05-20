import react, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, StatusBar, Image, Touchable, TouchableOpacity, Button } from 'react-native';
import axios from 'axios';

export default function App() {

  const [character, setCharacter] = useState(null);

  const sortearPersonagem = async () => {
    try{
      const response = await axios.get('https://api.disneyapi.dev/character');
      const listaPersonagens = response.data.data;
      const numeroAleatorio = Math.floor(Math.random() * listaPersonagens.length);
      const personagemEscolhido = listaPersonagens[numeroAleatorio];
      setCharacter(personagemEscolhido);
  }   
    catch (error){
      console.error("Erro ao sortear:", error);
    }
  }

  return (
    <View style={styles.container}>
      
      <View style={styles.header}>
        <Image source={{uri: 'https://recreio.com.br/wp-content/uploads/disney/disney_castelo_capa.jpg'}}
        style={{width: 293, height: 164.5, marginTop: 50}}/>
        <Text style={styles.header_text}
        style={{marginTop: 20, fontSize: 20, fontWeight: 'bold'}}>Sorteie um personagem</Text>
      </View>
      
      <View style={{marginTop: -150}}>
        <Button title='Sortear' color="#7DD3FC" onPress={sortearPersonagem}/>
      </View>

        {character && (
          <View style={styles.resultContainer}>
            <Image 
              source={{ uri: character.imageUrl }} 
              style={styles.charImage} 
            />
            <Text style={styles.charName}>{character.name}</Text>
            {character.films.length > 0 && (
              <Text style={styles.charFilm}> Filme: {character.films[0]}</Text>
            )}
          </View>
        )
      }

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'aliceblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: 290,
    backgroundColor: 'lightskyblue',
    alignItems: 'center',
  },
  resultContainer: {
    marginTop: 30,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 20,
    width: '80%'
  },
  charImage: {
    width: 120,
    height: 120,
    borderRadius: 60, 
    backgroundColor: '#eee',
  },
  charName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 15,
    color: '#333',
    textAlign: 'center',
  },
  charFilm: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
    textAlign: 'center',
  },

});
