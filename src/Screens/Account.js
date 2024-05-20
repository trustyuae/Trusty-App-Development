import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchById } from '../Redux/Slice/SingleProductslice'


const Account = () => {
  const dispatch=useDispatch()
  const {loading,error,responseData}=useSelector(state=>state.getById)

  console.log("state---------->",responseData);

  useEffect(()=>{
    dispatch(fetchById(3276))
  },[])

  return (
    <View>
      <Text></Text>
    </View>
  )
}

export default Account

const styles = StyleSheet.create({})