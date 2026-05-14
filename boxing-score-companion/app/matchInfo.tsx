import React, {useState, useEffect} from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import RoundRow from './components/roundRow';

export default function MatchInfoScreen() {
    const router = useRouter();
    const { fighter1, fighter2, rounds, savedRound, savedLeftScore, savedRightScore, savedScores } = useLocalSearchParams();
    
    const [roundScores, setRoundScores] = useState<Record<number, { left: string; right: string }>>({});
    const [fighter1Name, setFighter1Name] = useState(fighter1);
    const [fighter2Name, setFighter2Name] = useState(fighter2);
    const [selectedRounds, setSelectedRounds] = useState(rounds);

    useEffect(() => {
        let currentScores: Record<number, { left: string; right: string }> = {};
        if (savedScores) {
            try {
                currentScores = JSON.parse(String(savedScores));
            } catch {
                currentScores = {};
            }
        }
        if (savedRound && savedLeftScore && savedRightScore) {
            const roundNumber = Number(savedRound);

            currentScores[roundNumber] = {
                left: String(savedLeftScore),
                right: String(savedRightScore),
            };
        }
        setRoundScores(currentScores);
    }, [savedScores, savedRound, savedLeftScore, savedRightScore]);

    const isRoundScored = (roundNumber: number) => {
    return !!roundScores[roundNumber]?.left && !!roundScores[roundNumber]?.right;
};

    const getTotalScore = (side: 'left' | 'right', currentRound: number) => {
        let total = 0;
        for (let round = 1; round <= currentRound; round++) {
            const score = roundScores[round]?.[side];

            if (score) {
                total += Number(score);
            }
        }
        return total || '-';
    };

    const getPlusMinus = (currentRound: number) => {
        const leftTotal = getTotalScore('left', currentRound);
        const rightTotal = getTotalScore('right', currentRound);

        if (leftTotal === '-' || rightTotal === '-') return '-';

        const diff = Number(leftTotal) - Number(rightTotal);

        if (diff > 0) return `+${diff}`;
        if (diff < 0) return String(diff);
        return '0';
    };

    return (
        <View style={styles.container}>
            <View style={styles.topDescription}>
                <Text style={[styles.fighterText, styles.fighter1Name]}>{fighter1}</Text>
                <Text style={[styles.fighterText, styles.vsText]}>vs</Text>
                <Text style={[styles.fighterText, styles.fighter2Name]}>{fighter2}</Text>
            </View>
            <View style={styles.headerRow}>
                    <Text style={[styles.headerText, styles.leftHeader]}>Round</Text>
                    <Text style={[styles.headerText, styles.leftHeader]}>Total</Text>
                    <Text style={styles.headerText}>+/-</Text>
                    <Text style={[styles.headerText, styles.rightHeader]}>Total</Text>
                    <Text style={[styles.headerText, styles.rightHeader]}>Round</Text>
                </View>
            
            <ScrollView style={styles.rowContainer}>
                
                {Array.from({ length: parseInt(rounds as string) }).map((_, index) => {
                    const roundNumber = index + 1;

                    return (
                        <RoundRow
                            key={roundNumber}
                            roundNumber={roundNumber}
                            leftScore={roundScores[roundNumber]?.left}
                            rightScore={roundScores[roundNumber]?.right}
                            leftTotal={isRoundScored(roundNumber) ? String(getTotalScore('left', roundNumber)) : '-'}
                            rightTotal={isRoundScored(roundNumber) ? String(getTotalScore('right', roundNumber)) : '-'}
                            plusMinus={isRoundScored(roundNumber) ? String(getPlusMinus(roundNumber)) : '-'}
                            fighter1={String(fighter1)}
                            fighter2={String(fighter2)}
                            rounds={String(rounds)}
                            savedScores={JSON.stringify(roundScores)}
                        />
                    );
                })}
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
