import React,{useState} from 'react'
import { View, Text,StyleSheet,Alert,KeyboardAvoidingView} from 'react-native'
import { TextInput,Button} from 'react-native-paper'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker'
import { Camera, CameraType } from 'expo-camera';
import * as ImagePicker from "expo-image-picker"

const CreateAd = () => {
    const [LandMrk,setLandMrk] = useState('')
    const [desc,setDesc] = useState('')
    const [size,setSize] = useState('')
    const [price,setPrice] = useState('')
    const [phone,setPhone] = useState('')
    const [maxCap,setMaxcap] = useState('')
    const [address,setAddress] = useState('')
    const [image,setImage] = useState("")

    // const postData = async ()=>{
    
    //     try{
    //           await db.collection('ads')
    //       .add({
    //         LandMrk,
    //           desc,
    //           size,
    //           price,
    //           phone,
    //           maxCap,
    //           address,
    //           image:"https://www.shutterstock.com/image-photo/word-link-serious-businessman-hands-600w-180015809.jpg",
    //           uid:auth.currentUser.uid
    //       })
    //       Alert.alert("posted your Ad!")
 
    //     }catch(err){
    //         console.log(err);
    //       Alert.alert("something went wrong.try again")
    //     }       
    // }

    // const selectPhoto = async ()=>{
    //     let result = await ImagePicker.launchImageLibraryAsync({
    //         mediaTypes: ImagePicker.MediaTypeOptions.All,
    //         allowsEditing: true,
    //         aspect: [4, 3],
    //         quality: 1,
    //       });
      
    //       console.log(result.uri);
      
    //       if (!result.cancelled) {
    //         setImage(result.uri);
    //       }
    //    }
       
  return (
    
    <View style={styles.container}>
            <Text style={styles.text}>Create Ad!</Text>
            <TextInput
                label="Land Mark"
                value={LandMrk}
                mode="outlined"
                onChangeText={text => setLandMrk(text)}
                />
            <TextInput
                label="Full address"
                value={address}
                numberOfLines={3}
                multiline={true}
                mode="outlined"
                onChangeText={text => setAddress(text)}
                />
            <TextInput
                label="Describe room/place"
                value={desc}
                mode="outlined"
                numberOfLines={5}
                multiline={true}
                onChangeText={text => setDesc(text)}
                />
            <TextInput
                label="size of Room"
                value={size}
                mode="outlined"
                // keyboardType="numeric"
                onChangeText={text => setSize(text)}
                />
            <TextInput
                label="maximum capacity of room"
                value={maxCap}
                mode="outlined"
                keyboardType="numeric"
                onChangeText={text => setMaxcap(text)}
                />
            <TextInput
                label="price in INR"
                value={price}
                mode="outlined"
                // keyboardType="numeric"
                onChangeText={text => setPrice(text)}
                />
            <TextInput
                label="Your contact Number"
                value={phone}
                mode="outlined"
                keyboardType="numeric"
                onChangeText={text => setPhone(text)}
                />
               

                <Button icon="camera"  mode="contained">
                     upload Image
                 </Button>
                <Button mode="contained">
                     Post
                 </Button>
        </View>
    // onPress={() => selectPhoto()}
    // onPress={() => postData()}

  );
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        marginHorizontal:30,
        justifyContent:"space-evenly"
    },
    text:{
        fontSize:24,
        textAlign:"center"
    }
     });
     
export default CreateAd;