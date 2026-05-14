import React, {useState} from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams, router } from 'expo-router';

export default function RoundRow({ roundNumber }: { roundNumber: number }) {

    return (
        <View style={styles.row}>
            <Text>RD {roundNumber}</Text>
            <Text style={styles.leftRoundScore}>-</Text>
            <Text style={styles.leftTotalScore}>-</Text>
            <Text style={styles.plusMinus}>-</Text>
            <Text style={styles.rightTotalScore}>-</Text>
            <Text style={styles.rightRoundScore}>-</Text>
            <Pressable
                style={styles.button}
                onPress={() => router.push({
                    pathname: '/roundScoring',
                    params: { roundNumber }
                })}>
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
