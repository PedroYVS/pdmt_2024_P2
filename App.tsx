import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.appTitle}>Apresentando Fotos de Gatos</Text>
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
