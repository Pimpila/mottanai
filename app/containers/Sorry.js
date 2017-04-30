import React from 'react'

import {
  View,
  Image,
  Text,
  TextInput,
  StyleSheet
} from 'react-native'


export default function Sorry() {
  return (
     <Image
        source={{uri: 'http://theinspirationgrid.com/wp-content/uploads/2014/05/photography-julie-lee-08.jpg'}}
        style={styles.scene}>
        <View style={styles.container}>
          <Text style={styles.intro}>Sorry no recipes were found :(</Text>
        </View>
    </Image>
  )
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 20
  },
  container: {
    width: 300,
    height: 350,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, .85)'
  },
  intro: {
    flex: 1,
    color: '#3d5c5c',
    fontSize: 30,
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
    marginVertical: 20,
    marginHorizontal: 20,
  },
});
