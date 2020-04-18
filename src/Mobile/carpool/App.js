import React from 'react';
import {SafeAreaView, Text} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';

const App = () => {
  return (
    <NavigationContainer>
      <SafeAreaView
        style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
        <Text style={{fontSize: 30, fontWeight: '500'}}>Carpool</Text>
      </SafeAreaView>
    </NavigationContainer>
  );
};

export default App;
