import { View, Image, Pressable, StyleSheet, Dimensions } from 'react-native';

import colors from '../assets/colors';
import { pickImage } from '../utils/pickImage';

const deviceWidth = Dimensions.get('window').width;

export const AddAvatar = (props) => {
  const { form, setForm } = props;

  return (
    <View style={styles.addAvatar}>
      {!form.avatarUrl && (
        <Pressable
          style={styles.addAvatarBtn}
          accessibilityLabel={'Add avatar'}
          onPress={async () => {
            const result = await pickImage();
            setForm((prev) => ({
              ...prev,
              avatarUrl: result?.assets[0].uri || null,
            }));
          }}
        >
          <Image
            source={require('../assets/images/addAvatar.png')}
            style={styles.addAvatarBtnImg}
          />
        </Pressable>
      )}
      {form.avatarUrl && (
        <Image style={styles.avatarImg} source={{ uri: form.avatarUrl }} />
      )}
      {form.avatarUrl && (
        <Pressable
          style={styles.addAvatarBtn}
          accessibilityLabel={'Add avatar'}
          onPress={() => setForm((prev) => ({ ...prev, avatarUrl: '' }))}
        >
          <Image
            source={require('../assets/images/removeAvatar.png')}
            style={styles.addAvatarBtnImg}
          />
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  addAvatar: {
    position: 'absolute',
    top: -60,
    right: deviceWidth / 2 - 60,
    width: 120,
    height: 120,
    backgroundColor: colors.SECONDARY_BG,
    borderRadius: 16,
  },
  avatarImg: {
    width: 120,
    height: 120,
    borderRadius: 16,
  },
  addAvatarBtn: {
    position: 'absolute',
    right: -13,
    bottom: 13,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addAvatarBtnImg: { width: 26, height: 26 },
});
