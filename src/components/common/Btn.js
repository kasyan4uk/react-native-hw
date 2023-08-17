import { Pressable, StyleSheet, Text } from 'react-native';
import { TextRobotoRegular } from './TextRobotoRegular';
import colors from '../../assets/colors';

export const Btn = (props) => {
  const { title, onFormSubmit, form } = props;

  const isDisable = Object.keys({ ...form, avatarUrl: 'default' }).every(
    (item) => item == true
  );
  return (
    <Pressable
      disabled={isDisable}
      style={styles.button}
      onPress={onFormSubmit}
    >
      <TextRobotoRegular style={styles.title}>{title}</TextRobotoRegular>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.ACCENT_COLOR,
    color: colors.PRIMARY_BG,
    height: 51,
    borderRadius: 100,
    marginTop: 43,
  },
  title: {
    fontSize: 16,
    color: colors.PRIMARY_BG,
    fontWeight: 400,
    lineHeight: 19,
  },
});