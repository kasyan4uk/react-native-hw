import { useState } from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import colors from '../../assets/colors';
import smallDevice from '../../utils/smallDeviceDimens';
import common from '../../components/common';
import { isBtnDisable } from '../../utils/isBtnDisable';
import { authSignIn } from '../../redux/auth/authOperations';

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
  const [form, setForm] = useState(initFormState);
  const dispatch = useDispatch();

  const { width: deviceWidth, height: deviceHeight } = useWindowDimensions();

  const handleInputChange = ({ name, value }) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleFormSubmit = () => {
    dispatch(authSignIn(form));
    setForm(initFormState);
  };

  return (
    <MainContainer>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ImageBackground
          style={{
            ...styles.backgroundImage,
            height: deviceHeight,
            width: deviceWidth,
          }}
          source={require('../../assets/images/PhotoBG2x.jpg')}
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
              />
              <Password
                name={'password'}
                value={form.password}
                placeholder="Пароль"
                onInputChange={handleInputChange}
              />
              <Btn
                title="Увійти"
                onFormSubmit={handleFormSubmit}
                isDisable={isBtnDisable(form)}
                style={{ marginTop: 43 }}
              />
              <Pressable
                style={styles.navWrapper}
                onPress={() => navigation.navigate('Registration')}
              >
                <TextRobotoRegular style={styles.navLink}>
                  {"Немає акаунту? Зареєструватися"}
                </TextRobotoRegular>
              </Pressable>
            </ScrollView>
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
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
