import { auth, database, storage } from '../../firebase/firebase.config';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { uploadImage } from '../../utils/uploadImage';

export const authSignUp = createAsyncThunk(
  'auth/signup',
  async (form, { rejectWithValue }) => {
    try {
      const { email, password, avatarUrl, login } = form;
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email.toLowerCase(),
        password
      );

      const url = await uploadImage(avatarUrl, `avatars/${user.uid}`);

      await updateProfile(auth.currentUser, {
        displayName: login,
        photoURL: url,
      });

      return {
        uid: user.uid,
        email: user.email,
        login: user.displayName,
        avatarUrl: user.photoURL,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const authSignIn = createAsyncThunk(
  'auth/signin',
  async (user, { rejectWithValue }) => {
    try {
      const { email: userEmail, password } = user;
      const userCredential = await signInWithEmailAndPassword(
        auth,
        userEmail.toLowerCase(),
        password
      );
      const {
        uid,
        displayName: login,
        email,
        photoURL: avatarUrl,
      } = userCredential.user;
      return { uid, login, email, avatarUrl };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const authLogOut = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
