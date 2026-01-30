import { ActivityIndicator, StyleSheet, Text, View } from "react-native";


export const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
      <Text>Cargando...</Text>
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
});