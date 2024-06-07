import { useState } from 'react'
import { FlatList, StyleSheet, Text, View, Image, Pressable } from 'react-native'
import axios from 'axios'

const theCatAPI = axios.create({
  baseURL: 'https://api.thecatapi.com/v1/images/',
  headers:{
    'x-api-key': process.env.EXPO_PUBLIC_CAT_API_KEY
  }
})

export default function App() {
  const [fotos, setFotos] = useState<string[]>([])

  const carregaFotos = () => {
    theCatAPI.get('/search?limit=5').then(response => {
      const fotos: string[] = response.data.map((foto: any) => foto.url)
      setFotos(colecaoAtual => [...fotos, ...colecaoAtual])
    })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.appTitle}>Apresentando Fotos de Gatos</Text>
      <Pressable onPress={carregaFotos} style={styles.button} hitSlop={40}>
        <Text>Carregar mais Fotos</Text>
      </Pressable>
      {
        fotos.length === 0 ? <Text>Pressione o botão para carregar fotos de gatos</Text> :
        <FlatList
        data={fotos}
        keyExtractor={foto => foto}
        style={styles.presentationBox}
        renderItem={foto => {
          return(
            <Image source={{uri: foto.item}} style={styles.images}/>
          )
        }}/>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginTop: 50,
  },
  appTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  presentationBox: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  images: {
    width: 300,
    height: 300,
    marginBottom: 20,
    borderRadius: 10,
  },
});
