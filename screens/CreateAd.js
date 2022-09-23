import React,{useState, useEffect} from 'react'
import { View, Text,StyleSheet,Alert,KeyboardAvoidingView} from 'react-native'
import { TextInput,Button} from 'react-native-paper'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker'
import { Camera, CameraType } from 'expo-camera';
// import * as ImagePicker from "expo-image-picker"
import * as ImagePicker from 'expo-image-picker'
import { store,auth,storagee,firebaseConfig} from '../firebase';
import {getStorage,ref,uploadBytes} from 'firebase/storage'

const CreateAd = () => {

    // useEffect((e)=>{
    //     e.preventDefault();
    //   },[])
      
    const [LandMrk,setLandMrk] = useState('')
    const [desc,setDesc] = useState('')
    const [size,setSize] = useState('')
    const [price,setPrice] = useState('')
    const [phone,setPhone] = useState('')
    const [maxCap,setMaxcap] = useState('')
    const [address,setAddress] = useState('')
    const [image,setImage] = useState("")

    const postData = async ()=>{
    
        try{
              await store.collection('ads')
          .add({
            LandMrk,
              desc,
              size,
              price,
              phone,
              maxCap,
              address,
              image:"http://res.cloudinary.com/hostelling-internation/image/upload/f_auto,q_auto/v1565973406/kwunkr44mtjdrqrzz3s7.jpg",
              uid:auth.currentUser.uid
          })
          
          Alert.alert("posted your Ad!");

          setLandMrk('');
          setDesc('');
          setSize('');
          setPrice('');
          setPhone('');
          setMaxcap('');
          setAddress('');
          setImage('');

 
        }catch(err){
            console.log(err);
          Alert.alert("something went wrong.try again")
        }       
    }

    const selectPhoto = async ()=>{
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });
      
          console.log(result.uri);
      
          if (!result.cancelled) {
            setImage(result.uri);
            console.log(result.uri)
            
          }

        //   const uploadTask = storageRef.child(`/items/${Date.now()}`).putFile(result.uri)

        //   uploadTask.on('state_changed', 
        //     (snapshot) => {
               
        //         var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        //          if(progress==100){alert("uploaded")}
        //     }, 
        //     (error) => {
        //        alert("something went wrong")
        //     }, 
        //     () => {
        //         uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {

        //             setImage(downloadURL)
        //         });
        //     }
        //     );
       }

    //    --------------------------------------------
    
    // const openCamera = ()=>{
    //     launchImageLibrary({quality:0.5},(fileobj)=>{
    //         const uploadTask =  storage().ref().child(`/items/${Date.now()}`).putFile(fileobj.uri)
    //         uploadTask.on('state_changed', 
    //         (snapshot) => {
               
    //             var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //              if(progress==100){alert("uploaded")}
    //         }, 
    //         (error) => {
    //            alert("something went wrong")
    //         }, 
    //         () => {
    //             // Handle successful uploads on complete
    //             // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    //             uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                   
    //                 setImage(downloadURL)
    //             });
    //         }
    //         );
    //        })
    //    }
    
    //    --------------------------------------------

       
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
               

                <Button icon="camera"  mode="contained" >
                     upload Image
                 </Button>
                <Button mode="contained" onPress={() => postData()}>
                     Post
                 </Button>
        </View>
// onPress={() => selectPhoto()}
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