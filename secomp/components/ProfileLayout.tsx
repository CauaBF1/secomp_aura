import React from 'react';
import { StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import { Text, View } from './Themed';
import { useRouter } from 'expo-router';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function ProfileLayout() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Header do Perfil */}
      <View style={styles.profileHeader}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>😊</Text>
        </View>
        <Text style={styles.userName}>João Silva</Text>
        <Text style={styles.userLevel}>Nível 12 • Estudante Dedicado</Text>
      </View>

      {/* Stats do Usuário */}
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>1,850</Text>
          <Text style={styles.statLabel}>Pontos</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>24</Text>
          <Text style={styles.statLabel}>Tasks</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>6</Text>
          <Text style={styles.statLabel}>Streak</Text>
        </View>
      </View>

      {/* Menu de Opções */}
      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuIconContainer}>
            <Text style={styles.menuIcon}>⚙️</Text>
          </View>
          <Text style={styles.menuText}>Configurações</Text>
          <Text style={styles.menuArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuIconContainer}>
            <Text style={styles.menuIcon}>🎯</Text>
          </View>
          <Text style={styles.menuText}>Metas e Objetivos</Text>
          <Text style={styles.menuArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuIconContainer}>
            <Text style={styles.menuIcon}>📊</Text>
          </View>
          <Text style={styles.menuText}>Estatísticas</Text>
          <Text style={styles.menuArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuIconContainer}>
            <Text style={styles.menuIcon}>🏆</Text>
          </View>
          <Text style={styles.menuText}>Conquistas</Text>
          <Text style={styles.menuArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuIconContainer}>
            <Text style={styles.menuIcon}>❓</Text>
          </View>
          <Text style={styles.menuText}>Ajuda e Suporte</Text>
          <Text style={styles.menuArrow}>›</Text>
        </TouchableOpacity>
      </View>

      {/* Botão de Logout */}
      <TouchableOpacity 
        style={styles.logoutButton}
        onPress={() => router.replace('/login')}
      >
        <Text style={styles.logoutText}>Sair</Text>
      </TouchableOpacity>

      {/* Boneco Worry */}
      <View style={styles.worryContainer}>
        <Image 
          source={require('../assets/images/worry_home.png')} 
          style={styles.worryImage}
          resizeMode="contain"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8F7',
    padding: 16,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 20,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F5EFD8',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 3,
    borderColor: '#A685AB',
  },
  avatarText: {
    fontSize: 40,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D217C',
    marginBottom: 4,
  },
  userLevel: {
    fontSize: 14,
    color: '#7E6BA8',
    fontWeight: '500',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
    gap: 12,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#F5EFD8',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E8E2D0',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D217C',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#7E6BA8',
    fontWeight: '600',
  },
  menuContainer: {
    flex: 1,
    marginBottom: 24,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5EFD8',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E8E2D0',
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(166, 133, 171, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuIcon: {
    fontSize: 20,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: '#2D217C',
    fontWeight: '500',
  },
  menuArrow: {
    fontSize: 20,
    color: '#7E6BA8',
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#FF6B6B',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  worryContainer: {
    position: 'absolute',
    right: 20,
    bottom: 100,
    width: 80,
    height: 80,
    opacity: 0.7,
  },
  worryImage: {
    width: '100%',
    height: '100%',
  },
});