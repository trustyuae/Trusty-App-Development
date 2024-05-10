import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Text, View, Button} from 'react-native';
import {
  increment,
  decrement,
  incrementByAmount,
} from '../Redux/Slice/counterSlice';

const Counter = () => {
  const count = useSelector(state => state.counter.value);
  const dispatch = useDispatch();

  return (
    <View>
      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        <Button title="Increment" onPress={() => dispatch(increment())} />
        <Text>{count}</Text>
        <Button title="Decrement" onPress={() => dispatch(decrement())} />
      </View>
      <View style={{marginTop: 10}}>
        <Button
          title="Increment by 5"
          onPress={() => dispatch(incrementByAmount(5))}
        />
      </View>
    </View>
  );
};

export default Counter;
