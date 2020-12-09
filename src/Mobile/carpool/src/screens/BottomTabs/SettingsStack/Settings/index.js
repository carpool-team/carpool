import React from 'react';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';

const Settings = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Text>TODO: Settings</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    width: '100%',
  },
});

export default Settings;
