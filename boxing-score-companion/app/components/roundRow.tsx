import React, {useState} from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { router } from 'expo-router';

type RoundRowProps = {
    roundNumber: number;
    leftScore?: string;
    rightScore?: string;
    leftTotal?: string;
    rightTotal?: string;
    plusMinus?: string;
    fighter1: string;
    fighter2: string;
    rounds: string;
    savedScores: string;
};

export default function RoundRow({ roundNumber, leftScore, rightScore, leftTotal, rightTotal, plusMinus, fighter1, fighter2, rounds, savedScores }: RoundRowProps) {
    return (
        <View style={styles.row}>
            <Text>RD {roundNumber}</Text>
            <Text style={styles.leftRoundScore}>{leftScore ?? '-'}</Text>
            <Text style={styles.leftTotalScore}>{leftTotal ?? '-'}</Text>
            <Text style={styles.plusMinus}>{plusMinus ?? '-'}</Text>
            <Text style={styles.rightTotalScore}>{rightTotal ?? '-'}</Text>
            <Text style={styles.rightRoundScore}>{rightScore ?? '-'}</Text>
            <Pressable
                style={styles.button}
                onPress={() => router.push({
                    pathname: '/roundScoring',
                    params: {
                        roundNumber: String(roundNumber),
                        fighter1,
                        fighter2,
                        rounds,
                        savedScores,
                    },
                })}
            >
                <Text style={styles.buttonText}>Edit</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#000',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 12,
    },
    buttonText: {   
        color: '#fff',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
        borderColor: '#000',
        borderBottomWidth: 1,
        paddingBottom: 5,
    },
    leftRoundScore: {
        color: '#D32F2F',
        fontSize: 16,
        fontWeight: '700',
        marginRight: 10,
    },
    leftTotalScore: {
        color: '#D32F2F',
        fontSize: 16,
        fontWeight: '700',
        marginRight: 10,
    },
    plusMinus: {
        color: '#000',
        fontSize: 16,
        fontWeight: '700',
        marginRight: 10,
    },
    rightTotalScore: {
        color: '#1976D2',
        fontSize: 16,
        fontWeight: '700',
    },
    rightRoundScore: {
        color: '#1976D2',
        fontSize: 16,
        fontWeight: '700',
        marginLeft: 10,
    },
        rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    }
});
