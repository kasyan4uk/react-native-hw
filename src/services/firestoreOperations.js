import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  where,
  orderBy,
  getCountFromServer,
} from 'firebase/firestore';

import { firestore } from '../firebase/firebase.config';
import { uploadImage } from '../utils/uploadImage';

export const addPost = async (form) => {
  try {
    const { uid, imageUrl, name, locality, coords } = form;
    const imageName = `${uid}_${Date.now().toString()}`;
    const url = await uploadImage(imageUrl, `images/${imageName}`);
    const postData = {
      owner: uid,
      imageUrl: url,
      name,
      locality,
      coords,
    };
    const postsRef = collection(firestore, 'publications');
    await addDoc(postsRef, {
      ...postData,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    return error.message;
  }
};

export const getPosts = ({ callback }) => {
  try {
    const postsRef = collection(firestore, 'publications');
    const queryPosts = query(postsRef, orderBy('createdAt', 'desc'));
    const unsuscribe = onSnapshot(queryPosts, (snapshot) => {
      const posts = [];
      snapshot.forEach(async (doc) => {
        const commentsRef = collection(
          firestore,
          'publications',
          `${doc.id}`,
          'comments'
        );
        const result = await getCountFromServer(commentsRef);
        const comments = result.data().count || 0;
        posts.push({
          ...doc.data(),
          id: doc.id,
          comments,
        });
      });
      callback(posts);
    });
    return unsuscribe;
  } catch (error) {
    return error.message;
  }
};

export const getOwnPosts = ({ callback, uid }) => {
  try {
    const postsRef = collection(firestore, 'publications');
    const queryPosts = query(
      postsRef,
      where('owner', '==', uid),
      orderBy('createdAt', 'desc')
    );
    const unsuscribe = onSnapshot(queryPosts, (snapshot) => {
      const posts = [];
      snapshot.forEach(async (doc) => {
        const commentsRef = collection(
          firestore,
          'publications',
          `${doc.id}`,
          'comments'
        );
        const result = await getCountFromServer(commentsRef);
        const comments = result.data().count || 0;
        posts.push({
          ...doc.data(),
          id: doc.id,
          comments,
        });
      });
      callback(posts);
    });
    return unsuscribe;
  } catch (error) {
    return error.message;
  }
};

export const addComment = async (data) => {
  try {
    const { postId, commentData } = data;
    const commentsRef = collection(
      firestore,
      'publications',
      `${postId}`,
      'comments'
    );
    await addDoc(commentsRef, {
      ...commentData,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    return error.message;
  }
};

export const getComments = ({ postId, callback }) => {
  try {
    const commentsRef = collection(
      firestore,
      'publications',
      `${postId}`,
      'comments'
    );
    const queryComments = query(commentsRef, orderBy('createdAt'));
    const unsuscribe = onSnapshot(queryComments, (snapshot) => {
      const comments = [];
      snapshot.forEach((doc) => {
        comments.push({
          ...doc.data(),
          id: doc.id,
        });
      });
      callback(comments);
    });
    return unsuscribe;
  } catch (error) {
    return error.message;
  }
};
