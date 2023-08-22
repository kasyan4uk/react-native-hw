import { StyleSheet } from 'react-native';
import { common } from '../../components/common'

const { MainContainer, TextRobotoRegular } = common;

export default ProfileScreen = (props) => {
  return (
    <MainContainer style={styles.container}>
      <TextRobotoRegular>ProfileScreen</TextRobotoRegular>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});