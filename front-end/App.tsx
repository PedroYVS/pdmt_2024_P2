import { useState } from 'react'
import { FlatList, StyleSheet, Text, View, Image, Pressable, Alert, Platform, ActivityIndicator } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import axios from 'axios'

const backEndServer = axios.create({
  baseURL: `http://localhost:${process.env.EXPO_PUBLIC_SERVER_PORT}`
})

const serverless = axios.create({
  baseURL: 'https://api.thecatapi.com/v1/images'
})

export default function App() {
  const [fotos, setFotos] = useState<string[]>([])
  const [pesquisando, setPesquisando] = useState<boolean>(false)

  const n_pics = 5

  const api_key = process.env.EXPO_PUBLIC_CAT_API_KEY

  const carregaFotos = async () => {
    setPesquisando(true)
    let novasFotos: string[]
    try{
      if(Platform.OS === 'web'){
        novasFotos = (await backEndServer.get('/cats', { params: { n_pics, api_key } })).data.map((foto: any) => foto.url)
      }
      else{
        novasFotos = (await serverless.get(`/search?limit=${n_pics}`, { headers: { 'x-api-key': api_key } })).data.map((foto: any) => foto.url)
      }
      setFotos(colecaoAtual => [...novasFotos, ...colecaoAtual])
    }
    catch(error: any){
      let err: string

      if(error.response) err = error.response.data.message
      if(error.request) err = 'Falha na conexão com o servidor. Tente novamente mais tarde'

      if(Platform.OS === 'web') window.alert(err!)
      else Alert.alert('Erro', err!, [{ text: 'OK' }])
    }
    finally{
      setPesquisando(false)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.appTitle}>Apresentando Fotos de Gatos</Text>
      <Pressable onPress={carregaFotos} style={styles.button} hitSlop={40}>
        <Text style={{ color: styles.button.color, marginRight: 10 }}>Carregar {fotos.length > 0 ? 'mais Fotos' : 'Fotos'}</Text>
        {
          pesquisando ? 
          <ActivityIndicator animating={pesquisando} color={styles.button.color}/> : 
          <Entypo name='download' color={styles.button.color}/>
        }
      </Pressable>
      {fotos.length > 0 ? <Text style={styles.imageCont}>Total de fotos: {fotos.length}</Text> : null}
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
    backgroundColor: 'black',
    color: 'white',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
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
  imageCont: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 10,
    textAlign: 'center',
    marginBottom: 20,
  }
});
