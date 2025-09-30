import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from './Themed';

export default function HomeLayout() {
  return (
    <View style={styles.container}>
      {/* Div 1 - Calendário no topo, ocupando 45% da altura */}
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
        {/* Container para as duas divs da direita */}
        <View style={styles.leftContainer}>
          {/* Div 3 - Direita superior */}
          <View style={styles.leftTopDiv}>
            <Text style={styles.divText}>Div 3</Text>
          </View>
          {/* Div 4 - Direita inferior */}
          <View style={styles.leftBottomDiv}>
            <Text style={styles.divText}>Div 4</Text>
          </View>
        </View>
        {/* Div 2 - Esquerda, ocupando metade das colunas */}
        <View style={styles.rightDiv}>
          <Text style={styles.divText}>Div 2</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  customLine: {
    position: 'absolute',
    width: 297.0016785340719,
    height: 0,
    top: 69,
    left: 14,
    opacity: 1,
    borderWidth: 1,
    borderColor: '#190E4F',
    borderStyle: 'solid',
    transform: [{ rotate: '-0.2deg' }],
  },
  calendarTitle: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#2D217C',
      marginBottom: 8,
      alignSelf: 'flex-start',
      textAlign: 'left',
      marginLeft: 14,
      width: 292,
      height: 34,
      opacity: 1,
      transform: [{ rotate: '0deg' }],
  },
  calendarLine: {
    borderBottomWidth: 2,
    borderBottomColor: '#2D217C',
    marginBottom: 12,
  },
  calendarRow: {
    width: 292,
    height: 34,
    top: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingBottom: 6,
    borderBottomWidth: 2,
    borderBottomColor: '#D1D9E6',
    backgroundColor: 'transparent',
    justifyContent: 'flex-start',
    position: 'relative',
    left: -2,
    opacity: 1,
    transform: [{ rotate: '0deg' }],
  },
  calendarHour: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D217C',
    marginRight: 16,
    textAlign: 'left',
  },
  calendarEvent: {
    fontSize: 18,
    color: '#2D217C',
    textAlign: 'left',
  },
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    padding: 0,
    gap: 1,
    
  },
  topDiv: {
    width: 325,
    height: 325,
    backgroundColor: 'rgba(166, 133, 171, 0.3)',
    borderRadius: 15,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 35,
    marginBottom: 10,
  },
  bottomContainer: {
    flex: 1,
    flexDirection: 'row',
    gap: 10,
  },
  rightDiv: {
    flex: 1,
    backgroundColor: '#e0e0e0',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftContainer: {
    flex: 1,
    gap: 10,
  },
  leftTopDiv: {
    flex: 1,
    backgroundColor: '#d0d0d0',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftBottomDiv: {
    flex: 1,
    backgroundColor: '#c0c0c0',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  divText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});