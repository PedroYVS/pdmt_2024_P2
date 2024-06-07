import { useState } from 'react'
import { FlatList, StyleSheet, Text, View, Image, Pressable } from 'react-native'
import axios from 'axios'

const theCatAPI = axios.create({
  baseURL: 'https://api.thecatapi.com/v1/images/'
})

type Foto = {
  id: number,
  url: string,
  width: number,
  height: number,
}

export default function App() {
  const [fotos, setFotos] = useState<Foto[]>([])

  let indexes = 0

  const carregaFotos = () => {
    theCatAPI.get('/search?limit=5').then(response => {
      const fotos: Foto[] = response.data.map((foto: any) => {
        indexes++
        return {
          id: indexes,
          url: foto.url,
          width: foto.width,
          height: foto.height,
        }
      })
      setFotos(colecaoAtual => [...colecaoAtual, ...fotos])
    })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.appTitle}>Apresentando Fotos de Gatos</Text>
      <Pressable onPress={carregaFotos} hitSlop={40}>
        <Text>Carregar mais Fotos</Text>
      </Pressable>
      <FlatList
      data={fotos}
      keyExtractor={foto => String(foto.id)}
      renderItem={foto => {
        return(
          <Image source={{uri: foto.item.url}} style={{width: foto.item.width, height: foto.item.height}}/>
        )
      }}/>
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
    fontSize: 50,
    fontWeight: 'bold',
    fontFamily: 'Times New Roman',
    marginBottom: 20,
  }
});
