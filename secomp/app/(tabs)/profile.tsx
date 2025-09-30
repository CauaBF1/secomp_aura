import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

interface UserData {
  name: string;
  email: string;
  worriesCount: number;
  daysOfUse: number;
}

export default function UserScreen() {
  const router = useRouter();
  
  const userData: UserData = {
    name: 'Maria Silva',
    email: 'maria.silva@email.com',
    worriesCount: 0,
    daysOfUse: 0,
  };

  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  const handleNavigateToStatistics = (): void => {
    router.push('/usuario');
  };

  const handleNavigateToSettings = (): void => {
    router.push('/usuario');
  };

  const handleLogout = (): void => {
    router.replace('/login');
  };

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Image 
          source={require('../../assets/images/dont_worry.png')} 
          style={styles.dontWorryImg} 
          resizeMode="contain" 
        />
      </View>

      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Image
            source={require('../../assets/images/avatar.png')}
            style={styles.avatarImage}
            resizeMode="cover"
          />
        </View>
        
        <Text style={styles.userName}>{userData.name}</Text>
        <Text style={styles.userEmail}>{userData.email}</Text>
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={handleNavigateToStatistics}
        >
          <View style={styles.iconContainer}>
            <Text style={styles.iconText}>📊</Text>
          </View>
          <View style={styles.actionButtonContent}>
            <Text style={styles.actionButtonText}>Estatísticas</Text>
            <Text style={styles.actionButtonSubtext}>Veja seu progresso</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.actionButton}
          onPress={handleNavigateToSettings}
        >
          <View style={styles.iconContainer}>
            <Text style={styles.iconText}>⚙️</Text>
          </View>
          <View style={styles.actionButtonContent}>
            <Text style={styles.actionButtonText}>Configurações</Text>
            <Text style={styles.actionButtonSubtext}>Ajustes da conta</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.infoSection}>
        <View style={styles.infoCard}>
          <Text style={styles.infoNumber}>{userData.worriesCount}</Text>
          <Text style={styles.infoLabel}>Tasks realizadas</Text>
        </View>
        <View style={styles.infoCard}>
          <Text style={styles.infoNumber}>{userData.daysOfUse}</Text>
          <Text style={styles.infoLabel}>Streak</Text>
        </View>
      </View>

      <TouchableOpacity 
        style={styles.logoutButton}
        onPress={handleLogout}
      >
        <Text style={styles.logoutButtonText}>Sair da conta</Text>
      </TouchableOpacity>
    </ScrollView>
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
    marginBottom: height * 0.03,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dontWorryImg: {
    alignSelf: 'center',
    width: width * 0.5,
    height: height * 0.1,
    marginTop: height * 0.01,
  },
  profileCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  avatar: {
    width: width * 0.25,
    height: width * 0.25,
    borderRadius: width * 0.125,
    backgroundColor: '#A685AB',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    overflow: 'hidden', // garante que a imagem fique arredondada
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: width * 0.125,
  },
  userName: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: width * 0.038,
    color: '#666',
  },
  actionsContainer: {
    marginBottom: 20,
  },
  actionButton: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 20,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  iconText: {
    fontSize: 24,
  },
  actionButtonContent: {
    flex: 1,
  },
  actionButtonText: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 2,
  },
  actionButtonSubtext: {
    fontSize: width * 0.032,
    color: '#888',
  },
  infoSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  infoCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 20,
    flex: 1,
    marginHorizontal: 6,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  infoNumber: {
    fontSize: width * 0.08,
    fontWeight: 'bold',
    color: '#A685AB',
    marginBottom: 4,
  },
  infoLabel: {
    fontSize: width * 0.035,
    color: '#666',
    textAlign: 'center',
  },
  logoutButton: {
    width: '100%',
    maxWidth: 400,
    height: height * 0.055,
    backgroundColor: '#fff',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#ff4444',
    marginBottom: 20,
  },
  logoutButtonText: {
    fontSize: width * 0.04,
    color: '#ff4444',
    fontWeight: 'bold',
  },
});