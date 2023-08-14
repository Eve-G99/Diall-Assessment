import * as React from 'react';
import { View, StyleSheet, Button, Text, FlatList, Dimensions, TouchableOpacity} from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import Share from 'react-native-share';

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
export default function VideoItem({item, index}) {
    const videoRef = React.useRef(null);
    const [isPaused, setIsPaused] = React.useState(false);
  
    const handleVideoPress = async () => {
        if (videoRef.current) {
            if (isPaused) {
                await videoRef.current.playAsync();
            } else {
                await videoRef.current.pauseAsync();
            }
            setIsPaused(!isPaused);
        }
    };
    return (
        <View style={[{ flex: 1, height: Dimensions.get('window').height - 170 }, index % 2 == 0 ? { backgroundColor: 'yellow' } : { backgroundColor: 'pink' }]}>
            <TouchableOpacity onPress={handleVideoPress} style={{ flex: 1 }}>
                <Video
                    ref={videoRef}
                    style={styles.video}
                    source={{ uri: item }}
                    useNativeControls={isPaused}
                    resizeMode={ResizeMode.CONTAIN}
                    shouldPlay
                    isLooping
                />
                {/* VideoInfo */ }
                {isPaused && (
                    <View style={styles.pausedOverlay}>
                        {/* <Text> </Text>  Replace with a paused icon */}
                    </View>
                )}
            </TouchableOpacity>
        </View>
    );
}