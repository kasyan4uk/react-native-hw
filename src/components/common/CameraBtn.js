import { StyleSheet, View } from 'react-native';

export const CameraBtn = ({ style }) => {
  return (
    <View style={{ ...styles.takePhotoOut, ...style }}>
      <View style={styles.takePhotoInner}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  takePhotoOut: {
    borderWidth: 2,
    borderColor: 'white',
    height: 50,
    width: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  takePhotoInner: {
    borderWidth: 2,
    borderColor: 'white',
    height: 40,
    width: 40,
    backgroundColor: 'white',
    borderRadius: 50,
  },
});
