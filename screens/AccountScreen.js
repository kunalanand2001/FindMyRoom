import React,{useState,useEffect} from 'react'
import { View, Text,FlatList,StyleSheet } from 'react-native'
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { auth } from '../firebase';

const AccountScreen = () => {
  return (
    <View>
      <Text>{auth.currentUser.email}</Text>
      <Button style={{margin:'30%'}} mode ="contained" onPress={()=> auth.signOut()} >
        LogOut
      </Button>
    </View>
  )
}

export default AccountScreen