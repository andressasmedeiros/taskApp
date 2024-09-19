import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';

export default function MessageScreen() {
  return (
    <ImageBackground
      source={{ uri: 'https://img.freepik.com/vetores-gratis/flores-da-margarida-com-padrao-de-fundo-de-vetor-bonito-estilo-desenhado-a-mao_53876-118540.jpg' }}
      style={styles.backgroundImage}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.messageText}>Não há mensagens para serem lidas</Text>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // Pode ser 'cover', 'contain', ou 'stretch'
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.6)', // Efeito esbranquiçado
    padding: 20,
    justifyContent: 'center', // Centraliza o conteúdo dentro do overlay
    alignItems: 'center', // Centraliza o conteúdo horizontalmente
  },
  messageText: {
    fontSize: 18,
    color: '#333', // Ajuste a cor do texto para garantir contraste com o fundo
    textAlign: 'center',
  },
});
