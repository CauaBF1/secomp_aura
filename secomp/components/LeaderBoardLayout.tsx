import React from 'react';
import { StyleSheet, Dimensions, Image, ScrollView } from 'react-native';
import { Text, View } from './Themed';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Dados mockados do leaderboard
const leaderboardData = [
  { id: 1, name: 'Ana Silva', points: 2450, position: 1, avatar: '👑' },
  { id: 2, name: 'João Pedro', points: 2380, position: 2, avatar: '🥈' },
  { id: 3, name: 'Maria Costa', points: 2250, position: 3, avatar: '🥉' },
  { id: 4, name: 'Carlos Lima', points: 2100, position: 4, avatar: '👤' },
  { id: 5, name: 'Beatriz Souza', points: 1950, position: 5, avatar: '👤' },
  { id: 6, name: 'Você', points: 1850, position: 6, avatar: '😊', isCurrentUser: true },
  { id: 7, name: 'Pedro Santos', points: 1720, position: 7, avatar: '👤' },
  { id: 8, name: 'Julia Martins', points: 1680, position: 8, avatar: '👤' },
];

export default function LeaderboardScreen() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Ranking</Text>
        <Text style={styles.headerSubtitle}>Top performers desta semana</Text>
      </View>

      {/* Top 3 Podium */}
      <View style={styles.podiumContainer}>
        {/* 2º Lugar */}
        <View style={styles.podiumItem}>
          <View style={[styles.podiumAvatar, styles.secondPlace]}>
            <Text style={styles.podiumAvatarText}>🥈</Text>
          </View>
          <View style={[styles.podiumBar, styles.secondBar]}>
            <Text style={styles.podiumPosition}>2º</Text>
            <Text style={styles.podiumName}>João</Text>
            <Text style={styles.podiumPoints}>2380</Text>
          </View>
        </View>

        {/* 1º Lugar */}
        <View style={styles.podiumItem}>
          <View style={[styles.podiumAvatar, styles.firstPlace]}>
            <Text style={styles.podiumAvatarText}>👑</Text>
          </View>
          <View style={[styles.podiumBar, styles.firstBar]}>
            <Text style={styles.podiumPosition}>1º</Text>
            <Text style={styles.podiumName}>Ana</Text>
            <Text style={styles.podiumPoints}>2450</Text>
          </View>
        </View>

        {/* 3º Lugar */}
        <View style={styles.podiumItem}>
          <View style={[styles.podiumAvatar, styles.thirdPlace]}>
            <Text style={styles.podiumAvatarText}>🥉</Text>
          </View>
          <View style={[styles.podiumBar, styles.thirdBar]}>
            <Text style={styles.podiumPosition}>3º</Text>
            <Text style={styles.podiumName}>Maria</Text>
            <Text style={styles.podiumPoints}>2250</Text>
          </View>
        </View>
      </View>

      {/* Lista de Ranking */}
      <ScrollView style={styles.listContainer} showsVerticalScrollIndicator={false}>
        {leaderboardData.slice(3).map((user) => (
          <View 
            key={user.id} 
            style={[
              styles.listItem,
              user.isCurrentUser && styles.currentUserItem
            ]}
          >
            <View style={styles.listItemLeft}>
              <Text style={styles.positionText}>{user.position}º</Text>
              <View style={styles.avatarSmall}>
                <Text style={styles.avatarSmallText}>{user.avatar}</Text>
              </View>
              <Text style={[
                styles.userName,
                user.isCurrentUser && styles.currentUserName
              ]}>
                {user.name}
              </Text>
            </View>
            <View style={styles.pointsBadge}>
              <Text style={styles.pointsText}>{user.points}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Stats do usuário */}
      <View style={styles.userStatsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>6</Text>
          <Text style={styles.statLabel}>Streak</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>1850</Text>
          <Text style={styles.statLabel}>Pontos</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>24</Text>
          <Text style={styles.statLabel}>Tasks</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    padding: 16,
    backgroundColor: '#F8F5F0',
  },
  header: {
    marginBottom: 24,
    marginTop: 8,
    backgroundColor: '#F8F5F0'
  },
  headerTitle: {
    fontSize: screenWidth > 400 ? 32 : 28,
    fontWeight: 'bold',
    color: '#2D217C',
    marginBottom: 4,
    backgroundColor: '#F8F5F0'
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#7E6BA8',
    backgroundColor: '#F8F5F0'
  },
  podiumContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginBottom: 24,
    height: 180,
    backgroundColor: '#F8F5F0',
  },
  podiumItem: {
    alignItems: 'center',
    marginHorizontal: 8,
    flex: 1,
    backgroundColor: '#F8F5F0'
  },
  podiumAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 3,
  },
  podiumAvatarText: {
    fontSize: 24,
  },
  firstPlace: {
    backgroundColor: '#FFD700',
    borderColor: '#FFA500',
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  secondPlace: {
    backgroundColor: '#E8E8E8',
    borderColor: '#C0C0C0',
  },
  thirdPlace: {
    backgroundColor: '#FFE0B2',
    borderColor: '#CD7F32',
  },
  podiumBar: {
    width: '100%',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  firstBar: {
    height: 120,
    backgroundColor: 'rgba(166, 133, 171, 0.4)',
  },
  secondBar: {
    height: 90,
    backgroundColor: 'rgba(166, 133, 171, 0.3)',
  },
  thirdBar: {
    height: 70,
    backgroundColor: 'rgba(166, 133, 171, 0.2)',
  },
  podiumPosition: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2D217C',
    marginBottom: 4,
  },
  podiumName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2D217C',
    marginBottom: 4,
    
  },
  podiumPoints: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#7E6BA8',
  },
  listContainer: {
    flex: 1,
    marginBottom: 16,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F5EFD8',
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#F5EFD8',
    
  },
  currentUserItem: {
    backgroundColor: '#F5EFD8',
    borderColor: '#2D217C',
    borderWidth: 2,
  },
  listItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#F5EFD8'
  },
  positionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D217C',
    width: 40,
    
  },
  avatarSmall: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F5EFD8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    
  },
  avatarSmallText: {
    fontSize: 20,
  },
  userName: {
    fontSize: 16,
    color: '#2D217C',
    fontWeight: '500',
    flex: 1,
    
  },
  currentUserName: {
    fontWeight: 'bold',
  },
  pointsBadge: {
    backgroundColor: 'rgba(166, 133, 171, 0.3)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  pointsText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2D217C',
  },
  userStatsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 8,
    backgroundColor: '#F5EFD8'
  },
  statBox: {
    flex: 1,
    backgroundColor: '#F5EFD8',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F5EFD8',
    
  },
  statValue: {
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
});