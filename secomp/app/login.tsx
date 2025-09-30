import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const [usuario, setUsuario] = useState('');
  const router = useRouter();

  function handleLogin() {
    if (usuario.trim()) {
      router.replace('/(tabs)');
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/images/dont_worry.png')} style={styles.dontWorryImg} resizeMode="contain" />
        <Image source={require('../assets/images/app_centrado_aluno.png')} style={styles.centradoImg} resizeMode="contain" />
        <Image source={require('../assets/images/worry_login.png')} style={styles.worryImg} resizeMode="contain" />
      </View>
      <View style={styles.form}>
        <Text style={styles.label}>Insira seu e-mail:</Text>
        <TextInput
          style={styles.input}
          placeholder="email@dominio.com"
          value={usuario}
          onChangeText={setUsuario}
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.buttonBlack} onPress={handleLogin}>
          <Text style={styles.buttonBlackText}>Continuar</Text>
        </TouchableOpacity>
        <Text style={styles.orText}>or</Text>
        <TouchableOpacity style={styles.buttonGray}>
          <Text style={styles.buttonGrayText}>Continuar com Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonGray}>
          <Text style={styles.buttonGrayText}>Continuar com Apple</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonPurple}>
          <Text style={styles.buttonPurpleText}>Cadastrar seu Worry</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingTop: 48,
  },
  header: {
    marginBottom: 16,
  },
  dontWorryImg: {
    width: 184,
    height: 90,
    top:10,
    left: 28,
    marginBottom: 0,
  },
  centradoImg: {
    left: 28,
    top: 100,
    width: 285,
    height: 32,
    marginBottom: 12,
  },
  worryImg: {
    width: 250,
    height: 200,
    left: 230,
    top: -50,
    position: 'absolute',
    transform: [{ rotate: '320deg' }],
  },
  form: {
    marginTop: 100,
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    color: '#444',
    left: -100,
    marginBottom: 6,
    marginLeft: 8,
  },
  input: {
    width: '100%',
    maxWidth: 320,
    height: 44,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: '#fff',
    color: '#444',
  },
  buttonBlack: {
    width: '100%',
    maxWidth: 320,
    height: 44,
    backgroundColor: '#000',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonBlackText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  orText: {
    marginVertical: 8,
    color: '#888',
    fontSize: 16,
  },
  buttonGray: {
    width: '100%',
    maxWidth: 320,
    height: 44,
    backgroundColor: '#E0E0E0',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    marginTop: 8,
  },
  buttonGrayText: {
    color: '#444',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonPurple: {
    width: '100%',
    maxWidth: 320,
    height: 44,
    backgroundColor: '#A685AB',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60,
  },
  buttonPurpleText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
