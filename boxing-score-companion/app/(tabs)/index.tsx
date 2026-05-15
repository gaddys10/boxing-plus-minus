import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, TextInput, useWindowDimensions } from 'react-native';
import { useRouter } from 'expo-router';
export default function HomeScreen() {
  const router = useRouter();
  const [fighter1Name, setFighter1Name] = useState('');
  const [fighter2Name, setFighter2Name] = useState('');
  const [selectedRounds, setSelectedRounds] = useState(3);
  const rounds = [3, 4, 5, 6, 8, 10, 12];
  const { width, height } = useWindowDimensions();
  let isLandscape = width > height;

  const handleStartFight = () => {
    router.push({
      pathname: '/matchInfo',
      params: {
        fighter1: fighter1Name || 'Fighter 1',
        fighter2: fighter2Name || 'Fighter 2',
        rounds: selectedRounds,
      },
    });
  };

  return (
    <View style={isLandscape ? styles.landscapeContainer : styles.container}>
      <Text style={isLandscape ? styles.landscapeTitle : styles.title}>Boxing Score Companion</Text>
      <Text style={isLandscape ? styles.landscapeNameLabel : styles.nameLabel}>Fighter 1 name:</Text>
      <TextInput 
        placeholder="Enter fighter 1 name" 
        value={fighter1Name}
        onChangeText={setFighter1Name}
        style={isLandscape ? styles.landscapeFighter1Input : styles.fighter1input} 
      />
      <Text style={isLandscape ? styles.landscapeNameLabel : styles.nameLabel}>Fighter 2 name:</Text>
      <TextInput 
        placeholder="Enter fighter 2 name" 
        value={fighter2Name}
        onChangeText={setFighter2Name}
        style={isLandscape ? styles.landscapeFighter2Input : styles.fighter2Input} 
      />
      <Text style={isLandscape ? styles.landscapeNameLabel : styles.nameLabel}>Number of rounds:</Text>
      <View style={isLandscape ? styles.landscapeRoundsContainer : styles.roundsContainer}>
        {rounds.map((round) => (
          <Pressable
            key={round}
            style={[
              styles.roundButton,
              selectedRounds === round && styles.roundButtonSelected,
            ]}
            onPress={() => setSelectedRounds(round)}
          >
            <Text style={[
              styles.roundButtonText,
              selectedRounds === round && styles.roundButtonTextSelected,
            ]}>
              {round}
            </Text>
          </Pressable>
        ))}
      </View>
      <Pressable 
        style={isLandscape ? styles.landscapeButton : styles.button}
        onPress={handleStartFight}
      >
        <Text style={styles.buttonText}>Start Fight</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#307Fb6',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  landscapeContainer: {
    flex: 1,
    backgroundColor: '#307Fb6',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    paddingTop: 25
  },
  fighter1input: {
    backgroundColor: '#fff', 
    width: '100%', 
    padding: 12, 
    borderRadius: 8, 
    marginBottom: 36
  },
  landscapeFighter1Input: {
    backgroundColor: '#fff', 
    width: '50%', 
    padding: 12, 
    borderRadius: 8, 
    marginBottom: 24
  },
  fighter2Input: {
    backgroundColor: '#fff', 
    width: '100%', 
    padding: 12, 
    borderRadius: 8, 
    marginBottom: 36
  },
  landscapeFighter2Input: {
    backgroundColor: '#fff', 
    width: '50%', 
    padding: 12, 
    borderRadius: 8, 
    marginBottom: 24
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 50,
    marginTop: -75
  },
  landscapeTitle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 50,
    marginTop: -75
  },
  nameLabel: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 12,
    marginLeft: 10,
    alignSelf: 'flex-start'
  },
  landscapeNameLabel: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 12,
    marginLeft: '25%',
    alignSelf: 'flex-start'
  },
  roundsContainer: {
    flexDirection: 'row',
    marginBottom: 24,
    alignSelf: 'flex-start',
  },
  landscapeRoundsContainer: {
    flexDirection: 'row',
    marginBottom: 0,
    //center rounds container in landscape
    justifyContent: 'center',
    // alignSelf: 'flex-start',
  },
  roundButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#fff',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 8,
    marginRight: 9.5,
  },
  roundButtonSelected: {
    backgroundColor: '#fff',
  },
  roundButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  roundButtonTextSelected: {
    color: '#307Fb6',
  },
  button: {
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 50
  },
  landscapeButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 25
  },
  buttonText: {
    color: '#111',
    fontSize: 18,
    fontWeight: '700',
  },
});