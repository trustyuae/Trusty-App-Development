import AsyncStorage from '@react-native-async-storage/async-storage';

export const getToken = async () => {
  try {
    const tokenJson = await AsyncStorage.getItem('tokens');
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

export const getUserId = async () => {
  try {
    const userIdJson = await AsyncStorage.getItem('user_id');
    if (userIdJson !== null) {
      const user_id = JSON.parse(userIdJson);
      return user_id;
    } else {
      return null;
    }
  } catch (error) {
    console.log('Error retrieving token: ', error);
  }
};

export const getUsername = async () => {
  try {
    const username = await AsyncStorage.getItem('user_email');
    if (username !== null) {
      const useremail = JSON.parse(username);
      return useremail;
    }
  } catch (error) {
    console.log('Error retrieving token: ', error);
    return null;
  }
};
