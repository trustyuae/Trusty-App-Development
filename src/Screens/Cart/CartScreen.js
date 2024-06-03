import { View, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';

import StepperComponet from '../../Components/Stepper/StepperComponet';
import Cart from '../../Components/Stepper form Componets/Cart';
import Checkout from '../../Components/Stepper form Componets/Checkout';
import Confirmation from '../../Components/Stepper form Componets/Confirmation';
import ModalComponent from '../../Components/Model/Modalcomopnet';
import { useDispatch, useSelector } from 'react-redux';
import { ViewToCart } from '../../Redux/Slice/car_slice/viewcart';
import { SafeAreaView } from 'react-native';

const labels = ['Cart', 'Checkout', 'confirmation'];

const CartScreen = () => {
  const [count, setCount] = useState(0);
  const [number, setNumber] = useState(1);
  const [orderdetail, setOrderDetail] = useState([]);
  const [total, setTotal] = useState(0);
  const [getorderdetail, setGetorderDetail] = useState();

  // const openModal = () => {
  //   setIsModalVisible(true);
  // };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const renderCartItems = () => (
    <Cart
      count={count}
      setCount={setCount}
      number={number}
      setOrderDetail={setOrderDetail}
      setTotal={setTotal}
    />
  );

  const renderDelivery = () => (
    <Checkout
      count={count}
      setCount={setCount}
      orderdetail={orderdetail}
      total={total}
      setGetorderDetail={setGetorderDetail}
    />
  );

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
    <SafeAreaView>
      <ScrollView >
        <View>
          {count == 2 ? null : (
            <View style={{ marginTop: 90 }}>
              <StepperComponet labels={labels} count={count} stepCount={3} />
            </View>
          )}
          {renderContent()}
        </View>
      </ScrollView>
    </SafeAreaView>

  );
};

export default CartScreen;
