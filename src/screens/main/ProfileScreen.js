import { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Pressable,
  ImageBackground,
  TouchableWithoutFeedback,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { EvilIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import Icon from '@expo/vector-icons/Feather';

import common from '../../components/common';
import { getPosts } from '../../services/firestoreOperations';
import { selectUser } from '../../redux/auth/authSelector';

const { MainContainer, TextRobotoRegular } = common;

export default ProfileScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    const unsuscribe = getPosts({ callback: setPosts });
    return () => unsuscribe();
  }, []);

  const handleLogout = () => {
    dispatch(authLogOut());
  };
  return (
    <MainContainer style={styles.containerMain}>
      <ImageBackground
        style={styles.bgImage}
        source={require('../../assets/images/PhotoBG2x.jpg')}
      >
        <View style={styles.container}>
          <View style={styles.userInfo}>
            <Image
              source={{ uri: user.avatarUrl }}
              style={{
                width: 120,
                height: 120,
                borderRadius: 16,
                marginRight: 8,
              }}
            />
          </View>
          <Text style={styles.userName}>{user.login}</Text>
          <Pressable style={styles.logoutBtn} onPress={handleLogout}>
            <Icon name="log-out" size={24} color="#BDBDBD" />
          </Pressable>
          <FlatList
            data={posts}
            keyExtractor={(item) => item.id}
            initialNumToRender={2}
            renderItem={({ item }) => (
              <TouchableWithoutFeedback>
                <View
                  style={{
                    marginBottom: 32,
                  }}
                >
                  <Image
                    source={{ uri: item.imageUrl }}
                    style={{ height: 240, width: 343, borderRadius: 8 }}
                  />
                  <Text style={styles.textTitle}>{item.name}</Text>

                  <View style={styles.userCard}>
                    <Pressable
                      onPress={() =>
                        navigation.navigate('Comments', {
                          postId: item.id,
                          imageUrl: item.imageUrl,
                        })
                      }
                      style={styles.commentInfo}
                    >
                      <EvilIcons
                        name="comment"
                        size={32}
                        style={{
                          color: item.comments ? '#FF6C00' : '#BDBDBD',
                        }}
                      />
                      <Text
                        style={{
                          color: item.comments ? '#212121' : '#BDBDBD',
                        }}
                      >
                        {item.comments}
                      </Text>
                    </Pressable>
                    <Pressable
                      onPress={() =>
                        navigation.navigate('Map', {
                          coords: item.coords,
                        })
                      }
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginLeft: 118,
                      }}
                    >
                      <Feather
                        name="map-pin"
                        size={24}
                        color="#BDBDBD"
                        style={{ marginRight: 3 }}
                      />
                      <Text style={styles.textLocation}>{item.locality}</Text>
                    </Pressable>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            )}
          />
        </View>
      </ImageBackground>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#ecf0f1',
  },
  container: {
    maxHeight: '85%',
    position: 'relative',
    justifyContent: 'flex-start',
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 16,
    paddingTop: 91,
  },
  bgImage: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  userInfo: {
    position: 'absolute',
    top: -60,
    left: '37%',
  },
  userName: {
    fontFamily: 'roboto-medium',
    fontSize: 30,
    lineHeight: 35,
    textAlign: 'center',
    color: '#212121',
    marginBottom: 33,
  },
  userCard: {
    flexDirection: 'row',
    marginTop: 8,
    alignItems: 'center',
  },
  commentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 49,
  },
  textLocation: {
    fontFamily: 'roboto-regular',
    fontSize: 16,
    lineHeight: 19,
    textAlign: 'right',
    textDecorationLine: 'underline',
    color: '#212121',
  },
  textTitle: {
    fontFamily: 'roboto-regular',
    fontSize: 16,
    lineHeight: 19,
    textAlign: 'left',
    color: '#212121',
    marginTop: 8,
  },

  logoutBtn: {
    position: 'absolute',
    top: 22,
    right: 18,
  },
});
