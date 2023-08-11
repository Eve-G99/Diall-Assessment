import * as React from 'react';
import { Text, View } from 'react-native';

export default function SearchPage({navigation}){
    return(
      <View style={{ flex: 1, alighItems:'center', justifyContent:'center'}}>
        <Text
            onPress={() => navigation.navigate('Home')}
            style= {{ fontSize:26, fontWeight:'bold'}}>   Search Page</Text>
      </View>
    )
}