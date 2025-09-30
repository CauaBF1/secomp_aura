import React from 'react';
import { StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import { Text, View } from './Themed';
import { useRouter } from 'expo-router';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function HomeLayout() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Div 1 - Calendário no topo */}
      <View style={styles.topDiv}>
        <Text style={styles.calendarTitle}>Segunda XX/XX</Text>
        <View style={styles.customLine} />
        {[...Array(5)].map((_, i) => (
          <View key={i} style={styles.calendarRow}>
            <Text style={styles.calendarHour}>10:00</Text>
            <Text style={styles.calendarEvent}>Palestra</Text>
          </View>
        ))}
      </View>

      {/* Container para as 3 divs inferiores */}
      <View style={styles.bottomContainer}>
        {/* Container para as duas divs da esquerda */}
        <View style={styles.leftContainer}>
          {/* Div 3 - Tasks completas com gráfico circular */}
          <View style={styles.leftTopDiv}>
            <View style={styles.circularProgress}>
              <Text style={styles.percentageText}>50%</Text>
            </View>
            <Text style={styles.tasksText}>Tasks{'\n'}completas</Text>
          </View>

          {/* Div 4 - Start Focusing */}
          <TouchableOpacity 
            style={styles.leftBottomDiv}
            onPress={() => router.push('/focus')}
            activeOpacity={0.8}
          >
            <Text style={styles.focusingText}>Start{'\n'}Focusing</Text>
          </TouchableOpacity>
        </View>

        {/* Div 2 - Boneco Worry */}
        <View style={styles.rightDiv}>
          <Image 
            source={require('../assets/images/worry_home.png')} 
            style={styles.worryImage}
            resizeMode="contain"
          />
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
  },
  topDiv: {
    width: '100%',
    maxWidth: 600,
    aspectRatio: 1,
    maxHeight: screenHeight * 0.41,
    backgroundColor: 'rgba(166, 133, 171, 0.3)',
    borderRadius: 15,
    alignSelf: 'center',
    padding: 16,
    marginBottom: 16,
  },
  calendarTitle: {
    fontSize: screenWidth > 400 ? 28 : 22,
    fontWeight: 'bold',
    color: '#2D217C',
    marginBottom: 12,
    alignSelf: 'flex-start',
  },
  customLine: {
    width: '100%',
    height: 1,
    backgroundColor: '#190E4F',
    marginBottom: 16,
  },
  calendarRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#D1D9E6',
    backgroundColor: 'transparent',
  },
  calendarHour: {
    fontSize: screenWidth > 400 ? 18 : 16,
    fontWeight: 'bold',
    color: '#2D217C',
    marginRight: 16,
    minWidth: 60,
  },
  calendarEvent: {
    fontSize: screenWidth > 400 ? 18 : 16,
    color: '#2D217C',
    flex: 1,
  },
  bottomContainer: {
    flex: 1,
    flexDirection: 'row',
    gap: 16,
    minHeight: 200,
  },
  leftContainer: {
    flex: 1,
    gap: 16,
  },
  leftTopDiv: {
    flex: 1,
    backgroundColor: '#F5EFD8',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 100,
    padding: 16,
  },
  circularProgress: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 8,
    borderColor: '#2D217C',
    borderLeftColor: 'transparent',
    borderTopColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ rotate: '135deg' }],
    marginBottom: 12,
  },
  percentageText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2D217C',
    transform: [{ rotate: '-135deg' }],
  },
  tasksText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D217C',
    textAlign: 'center',
    lineHeight: 22,
  },
  leftBottomDiv: {
    flex: 1,
    backgroundColor: '#F4EFDD',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 100,
    padding: 16,
  },
  focusingText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D217C',
    textAlign: 'center',
    lineHeight: 24,
  },
  rightDiv: {
    flex: 1,
    backgroundColor: '#F4EFDD',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 100,
    position: 'relative',
  },
  worryImage: {
    width: '800%',
    height: '300%',
    maxWidth: 350,
    maxHeight: 500,
    
  },
  badgeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});