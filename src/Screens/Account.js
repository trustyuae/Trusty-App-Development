import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchById } from '../Redux/Slice/SingleProductslice'


const Account = () => {
  const dispatch=useDispatch()
  const {loading,error,responseData}=useSelector(state=>state.getById)


  useEffect(()=>{
    dispatch(fetchById(3276))
  },[])

  return (
    <View>
    <View style={styles.container}>
      <Text style={{fontSize: 22, fontFamily: 'Intrepid Regular'}}>
        Comming Soon
      </Text>
      </View>
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
export default Account;
