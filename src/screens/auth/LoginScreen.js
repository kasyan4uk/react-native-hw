import { useState } from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Pressable,
  useWindowDimensions,
} from 'react-native';

import smallDevice from '../../components/utils/smallDevice';
import colors from '../../assets/colors';
import { common } from '../../components/common';
import { isBtnDisable } from '../../components/utils/isBtnDisable';
import { ScrollView } from 'react-native-gesture-handler';

const {
  TextRobotoMedium,
  TextRobotoRegular,
  Btn,
  Input,
  Password,
  MainContainer,
} = common;

const initFormState = {
  email: '',
  password: '',
};

export const LoginScreen = ({ navigation }) => {
  const [isKeyboardShown, setIsKeyboardShown] = useState(false);
  const [form, setForm] = useState(initFormState);

  const { width: deviceWidth, height: deviceHeight } = useWindowDimensions();

  const handleInputChange = ({ name, value }) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleKeybordToggle = (status) => {
    setIsKeyboardShown(status);
  };
  const handleFormSubmit = () => {
    navigation.navigate('Home');
    Keyboard.dismiss();
    setForm(initFormState);
  };

  return (
    <MainContainer>
      <ImageBackground
        style={{
          ...styles.backgroundImage,
          height: deviceHeight,
          width: deviceWidth,
        }}
        source={require('../../assets/images/PhotoBG.jpg')}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <View
            style={{
              ...styles.form,
              paddingBottom: deviceHeight > smallDevice.height ? 144 : 32,
            }}
          >
            <ScrollView>
              <View style={styles.titleWrapper}>
                <TextRobotoMedium style={styles.title}>Увійти</TextRobotoMedium>
              </View>
              <Input
                name={'email'}
                value={form.email}
                placeholder="Адреса електронної пошти"
                onInputChange={handleInputChange}
                onKeybordToggle={handleKeybordToggle}
              />
              <Password
                name={'password'}
                value={form.password}
                placeholder="Пароль"
                onInputChange={handleInputChange}
                onKeybordToggle={handleKeybordToggle}
              />
              {!isKeyboardShown && (
                <Btn
                  title="Увійти"
                  onFormSubmit={handleFormSubmit}
                  isDisable={isBtnDisable(form)}
                  style={{ marginTop: 43 }}
                />
              )}
              {!isKeyboardShown && (
                <Pressable
                  style={styles.navWrapper}
                  onPress={() => navigation.navigate('Registration')}
                >
                  <TextRobotoRegular style={styles.navLink}>
                    {"Неамає акаунту? Зареєструватися"}
                  </TextRobotoRegular>
                </Pressable>
              )}
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    resizeMode: 'cover',
    justifyContent: 'flex-end',
  },
  form: {
    paddingHorizontal: 16,
    backgroundColor: colors.PRIMARY_BG,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  title: {
    color: colors.PRIMARY_TEXT_COLOR,
    fontSize: 30,
    lineHeight: 35,
  },
  titleWrapper: {
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 32,
  },
  navWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  navLink: {
    color: colors.NAV_TEXT_COLOR,
    fontSize: 16,
    lineHeight: 19,
  },
});