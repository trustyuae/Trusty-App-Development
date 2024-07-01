
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const CommingSoon = () => {
  return (
    <View style={styles.container}>
      <Text>coming Soon</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F1EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default CommingSoon;
