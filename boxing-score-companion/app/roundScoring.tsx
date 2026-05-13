import { useRouter, useLocalSearchParams, Stack } from 'expo-router';
import { View, Text, Pressable, StyleSheet, Vibration} from 'react-native';
import { useEffect } from 'react';
import * as ScreenOrientation from 'expo-screen-orientation';
import * as Haptics from 'expo-haptics';
import { useWindowDimensions } from 'react-native';

export default function RoundScoringScreen() {
    const router = useRouter();
    const { roundNumber } = useLocalSearchParams();
    const { width, height } = useWindowDimensions();

    useEffect(() => {
        // Lock to landscape mode
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);

        // Cleanup: restore default orientation when leaving screen
        return () => {
            ScreenOrientation.unlockAsync();
        };
    }, []);

    return (
        
        <View style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />
            <Pressable 
                style={styles.leftArea}
                onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                }}
            >
                <View style={[styles.kdButton, styles.leftkd]}>
                    <Text>
                        Hold for Knockdown
                    </Text>
                </View>
            </Pressable>

            <Pressable style={styles.rightArea} onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }}>
                <Pressable 
                    style={[styles.kdButton, styles.rightkd, {  height: height * 0.1 }]}>
                    <Text>
                        Hold for Knockdown
                    </Text>
                </Pressable>
            </Pressable>
            <Pressable
                style={styles.exitButton}
                onPress={() => router.back()}
            >
                <Text style={styles.exitButtonText}>Hold to Exit Round</Text>
            </Pressable>
        </View>
    );
}

RoundScoringScreen.screenOptions = {
    headerShown: false,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        width: '100%',
        height: '100%',
    },
    description: {
        color: '#333',
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 20,
    },
    exitButton: {
        backgroundColor: 'gold',
        width: 200,
        height: 75,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 36,
        top: '-12%',
        left: '47%',
        transform: [{ translateX: -75 }]
    },
    exitButtonText: {   
        color: '#000',
        textAlign: 'center',
        fontSize: 14,
        marginTop: 40
    },
    kdButton: {
        position: 'absolute',
        // justifyContent: 'center',
        alignItems: 'center',
        width: 200,
        height: 50,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        left: '50%',
        transform: [{ translateX: -75 }],
        backgroundColor: 'gold',
        paddingTop: 5

    },
    leftArea: {
        backgroundColor: '#307Fb6',
        height: '100%',
        width: '50%',
        position: 'absolute',
    },
    leftkd: {
        bottom: -20,
    },
    rightkd: {
        bottom: -10,
    },
    rightArea: {
        backgroundColor: '#b63030',
        height: '100%',
        width: '50%',
        position: 'absolute',
        right: 0,
    },

    
    title: {
        color: '#000',
        fontSize: 28,
        fontWeight: '700',
        marginBottom: 20,
    },

});