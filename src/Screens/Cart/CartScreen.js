import {View, ScrollView} from 'react-native';
import React, {useState} from 'react';

import StepperComponet from '../../Components/Stepper/StepperComponet';
import Cart from '../../Components/Stepper form Componets/Cart';
import Checkout from '../../Components/Stepper form Componets/Checkout';
import Confirmation from '../../Components/Stepper form Componets/Confirmation';

const labels = ['Cart', 'Checkout', 'confirmation'];

const CartScreen = () => {
  const [count, setCount] = useState(0);
  const [number, setNumber] = useState(1);

  const renderCartItems = () => (
    <Cart
      count={count}
      setCount={setCount}
      number={number}
      setNumber={setNumber}
    />
  );

  const renderDelivery = () => <Checkout count={count} setCount={setCount} />;

  const renderConfirmation = () => (
    <Confirmation count={count} setCount={setCount} />
  );

  const renderContent = () => {
    switch (count) {
      case 0:
        return renderCartItems();
      case 1:
        return renderDelivery();
      case 2:
        return renderConfirmation();
      default:
        return null;
    }
  };

  return (
    <ScrollView>
      <View>
        {count == 2 ? null : (
          <View style={{marginTop: 90}}>
            <StepperComponet labels={labels} count={count} stepCount={3} />
          </View>
        )}
        {renderContent()}
      </View>
    </ScrollView>
  );
};

export default CartScreen;
