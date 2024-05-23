
import auth from '@react-native-firebase/auth';

export const sendPasswordResetEmail = async (email) => {
  try {
    await auth().sendPasswordResetEmail(email);
  } catch (error) {
   console.log(error);
  }
};