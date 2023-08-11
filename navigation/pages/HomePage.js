import * as React from 'react';
import { View, Text } from 'react-native';

export default function HomePage({navigation}){
    return(
      <View style={{ flex: 1, alighItems:'center', justifyContent:'center'}}>
        <Text
            onPress={() => alert('This is Home Page.')}
            style= {{ fontSize:26, fontWeight:'bold'}}>   Home Page</Text>
      </View>
    )
}