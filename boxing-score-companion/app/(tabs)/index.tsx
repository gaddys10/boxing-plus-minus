import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, TextInput } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();
  const [fighter1Name, setFighter1Name] = useState('');
  const [fighter2Name, setFighter2Name] = useState('');
  const [selectedRounds, setSelectedRounds] = useState(3);
  const rounds = [3, 4, 5, 6, 8, 10, 12];

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
    <View style={styles.container}>
      <Text style={styles.title}>Boxing Score Companion</Text>
      <Text style={styles.nameLabel}>Fighter 1 name:</Text>
      <TextInput 
        placeholder="Enter fighter 1 name" 
        value={fighter1Name}
        onChangeText={setFighter1Name}
        style={{ backgroundColor: '#fff', width: '100%', padding: 12, borderRadius: 8, marginBottom: 36 }} 
      />
      <Text style={styles.nameLabel}>Fighter 2 name:</Text>
      <TextInput 
        placeholder="Enter fighter 2 name" 
        value={fighter2Name}
        onChangeText={setFighter2Name}
        style={{ backgroundColor: '#fff', width: '100%', padding: 12, borderRadius: 8, marginBottom: 36 }} 
      />
      <Text style={styles.nameLabel}>Number of rounds:</Text>
      <View style={styles.roundsContainer}>
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
        style={styles.button}
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
  title: {
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
  roundsContainer: {
    flexDirection: 'row',
    marginBottom: 24,
    alignSelf: 'flex-start',
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
  buttonText: {
    color: '#111',
    fontSize: 18,
    fontWeight: '700',
  },
});