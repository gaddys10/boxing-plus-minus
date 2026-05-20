import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, TextInput, Image, useWindowDimensions } from 'react-native';
import { useRouter } from 'expo-router';
const tIcon = require('../../assets/images/flatwhitet.png');
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
      <View style={styles.titleBigContainer}>
        <View style={styles.titleRight}>
          <Text style={styles.title}>Boxing</Text> 
          <View style={styles.title2Container}>
            <Text style={styles.title2}>
              Score
            </Text>
          </View>
          <Text style={styles.title3}> Companion</Text>
        </View>
        <Image source={tIcon} style={styles.icon} resizeMode="contain" />
      </View>
      <Pressable 
        style={isLandscape ? styles.landscapeButton : styles.button}
        onPress={handleStartFight}
      >
        <Text style={styles.buttonText}>+ New Scorecard</Text>
      </Pressable>
      <Pressable style={styles.savedCard}>
        <View style={styles.savedCardInfoRow}>
          <View style={styles.f1NameBox}>
            <Text style={styles.fighter1}>Keyshawn {"\n"}Davis</Text>
          </View>
          <View style={styles.scoreBox}>
            <Text style={styles.f1Score}>118</Text>
          </View>
          <View style={styles.eventBox}>
            <Text style={styles.knockdowns1}>KD:&nbsp;&nbsp; 0</Text>
            <Text style={styles.deductions1}>PEN: 2</Text>
          </View>
        </View>
        
        {/* <View style={styles.nameDivider}> </View> */}
        <View style={styles.savedCardInfoRow}>
          <View style={styles.f2NameBox}>
            <Text style={styles.fighter2}>Nahir {"\n"}Albright</Text>
          </View>
          <Text style={styles.f2Score}>108</Text>
          <View >
            <Text style={styles.knockdowns2}>KD:&nbsp;&nbsp; 0</Text>
            <Text style={styles.deductions2}>PEN: 0</Text>
          </View>
        </View>
        <View><Text>12 RD</Text></View>
        
      </Pressable>

      <Pressable 
        style={isLandscape ? styles.landscapeButton : styles.button}
        onPress={handleStartFight}
      >
        <Text style={styles.buttonText}>+ New Scorecard</Text>
      </Pressable>
      
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 50,
    bottom: 50,
    position: 'absolute'
  },
  eventBox: {
    // backgroundColor: 'green',
    height: '100%',
    width: '17%',
    borderBottomWidth: 1,
    borderBottomColor: '#4a4a4a'
  },
  scoreBox: {
    // backgroundColor: 'green',
    height: '100%',
    alignContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    borderBottomColor: '#4a4a4a',
    borderBottomWidth: 1
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
  container: {
    flex: 1,
    backgroundColor: '#307Fb6',
    alignItems: 'center',
    justifyContent: 'center',
    // padding: 24,
  },
  landscapeContainer: {
    flex: 1,
    backgroundColor: '#307Fb6',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    paddingTop: 25
  },
  knockdowns1: {
    color: "#D32f2f",
    position: 'absolute',
    left: 3,
    top: 6
  },
  deductions1: {
    color: '#d32f2f',
    position: 'absolute',
    left: 3,
    top: 25
  },
  knockdowns2: {
    color: "#322fd3",
    position: 'absolute',
    left: 0,
    top: -18
  },
  deductions2: {
    color: '#322fd3',
        position: 'absolute',
    left: 0,
    top: -2

  },
  nameDivider: {
    width: '100%',
    height: 2,
    backgroundColor: 'black'
  },
  icon: {
    width: 120,
    height: 120,
    marginBottom: 36,
    marginLeft: -5
  },
  savedCard: {
    width: '90%',
    height: '12%',
    backgroundColor: 'white',
    // paddingHorizontal: 10,
    top: 100,
    borderRadius: 15,
    boxShadow: '2',
    shadowColor: '#11334b',
    shadowOffset: {width: 3, height: 3},
    shadowOpacity: 0.7,
    shadowRadius: 3,
    marginBottom: 20
  },
  savedCardInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    width: '80%',
    height: '50%',
  },
  f1NameBox: {
    height: '100.5%',
    backgroundColor: '#D32F2F',
    width: '40%',
    paddingTop: '1.5%',
    paddingLeft: '4%',
    borderTopLeftRadius: 15,
  },
  f2NameBox: {
    height: '100.5%',
    backgroundColor: '#322fd3',
    width: '40%',
    paddingTop: '1.5%',
    paddingLeft: '4%',
    borderBottomLeftRadius: 15,
  },
  f1Score: {
    color: "#D32f2f",
    fontSize: 24,
    marginHorizontal: 20
  },
  f2Score: {
    color: "#322fd3",
    fontSize: 24,
    marginHorizontal: 20
  },
  fighter1: {
    color: '#fff',
    fontSize: 16,
  },
  fighter2: {
    color: '#fff',
    fontSize: 16,

  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 3,
    marginLeft: 7
  },
  title2: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '700',
  },
  title2Container: {
    backgroundColor: '#D32F2F',
    width: 155,
    paddingHorizontal: 0,
    paddingVertical: 0,
    shadowColor: 'transparent',
    shadowOpacity: 0,
    shadowRadius: 0,
    shadowOffset: { width: 0, height: 0 },
    elevation: 0,
    opacity: 1,
    borderWidth: 0,
    paddingLeft: 5,
    marginLeft: 2,
  },
  title3: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 50,
  },
  titleBigContainer: {
    position: 'absolute',
    top: 100,
    left: 12,
    right: 0,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  titleRight: {
    marginLeft: 0,
  },
  
  landscapeTitle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 50,
    marginTop: -75
  },
});