import { useState } from 'react';
import { TouchableOpacity, View, ImageBackground } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { Feather, Ionicons, Entypo, MaterialIcons } from '@expo/vector-icons';

import { StyleSheet } from 'react-native';
import { common } from '../../components/common';

const { CameraBtn } = common;

export const CameraScreen = (props) => {
  const {
    cameraStatus,
    photo,
    setCameraStatus,
    setForm,
    deviceWidth,
    deviceHeight,
  } = props;

  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(CameraType.back);

  const createPhoto = async () => {
    const takenPhoto = await cameraRef.takePictureAsync();
    setForm((prev) => ({ ...prev, imageUrl: takenPhoto.uri }));
  };

  return (
    <>
      {cameraStatus && photo && (
        <View style={styles.takePhotoContainer}>
          <ImageBackground
            source={{ uri: photo }}
            style={{
              ...styles.takePhotoImg,
              height: deviceHeight - 60,
              width: deviceWidth,
            }}
          >
            <TouchableOpacity
              style={styles.choosePhotoBtn}
              onPress={() => {
                setCameraStatus(false);
              }}
            >
              <MaterialIcons
                name="add-photo-alternate"
                size={32}
                color="white"
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.choosePhotoBtn}
              onPress={() => {
                setForm((prev) => ({ ...prev, imageUrl: null }));
              }}
            >
              <Entypo name="back" size={32} color="white" />
            </TouchableOpacity>
          </ImageBackground>
        </View>
      )}
      {cameraStatus && !photo && (
        <Camera
          style={{ ...styles.camera, height: deviceHeight - 60 }}
          ref={setCameraRef}
          type={type}
        >
          <View style={{ ...styles.photoView, width: deviceWidth }}>
            <TouchableOpacity
              onPress={() => {
                setType(
                  type === CameraType.back ? CameraType.front : CameraType.back
                );
              }}
            >
              <Ionicons name="camera-reverse-outline" size={34} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={async () => {
                if (cameraRef) {
                  await createPhoto();
                }
              }}
            >
              <CameraBtn />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setForm((prev) => ({ ...prev, imageUrl: null }));
                setCameraStatus(false);
              }}
            >
              <Feather name="camera-off" size={28} color="white" />
            </TouchableOpacity>
          </View>
        </Camera>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  camera: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  takePhotoContainer: {
    zIndex: 1,
  },
  takePhotoImg: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    paddingBottom: 20,
  },
  photoView: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 20,
  },
  button: { alignSelf: 'center' },
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
  choosePhotoBtn: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
});