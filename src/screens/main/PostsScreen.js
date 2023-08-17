import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  StyleSheet,
  Image,
  View,
  FlatList,
  Text,
  Pressable,
  TouchableWithoutFeedback,
} from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

import common from '../../components/common';
import { getOwnPosts } from '../../services/firestoreOperations';
import { selectUser } from '../../redux/auth/authSelector';

const { MainContainer, TextRobotoRegular, TextRobotoBold } = common;

export default PostsScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const user = useSelector(selectUser);

  useEffect(() => {
    const unsuscribe = getOwnPosts({ callback: setPosts, uid: user.uid });
    return () => unsuscribe();
  }, []);

  return (
    <MainContainer style={styles.container}>
      <View style={styles.userInfo}>
        <Image
          source={{ uri: user.avatarUrl }}
          style={{ width: 60, height: 60, borderRadius: 16, marginRight: 8 }}
        />
        <View>
          <TextRobotoBold>{user.login}</TextRobotoBold>
          <TextRobotoRegular>{user.email}</TextRobotoRegular>
        </View>
      </View>
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
                style={{ width: 343, height: 240, borderRadius: 8 }}
              />
              <Text style={styles.textTitle}>{item.name}</Text>

              <View style={styles.userCard}>
                <Pressable
                  onPress={() =>
                    navigation.navigate('Comments', {
                      postId: item.id,
                      image: item.imageUrl,
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
                  style={styles.mapWrap}
                  onPress={() =>
                    navigation.navigate('Map', {
                      coords: item.coords,
                    })
                  }
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
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#ffffff',
  },
  userInfo: {
    marginTop: 32,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  userCard: {
    flexDirection: 'row',
    marginTop: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
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
  mapWrap: {
    flexDirection: 'row',
    marginRight: 20,
  },
});
