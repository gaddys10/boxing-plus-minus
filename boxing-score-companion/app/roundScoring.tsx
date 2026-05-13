import { useRouter, Stack } from 'expo-router';
import { View, Text, Pressable, StyleSheet, Animated, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useRef, useState } from 'react';
import * as ScreenOrientation from 'expo-screen-orientation';
import * as Haptics from 'expo-haptics';

export default function RoundScoringScreen() {
    const router = useRouter();
    const { height } = useWindowDimensions();
    const [winner, setWinner] = useState<"left" | "right" | "even">("even");
    const [score, setScore] = useState(0);

    const leftPulseAnim = useRef<Animated.Value>(new Animated.Value(1)).current;
    const rightPulseAnim = useRef<Animated.Value>(new Animated.Value(1)).current;

    useEffect(() => {
        // Lock to landscape mode
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);

        // Cleanup: restore default orientation when leaving screen
        return () => {
            ScreenOrientation.unlockAsync();
        };
    }, []);

    const pulseAnimation = (animation: Animated.Value) => {
        Animated.sequence([
            Animated.timing(animation, {
                toValue: 1.3,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.timing(animation, {
                toValue: 1,
                duration: 100,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const handleScorePress = (side: 'left' | 'right') => {
        setScore((currentScore) => {
            if (side === 'left') {
                return currentScore + 1;
            }
            return currentScore - 1;
        });
    };

    const absoluteScore = Math.abs(score);

    return (
        
        <View style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />
            <Pressable 
                style={styles.leftArea}
                onPress={() => {
                    pulseAnimation(leftPulseAnim);
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    handleScorePress('left');
                }}
            >
                { score > 0 &&
                    <Text style={styles.leftScore}>
                        {score}
                        <Ionicons name="caret-back" size={24} color="white" />
                    </Text>
                }
                <Text style={styles.leftName}>Fighter 1</Text>
                <Animated.Text 
                    style={[
                        styles.plusSign, 
                        { transform: [{ scale: leftPulseAnim }] }
                    ]}
                >
                    +
                </Animated.Text>
                <Pressable style={[styles.kdButton, styles.leftkd]}>
                    <Text>
                        Hold for Knockdown
                    </Text>
                </Pressable>
            </Pressable>

            <Pressable style={styles.rightArea} onPress={() => {
                pulseAnimation(rightPulseAnim);
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                handleScorePress('right');
            }}>
                { score < 0 &&
                    <Text style={styles.rightScore}>
                        <Ionicons name="caret-forward" size={24} color="white" />{absoluteScore}
                    </Text>
                }
                <Text style={styles.rightName}>Fighter 2</Text>
                <Animated.Text 
                    style={[
                        styles.plusSign, 
                        { transform: [{ scale: rightPulseAnim }] }
                    ]}
                >
                    +
                </Animated.Text>
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
    leftName: {
        color: '#fff',
        fontSize: 24,
        fontWeight: '500',
        textAlign: 'center',
        marginTop: 50,
    },

    plusSign: {
        position: 'absolute',
        top: '32%',
        left: '40%',
        transform: [{ translateX: -50 }, { translateY: -50 }],
        fontSize: 120,
        color: 'white',
        fontWeight: 'bold',
    },
    leftkd: {
        bottom: -20,
        left: '50%',

    },
    leftScore: {
        position: 'absolute',
        top: 50,
        right: 30,
        color: '#fff',
        fontSize: 24,
        textAlign: 'right'
    },
    rightkd: {
        bottom: -10,
        left: '40%',
    },
    rightArea: {
        backgroundColor: '#b63030',
        height: '100%',
        width: '50%',
        position: 'absolute',
        right: 0,
    },
    rightName: {
        color: '#fff',
        fontSize: 24,
        fontWeight: '500',
        textAlign: 'center',
        marginTop: 50,
    },
    rightScore: {
        position: 'absolute',
        top: 50,
        left: 30,
        color: '#fff',
        fontSize: 24,
    },
    title: {
        color: '#000',
        fontSize: 28,
        fontWeight: '700',
        marginBottom: 20,
    },
    fillOverlay: {
    ...StyleSheet.absoluteFillObject,
    }

});