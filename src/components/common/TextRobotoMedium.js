import { StyleSheet, Text } from 'react-native';

export const TextRobotoMedium = (props) => (
  <Text style={{ ...styles.default, ...props.style }}>{props.children}</Text>
);

const styles = StyleSheet.create({
  default: {
    fontFamily: 'roboto-medium',
  },
});
