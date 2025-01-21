import React,{useState, useEffect} from 'react';
import { FlatList, StatusBar, Text, TextInput, View, StyleSheet} from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome6";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    icon: {
        marginRight: 15,
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'red',
    },
    input: {
        borderWidth: 1,
        borderColor: 'red',
        padding: 10,
        borderRadius: 10,
        marginBottom: 20,
        backgroundColor: 'white',
    },
    itemContainer: {
        backgroundColor: '#FAE3D9',
        borderColor: 'rgba(255, 0, 0, 0.3)',
        padding: 15,
        borderRadius: 12,
        marginBottom: 12,
        borderWidth: 1,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 6,
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    value: {
        marginBottom: 5,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

let originalData = [];

const App = () => {

  const [mydata, setMyData] = useState([]);

  useEffect(() => {
    fetch("https://mysafeinfo.com/api/data?list=bloodtypesdistlist&format=json&case=default")
        .then((response) => {
          return response.json();
        })
        .then((myJson) => {
          if(originalData.length < 1)
          {
            setMyData(myJson);
            originalData = myJson;
          }
        })
  },[]);

  const FilterData = (text) => {
    if (text !== '') {
      let myFilteredData = originalData.filter((item) =>
          item.BloodType.toLowerCase().includes(text.toLowerCase()) ||
          item.Group.toLowerCase().includes(text.toLowerCase()) ||
          item.ID.toString().includes(text)
      );
      setMyData(myFilteredData);
    } else {
      setMyData(originalData);
    }
  };

  const renderItem = ({ item }) => (
      <View style={styles.itemContainer}>

        <View style={styles.row}>
          <Text style={styles.label}>ID: </Text>
          <Text style={styles.value}>{item.ID}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Blood Type: </Text>
          <Text style={styles.value}>{item.BloodType}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Group: </Text>
          <Text style={styles.value}>{item.Group}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Distribution %: </Text>
          <Text style={styles.value}>{item.DistributionPct}</Text>
        </View>
      </View>
  );

  return (
      <View style={styles.container}>
        <StatusBar backgroundColor="red" barStyle="light-content" />
        <View style={styles.header}>
          <Icon name="droplet" size={24} color="red" style={styles.icon} />
          <Text style={styles.headerText}>Blood Type Distributions</Text>
        </View>
        <TextInput
            style={styles.input}
            placeholder="Search..."
            onChangeText={FilterData}
        />
        <FlatList data={mydata} renderItem={renderItem} />
      </View>
  );
};

export default App;
