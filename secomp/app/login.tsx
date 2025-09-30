import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Dimensions, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function LoginScreen() {
  const [usuario, setUsuario] = useState('');
  const router = useRouter();

  function handleLogin() {
    if (usuario.trim()) {
      router.replace('/(tabs)');
    }
  }

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Image 
            source={require('../assets/images/dont_worry.png')} 
            style={styles.dontWorryImg} 
            resizeMode="contain" 
          />
          <Image 
            source={require('../assets/images/app_centrado_aluno.png')} 
            style={styles.centradoImg} 
            resizeMode="contain" 
          />
          <Image 
            source={require('../assets/images/worry_login.png')} 
            style={styles.worryImg} 
            resizeMode="contain" 
          />
        </View>
        
        <View style={styles.form}>
          <Text style={styles.label}>Insira seu e-mail:</Text>
          <TextInput
            style={styles.input}
            placeholder="email@dominio.com"
            value={usuario}
            onChangeText={setUsuario}
            autoCapitalize="none"
            keyboardType="email-address"
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
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: width * 0.06,
    paddingTop: height * 0.06,
    paddingBottom: 24,
  },
  header: {
    marginBottom: height * 0.02,
    minHeight: height * 0.25,
    position: 'relative',
  },
  dontWorryImg: {
    width: width * 0.46,
    height: height * 0.11,
    marginTop: height * 0.01,
    marginLeft: width * 0.07,
    marginBottom: 0,
  },
  centradoImg: {
    marginLeft: width * 0.07,
    marginTop: height * 0.05,
    width: width * 0.71,
    height: height * 0.04,
    marginBottom: 12,
  },
  worryImg: {
    width: width * 0.625,
    height: height * 0.25,
    position: 'absolute',
    right: -width * 0.35,
    top: -height * 0.02,
    transform: [{ rotate: '320deg' }],
  },
  form: {
    marginTop: height * 0.05,
    alignItems: 'center',
    width: '100%',
  },
  label: {
    fontSize: width * 0.04,
    color: '#444',
    alignSelf: 'flex-start',
    marginBottom: 6,
    marginLeft: width * 0.02,
  },
  input: {
    width: '100%',
    maxWidth: 400,
    height: height * 0.055,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    fontSize: width * 0.04,
    backgroundColor: '#fff',
    color: '#444',
  },
  buttonBlack: {
    width: '100%',
    maxWidth: 400,
    height: height * 0.055,
    backgroundColor: '#000',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonBlackText: {
    color: '#fff',
    fontSize: width * 0.045,
    fontWeight: 'bold',
  },
  orText: {
    marginVertical: 8,
    color: '#888',
    fontSize: width * 0.04,
  },
  buttonGray: {
    width: '100%',
    maxWidth: 400,
    height: height * 0.055,
    backgroundColor: '#E0E0E0',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    marginTop: 8,
  },
  buttonGrayText: {
    color: '#444',
    fontSize: width * 0.04,
    fontWeight: 'bold',
  },
  buttonPurple: {
    width: '100%',
    maxWidth: 400,
    height: height * 0.055,
    backgroundColor: '#A685AB',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.04,
  },
  buttonPurpleText: {
    color: '#fff',
    fontSize: width * 0.04,
    fontWeight: 'bold',
  },
});