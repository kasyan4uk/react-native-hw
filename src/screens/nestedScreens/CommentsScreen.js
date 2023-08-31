import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Pressable,
  TextInput,
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import { isBtnDisable } from '../../utils/isBtnDisable';
import { selectUser } from '../../redux/auth/authSelector';
import common from '../../components/common';
import { addComment, getComments } from '../../services/firestoreOperations';
import { transformDate } from '../../utils/transformDate';

const { MainContainer, TextRobotoRegular } = common;

export default CommentsScreen = ({ route }) => {
  const [text, setText] = useState('');
  const [comments, setComments] = useState([]);
  const { uid, avatarUrl } = useSelector(selectUser);
  const isDisable = isBtnDisable({ text });
  const { postId, imageUrl } = route.params;

  const createComment = async () => {
    setText('');
    const commentData = { text, avatarUrl, owner: uid };
    await addComment({ postId, commentData });
  };

  useEffect(() => {
    const unsuscribe = getComments({ callback: setComments, postId });
    return () => {
      unsuscribe();
    };
  }, []);

  return (
    <MainContainer style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.imageWrapper}>
          <Image style={styles.postImage} source={{ uri: imageUrl }} />
        </View>
        <View
          style={{
            ...styles.postsList,
          }}
        >
          <FlatList
            data={comments}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableWithoutFeedback>
                <View
                  style={{
                    ...styles.commentBox,
                    flexDirection: item.owner === uid ? 'row' : 'row-reverse',
                  }}
                >
                  <View style={styles.commentTextWrapper}>
                    <Text style={styles.commentText}>{item.text}</Text>
                    <Text style={styles.commentDate}>
                      {`${transformDate(item.createdAt).date} | ${
                        transformDate(item.createdAt).time
                      }`}
                    </Text>
                  </View>
                  <View style={styles.commentAvatar}>
                    {item.avatarUrl && (
                      <Image
                        style={styles.commentAvatar}
                        source={{ uri: item.avatarUrl }}
                      />
                    )}
                  </View>
                </View>
              </TouchableWithoutFeedback>
            )}
          />
          <View
            style={{
              ...styles.commentInputWrapper,
            }}
          >
            <TextInput
              style={
                text
                  ? { ...styles.commentInput, color: '#212121' }
                  : styles.commentInput
              }
              value={text}
              multiline
              autoFocus={false}
              selectionColor="#FF6C00"
              blurOnSubmit={true}
              placeholderTextColor="#BDBDBD"
              onChangeText={setText}
              placeholder="Коментувати..."
            ></TextInput>
            <Pressable
              style={{
                ...styles.addCommentBtn,
                opacity: isDisable ? 0.5 : 1,
              }}
              onPress={createComment}
              disabled={isDisable}
            >
              <AntDesign name="arrowup" size={20} color="#ffffff" />
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 16,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  imageWrapper: {
    alignItems: 'center',
  },
  postImage: {
    width: 343,
    height: 240,
    borderRadius: 8,
  },
  postsList: {
    marginTop: 24,
    maxHeight: '50%',

    width: '100%',
  },
  commentBox: {
    marginBottom: 24,
    justifyContent: 'center',
    gap: 16,
    width: 343,
  },
  commentTextWrapper: {
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    borderRadius: 6,
    padding: 16,
    width: 290,
  },
  commentText: {
    fontFamily: 'roboto-regular',
    fontSize: 13,
    color: '#212121',
    lineHeight: 18,
  },
  commentDate: {
    fontFamily: 'roboto-regular',
    fontSize: 10,
    color: '#BDBDBD',
    lineHeight: 12,
    textAlign: 'right',
  },
  commentAvatar: {
    borderRadius: 50,
    width: 28,
    height: 28,
    backgroundColor: '#BDBDBD',
  },
  commentInputWrapper: {
    position: 'relative',
    width: 349,
    marginTop: 16,
  },
  commentInput: {
    width: '100%',
    paddingLeft: 16,
    paddingRight: 50,
    height: 50,
    backgroundColor: '#F6F6F6',
    borderRadius: 100,
    fontFamily: 'roboto-medium',
    fontSize: 16,
    color: '#BDBDBD',
    lineHeight: 19,
    textAlignVertical: 'center',
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  addCommentBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 34,
    height: 34,
    borderRadius: 50,
    backgroundColor: '#FF6C00',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyMessageBox: {
    marginTop: 24,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyMessageStyle: {
    fontFamily: 'roboto-medium',
    fontSize: 16,
    color: '#212121',
    lineHeight: 19,
    textAlign: 'center',
  },
});
