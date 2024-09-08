import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import * as Font from 'expo-font'; // If using Expo

export const WelcomeScreen: React.FC = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'PoppySpoor': require('../../assets/PoppySpoorPersonalUse-L3pmy.otf'), 
      });
      setFontsLoaded(true);
    };
    
    loadFonts();

    const zoomInAndOut = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 1.2,
            duration: 800,
            useNativeDriver: true,
            easing: Easing.ease,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
            easing: Easing.ease,
          }),
        ]),
      ).start();
    };

    if (fontsLoaded) {
      zoomInAndOut();
    }
  }, [fontsLoaded, scaleAnim]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.appName, { transform: [{ scale: scaleAnim }] }]}>
        ExpenseMate
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appName: {
    fontSize: 40,
    fontWeight: '300', 
    color: '#3498db',
    fontFamily: 'PoppySpoor',  
    fontStyle: 'normal',
  },
});
