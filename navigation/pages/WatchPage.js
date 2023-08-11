import * as React from 'react';
import { View, Text } from 'react-native';

export default function WatchPage({navigation}){
    return(
      <View style={{ flex: 1, alighItems:'center', justifyContent:'center'}}>
        <Text
            onPress={() => navigation.navigate('Home')}
            style= {{ fontSize:26, fontWeight:'bold'}}>   Watch Page</Text>
      </View>
    )
}