import React, {useState, useEffect} from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import RoundRow from './components/roundRow';

export default function MatchInfoScreen() {
    const router = useRouter();
    const { fighter1, fighter2, rounds, savedRound, savedLeftScore, savedRightScore } = useLocalSearchParams();
    const [roundScores, setRoundScores] = useState<Record<number, { left: string; right: string }>>({});
    const [fighter1Name, setFighter1Name] = useState(fighter1);
    const [fighter2Name, setFighter2Name] = useState(fighter2);
    const [selectedRounds, setSelectedRounds] = useState(rounds);

    useEffect(() => {
        if (!savedRound || !savedLeftScore || !savedRightScore) return;

        const roundNumber = Number(savedRound);

        setRoundScores((currentScores) => ({
            ...currentScores,
            [roundNumber]: {
                left: String(savedLeftScore),
                right: String(savedRightScore),
            },
        }));
    }, [savedRound, savedLeftScore, savedRightScore]);

    return (
        <View style={styles.container}>
            <View style={styles.topDescription}>
                <Text style={[styles.fighterText, styles.fighter1Name]}>{fighter1}</Text>
                <Text style={[styles.fighterText, styles.vsText]}>vs</Text>
                <Text style={[styles.fighterText, styles.fighter2Name]}>{fighter2}</Text>
            </View>
            <View style={styles.headerRow}>
                    <Text style={[styles.headerText, styles.leftHeader]}>Total</Text>
                    <Text style={[styles.headerText, styles.leftHeader]}>Round</Text>
                    <Text style={styles.headerText}>+/-</Text>
                    <Text style={[styles.headerText, styles.rightHeader]}>Round</Text>
                    <Text style={[styles.headerText, styles.rightHeader]}>Total</Text>
                </View>
            
            <ScrollView style={styles.rowContainer}>
                
                {Array.from({ length: parseInt(rounds as string) }).map((_, index) => (
                    // <RoundRow key={index} roundNumber={index + 1} />
                    <RoundRow
                        key={index}
                        roundNumber={index + 1}
                        leftScore={roundScores[index + 1]?.left}
                        rightScore={roundScores[index + 1]?.right}
                        fighter1={String(fighter1)}
                        fighter2={String(fighter2)}
                        rounds={String(rounds)}
                    />
                ))}
            </ScrollView>
            <Pressable 
                style={styles.button}
                onPress={() => router.back()}
            >
                <Text style={styles.buttonText}>Back</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 24,
    },
    leftHeader: {
        color: 'red'
    },
    rightHeader: {
        color: 'blue'
    },
    rowContainer: {
        flex: 1,
        marginBottom: 16,
        marginHorizontal: -24,
        paddingHorizontal: 15,
    },
    title: {
        color: '#000',
        fontSize: 28,
        fontWeight: '700',
        marginBottom: 20,
    },
    description: {
        color: '#000',
        fontSize: 16,
        marginBottom: 50,
        // marginLeft: -12,
        width: '100%',
        padding: 0,
        marginLeft: 24
    },
    topDescription: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 50,
        width: '75%',
        marginLeft: 27,
        marginHorizontal: 0
    },
    fighterText: {
        flex: 1,
        fontSize: 16,
        fontWeight: '700',
    },
    fighter1Name: {
        color: '#D32F2F',
        textAlign: 'left',
    },
    vsText: {
        color: '#000',
        textAlign: 'center',
    },
    fighter2Name: {
        color: '#1976D2',
        textAlign: 'right',
    },
    
    button: {
        backgroundColor: '#000',
        paddingHorizontal: 24,
        paddingVertical: 14,
        borderRadius: 12,
    },
    buttonText: {
        color: '#307Fb6',
        fontSize: 18,
        fontWeight: '700',
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
        marginHorizontal: 0,
        paddingBottom: 10,
        marginLeft: 36,
        width: '70%'
    },
    headerText: {
        flex: 1,
        textAlign: 'center',
        color: '#333',
        fontSize: 12,
        fontWeight: '600',
    },
});
