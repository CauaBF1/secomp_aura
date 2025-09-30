import { StyleSheet } from 'react-native';

import HomeLayout from '@/components/HomeLayout';
import { View } from '@/components/Themed';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <HomeLayout />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
