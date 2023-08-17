import { StyleSheet, Text } from 'react-native';

export const TextRobotoBold = (props) => (
  <Text style={{ ...styles.default, ...props.style }}>{props.children}</Text>
);

const styles = StyleSheet.create({
  default: {
    fontFamily: 'roboto-bold',
  },
});
