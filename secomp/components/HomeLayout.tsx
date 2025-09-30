import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Text, View } from './Themed';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function HomeLayout() {
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
          {/* Div 3 - Esquerda superior */}
          <View style={styles.leftTopDiv}>
            <Text style={styles.divText}>Div 3</Text>
          </View>

          {/* Div 4 - Esquerda inferior */}
          <View style={styles.leftBottomDiv}>
            <Text style={styles.divText}>Div 4</Text>
          </View>
        </View>

        {/* Div 2 - Direita */}
        <View style={styles.rightDiv}>
          <Text style={styles.divText}>Div 2</Text>
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
    maxHeight: screenHeight * 0.45,
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
    backgroundColor: '#d0d0d0',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 100,
  },
  leftBottomDiv: {
    flex: 1,
    backgroundColor: '#c0c0c0',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 100,
  },
  rightDiv: {
    flex: 1,
    backgroundColor: '#e0e0e0',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 100,
  },
  divText: {
    fontSize: screenWidth > 400 ? 18 : 16,
    fontWeight: 'bold',
    color: '#333',
  },
});