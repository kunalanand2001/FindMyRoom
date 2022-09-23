import React,{useEffect,useState} from 'react'
import { View, Text ,FlatList,StyleSheet,Linking,Platform} from 'react-native'
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { store } from '../firebase';
import HomeHeader from '../components/HomeHeader';
import { COLORS } from '../constants';

const ItemsList = () => {

  const myitems =[
    {
      LandMrk:"abc mark",
      desc:"Sample Description .... here it is",
      size:"1BHK",
      price:"6000",
      phone:"9856483745",
      maxCap:"2",
      address:"abb nagar",
      image:"https://www.shutterstock.com/image-photo/word-link-serious-businessman-hands-600w-180015809.jpg"
    },{
      LandMrk:"abc mark",
      desc:"Sample Description .... here it is",
      size:"1BHK",
      price:"6000",
      phone:"8856483745",
      maxCap:"2",
      address:"abb nagar",
      image:"https://www.shutterstock.com/image-photo/word-link-serious-businessman-hands-600w-180015809.jpg"
    },{
      LandMrk:"abc mark",
      desc:"Sample Description .... here it is",
      size:"1BHK",
      price:"6000",
      phone:"7856483745",
      maxCap:"2",
      address:"abb nagar",
      image:"https://www.shutterstock.com/image-photo/word-link-serious-businessman-hands-600w-180015809.jpg"
    }
  ]

  const [items,setItems] = useState([])
  const [loading,setLoading] = useState(false)
  const [newData, setNewData] = useState(items);

    const getDetails = async ()=>{
      const querySnap = await store.collection('ads').get()
      const result =  querySnap.docs.map(docSnap=>docSnap.data())
      console.log(result)
      setItems(result)
      setNewData(result)
    }

    const openDial = (phone)=>{
      if(Platform.OS ==='android'){
        Linking.openURL(`tel:${phone}`)
      }else{
        Linking.openURL(`telprompt:${phone}`)
      }
    }

    useEffect(()=>{
      getDetails()
      return ()=>{
        console.log("cleanup")
      }
    },[])
    
    const handleSearch = (value) => {
      if (value.length === 0) {
        setNewData(items);
      }
  
      const filteredData = items.filter((item) =>
        item.LandMrk.toLowerCase().includes(value.toLowerCase())
      );
  
      if (filteredData.length === 0) {
        setNewData(items);
      } else {
        setNewData(filteredData);
      }
    };

    const descAlert = (value)=>{
      alert(value);
    }
    const renderItem = (item)=>{
        return(
            <Card style={styles.card}>
          <Card.Title title={item.LandMrk}  />
          <Card.Content>
            <Paragraph>{item.size}</Paragraph>
            <Paragraph>Rs {item.price} for {item.maxCap}</Paragraph>
            {/* <Paragraph>{item.desc}</Paragraph> */}
          </Card.Content>
          <Card.Cover source={{ uri: item.image }} />
          <Card.Actions>
          <Button onPress={()=>(descAlert(item.desc))}>Description</Button>
            <Button onPress={()=>(openDial(item.phone))}> call</Button>
          </Card.Actions>
        </Card>  
        )
      }
      
      
  return (
    <View>
      <FlatList
        data={newData.reverse()}
        keyExtractor={(item)=>item.phone}
        renderItem={({item})=>renderItem(item)}
        onRefresh={()=>{
          setLoading(true)
          getDetails()
          setLoading(false)
        }}
        refreshing={loading}
        ListHeaderComponent={<HomeHeader onSearch={handleSearch} />}
      />
    </View>
  )
}


const styles = StyleSheet.create({
    card:{
        margin:10,
        elevation:2
    }
     });
    


export default ItemsList