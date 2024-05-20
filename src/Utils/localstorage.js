import AsyncStorage from '@react-native-async-storage/async-storage';

export const getToken = async () => {
  try {
    const tokenJson = await AsyncStorage.getItem('token');
    if (tokenJson !== null) {
      const token = JSON.parse(tokenJson);
      return token;
    } else {
      return null;
    }
  } catch (error) {
    console.log('Error retrieving token: ', error);
    return null;
  }
};
