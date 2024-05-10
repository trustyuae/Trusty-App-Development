import React from 'react';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Counter from '../Components/Counter';

const Home = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Home!</Text>
      <Counter />

      <Icon name="rocket" size={30} color="#900" />
    </View>
  );
};

export default Home;
