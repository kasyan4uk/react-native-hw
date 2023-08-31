import * as Font from 'expo-font';

import fonts from '../assets/fonts';

export const loadFonts = async () => {
  await Font.loadAsync(fonts);
};
