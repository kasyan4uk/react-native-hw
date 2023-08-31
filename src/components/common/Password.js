import { useState } from 'react';
import { StyleSheet, TextInput, View, Pressable } from 'react-native';
import colors from '../../assets/colors';
import { TextRobotoRegular } from './TextRobotoRegular';

export const Password = (props) => {
  const { placeholder, onInputChange, name, value } = props;
  const [showPassword, setShowPassword] = useState(true);
  const [isOnFocus, setIsOnFocus] = useState(false);

  return (
    <View style={styles.passwordWrapper}>
      <Pressable
        style={styles.showWrapper}
        onPress={() => setShowPassword((prev) => !prev)}
      >
        <TextRobotoRegular style={styles.showMsg}>
          {!showPassword ? 'Hide' : 'Show'}
        </TextRobotoRegular>
      </Pressable>
      <TextInput
        style={{
          ...styles.input,
          borderColor: isOnFocus ? colors.ACCENT_COLOR : colors.BORDER_COLOR,
        }}
        placeholder={placeholder}
        placeholderTextColor={colors.SECONDARY_TEXT_COLOR}
        secureTextEntry={showPassword}
        onFocus={() => {
          setIsOnFocus(true);
        }}
        onBlur={() => {
          setIsOnFocus(false);
        }}
        onChangeText={(text) => onInputChange({ name, value: text.trim() })}
        value={value}
        textContentType={'password'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  passwordWrapper: { marginTop: 16, height: 50, position: 'relative' },
  showWrapper: {
    position: 'absolute',
    zIndex: 2,
    right: 16,
    top: 16,
  },
  showMsg: {
    color: colors.NAV_TEXT_COLOR,
    fontSize: 16,
    lineHeight: 19,
  },
  input: {
    backgroundColor: colors.SECONDARY_BG,
    height: 50,
    padding: 16,

    borderWidth: 1,
    borderRadius: 8,
    fontSize: 16,
    lineHeight: 18,
    color: colors.PRIMARY_TEXT_COLOR,
    borderColor: colors.BORDER_COLOR,
  },
});
