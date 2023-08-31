import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase/firebase.config';
import { DEFAULT_AVATAR_IMG } from '@env';

export const uploadImage = async (uri, filePath) => {
  try {
    if (!uri) {
      return DEFAULT_AVATAR_IMG;
    }
    const response = await fetch(uri).then((res) => res.blob());
    const imageRef = ref(storage, filePath);
    await uploadBytes(imageRef, response);
    const url = await getDownloadURL(imageRef);
    return url;
  } catch (error) {
    throw error;
  }
};
