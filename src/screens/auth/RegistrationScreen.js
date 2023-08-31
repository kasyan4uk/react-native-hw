import { useState } from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  useWindowDimensions,
} from 'react-native';
import { useDispatch } from 'react-redux';

import colors from '../../assets/colors';
import common from '../../components/common';
import smallDevice from '../../utils/smallDeviceDimens';
import { AddAvatar } from '../../components/AddAvatar';
import { isBtnDisable } from '../../utils/isBtnDisable';
import { authSignUp } from '../../redux/auth/authOperations';


const {
  TextRobotoMedium,
  TextRobotoRegular,
  Btn,
  Input,
  Password,
  MainContainer,
} = common;

const initFormState = {
  avatarUrl: '',
  login: '',
  email: '',
  password: '',
};

export const RegistrationScreen = ({ navigation }) => {
  const [form, setForm] = useState(initFormState);
  const dispatch = useDispatch();

  const { width: deviceWidth, height: deviceHeight } = useWindowDimensions();

  const handleInputChange = ({ name, value }) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleFormSubmit = () => {
    dispatch(authSignUp(form));
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
              paddingBottom: deviceHeight > smallDevice.height ? 78 : 32,
            }}
          >
            <AddAvatar form={form} setForm={setForm} />
            <View
              style={{
                ...styles.titleWrapper,
                marginTop: deviceHeight > smallDevice.height ? 92 : 72,
              }}
            >
              <TextRobotoMedium style={styles.title}>
                Реєстрація
              </TextRobotoMedium>
            </View>
            <Input
              name={'login'}
              value={form.login}
              placeholder="Логін"
              onInputChange={handleInputChange}
            />
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
              title="Зареєструватися"
              onFormSubmit={handleFormSubmit}
              isDisable={isBtnDisable(form)}
              style={{ marginTop: 43 }}
            />

            <Pressable
              style={styles.navWrapper}
              onPress={() => navigation.navigate('Login')}
            >
              <TextRobotoRegular style={styles.navLink}>
                {'Вже є акаунт? Увійти'}
              </TextRobotoRegular>
            </Pressable>
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
