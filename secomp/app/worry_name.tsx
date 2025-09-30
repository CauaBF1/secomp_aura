import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Dimensions, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function SignUpScreen() {
  const [nome, setNome] = useState('');
  const router = useRouter();

  function handleSignUp() {
    if (nome.trim()) {
      // Lógica de cadastro aqui
      router.replace('/(tabs)');
    } else {
      alert('Por favor, preencha o campo!');
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
            source={require('../assets/images/worry_cadastro.png')} 
            style={styles.worry_cadastroImg} 
            resizeMode="contain" 
          />
          <Image 
            source={require('../assets/images/worry_name_text.png')} 
            style={styles.centradoImg} 
            resizeMode="contain" 
          />
        </View>
        
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Seu Worry-name"
            value={nome}
            onChangeText={setNome}
            autoCapitalize="words"
          />

          <TouchableOpacity style={styles.buttonBlack} onPress={handleSignUp}>
            <Text style={styles.buttonBlackText}>Confirmar</Text>
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
    paddingTop: height * 0.05,
    paddingBottom: 24,
  },
  header: {
    marginBottom: height * 0.01,
    minHeight: height * 0.2,
    alignItems: 'center',
    justifyContent: 'center', // centraliza verticalmente
    position: 'relative',
    flexDirection: 'column', // garante centralização vertical
  },
  worry_cadastroImg: {
    alignSelf: 'center',
    width: width * 3.5, // aumentado de 3 para 3.5
    height: height * 0.32, // aumentado de 0.25 para 0.32
    marginTop: height * 0.01,
    marginLeft: 0,
    marginBottom: 0,
  },
  centradoImg: {
    alignSelf: 'center',
    marginLeft: 0,
    marginTop: height * 0.03,
    width: width * 1.1, // aumentado de 1 para 1.1
    height: height * 0.09, // aumentado de 0.07 para 0.09
    marginBottom: 12,
  },
  form: {
    marginTop: height * 0.02,
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: height * 0.025,
    alignSelf: 'flex-start',
    marginLeft: width * 0.02,
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
    marginBottom: 12,
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
    marginTop: 8,
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
  linkContainer: {
    marginTop: height * 0.025,
    padding: 10,
  },
  linkText: {
    color: '#666',
    fontSize: width * 0.038,
    textAlign: 'center',
  },
  linkBold: {
    color: '#A685AB',
    fontWeight: 'bold',
  },
});