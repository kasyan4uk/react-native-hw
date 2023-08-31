import { StyleSheet, View, useWindowDimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default MapScreen = ({ route }) => {
  const { width, height } = useWindowDimensions();
  const { latitude, longitude } = route.params.coords;

  return (
    <View style={styles.container}>
      <MapView
        style={{ width, height }}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
      >
        <Marker
          title="Post"
          coordinate={{ latitude, longitude }}
          description="Posts current location"
        />
      </MapView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
