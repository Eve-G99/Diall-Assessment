import * as React from 'react';
import { View, StyleSheet, Button, Text, FlatList, Dimensions, TouchableOpacity} from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import VideoItem from './VideoItem';

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#ecf0f1',
  },
  video: {
      alignSelf: 'center',
      width: 340,
      height: 680,
  },
  buttons: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
  },
  pausedOverlay: {
      ...StyleSheet.absoluteFill,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.6)',
  },
});

export default function WatchPage({ navigation }) {
  const array = [
      'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4',
      'https://file-examples.com/storage/fe7bb0e37864d66f29c40ee/2017/04/file_example_MP4_480_1_5MG.mp4',
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4'
  ];

  const renderItem = ({ item, index }) => <VideoItem item={item} index = {index} />;
                                            // <VideoContainer>
  return (
      <View style={styles.container}>
          <FlatList
              data={array}
              renderItem={renderItem}
              pagingEnabled
              keyExtractor={item => item}
              decelerationRate={'fast'}
          />
      </View>
  );
}