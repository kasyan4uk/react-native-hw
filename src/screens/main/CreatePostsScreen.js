import { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  useWindowDimensions,
  ImageBackground,
  Pressable,
  KeyboardAvoidingView,
  TextInput,
} from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { Feather, FontAwesome5 } from '@expo/vector-icons';

import { CameraScreen } from './CameraScreen';
import { common } from '../../components/common';
import colors from '../../assets/colors/colors';
import { pickImage } from '../../components/utils/picklmage';
import { isBtnDisable } from '../../components/utils/isBtnDisable';

const { MainContainer, Btn, TextRobotoRegular } = common;
const initState = {
  imageUrl: null,
  name: '',
  locality: '',
};

export default CreatePostsScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraStatus, setCameraStatus] = useState(false);
  const [form, setForm] = useState(initState);

  const { imageUrl: photo } = form;
  const { width: deviceWidth, height: deviceHeight } = useWindowDimensions();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return (
      <View>
        <TextRobotoRegular>Немає доступу до камери</TextRobotoRegular>
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View>
        <TextRobotoRegular>Немає доступу до камери</TextRobotoRegular>
      </View>
    );
  }

  return (
    <MainContainer style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      >
        <CameraScreen
          cameraStatus={cameraStatus}
          photo={form.imageUrl}
          setCameraStatus={setCameraStatus}
          setForm={setForm}
          deviceWidth={deviceWidth}
          deviceHeight={deviceHeight}
        />
        {!cameraStatus && (
          <View
            style={{
              ...styles.form,
              width: deviceWidth,
              height: deviceHeight - 115,
            }}
          >
            <View
              style={{
                ...styles.photoWrap,
                width: deviceWidth - 32,
                height: (deviceWidth - 32) * 0.7,
              }}
            >
              <ImageBackground
                style={{
                  ...styles.choosenPhoto,
                  width: deviceWidth - 32,
                  height: (deviceWidth - 32) * 0.7,
                }}
                source={{ uri: photo || null }}
              >
                <Pressable
                  style={{
                    ...styles.addPhotoIconWrap,
                    backgroundColor: photo
                      ? 'rgba(255, 255, 255, 0.3)'
                      : colors.PRIMARY_BG,
                  }}
                  accessibilityLabel={'Add picture'}
                  onPress={() => {
                    setForm((prev) => ({ ...prev, imageUrl: null }));
                    setCameraStatus(true);
                  }}
                >
                  <FontAwesome5
                    name="camera"
                    size={24}
                    color={
                      photo ? colors.PRIMARY_BG : colors.SECONDARY_TEXT_COLOR
                    }
                  />
                </Pressable>
              </ImageBackground>
            </View>
            <Pressable
              style={styles.addPhotoTextWrap}
              onPress={async () => {
                let result = await pickImage();
                setForm((prev) => ({
                  ...prev,
                  imageUrl: result.assets[0].uri,
                }));
              }}
            >
              <TextRobotoRegular style={styles.addPhotoText}>
                {photo ? 'Редагуйте фото' : 'Завантажте фото'}
              </TextRobotoRegular>
            </Pressable>
            <View
              style={{
                ...styles.inputContanier,
                marginBottom: 16,
                marginTop: 32,
              }}
            >
              <TextInput
                style={styles.input}
                value={form.name}
                placeholder="Назва..."
                placeholderTextColor={colors.SECONDARY_TEXT_COLOR}
                onChangeText={(value) =>
                  setForm((prev) => ({ ...prev, name: value }))
                }
              />
            </View>
            <View style={{ ...styles.inputContanier, marginBottom: 32 }}>
              <Feather
                name="map-pin"
                size={24}
                color={colors.SECONDARY_TEXT_COLOR}
                style={{ marginRight: 4 }}
              />
              <TextInput
                style={styles.input}
                value={form.locality}
                placeholder="Місцевість..."
                placeholderTextColor={colors.SECONDARY_TEXT_COLOR}
                onChangeText={(value) =>
                  setForm((prev) => ({ ...prev, locality: value }))
                }
              />
            </View>
            <Btn
              title={'Опублікувати'}
              onFormSubmit={() => {
                setForm(initState);
                navigation.navigate('Posts');
              }}
              isDisable={isBtnDisable(form)}
            />
            <Pressable
              style={{ ...styles.deleteBtn, left: deviceWidth / 2 - 16 - 20 }}
              onPress={() => {
                setForm(initState);
                navigation.navigate('Posts');
              }}
            >
              <Feather
                name="trash-2"
                size={24}
                color={colors.SECONDARY_TEXT_COLOR}
              />
            </Pressable>
          </View>
        )}
      </KeyboardAvoidingView>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
  },
  form: {
    paddingHorizontal: 16,
    paddingVertical: 32,
  },
  photoWrap: {
    backgroundColor: colors.SECONDARY_BG,
    borderWidth: 1,
    borderColor: colors.BORDER_COLOR,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContanier: {
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
    borderBottomColor: colors.BORDER_COLOR,
    height: 50,
    backgroundColor: 'transparent',
    width: '100%',
  },
  input: {
    fontFamily: 'roboto-regular',
    fontSize: 16,
    lineHeight: 19,
    color: colors.PRIMARY_TEXT_COLOR,
    width: '100%',
  },
  deleteBtn: {
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.SECONDARY_BG,
    borderRadius: 20,
    width: 70,
    height: 40,
  },
  addPhotoIconWrap: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addPhotoTextWrap: {
    marginTop: 8,
  },
  addPhotoText: {
    fontSize: 16,
    lineHeight: 19,
    color: colors.SECONDARY_TEXT_COLOR,
  },
  choosenPhoto: {
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: 8,
  },
});