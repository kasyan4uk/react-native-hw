import { useEffect, useState } from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default MapScreen = ({ route }) => {
  const [location, setLocation] = useState({});
  const { width, height } = useWindowDimensions();

  useEffect(() => {
    setLocation({
      latitude: route.params.latitude,
      longitude: route.params.longitude,
    });
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={{ width, height }}
        region={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
      >
        <Marker
          title="Publication "
          coordinate={location}
          description="Your current location"
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