import React from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import {styles} from './index.styles';

const SafeScroll = ({minHeight, children, style}) => (
  <SafeAreaView style={styles.safeArea}>
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={{
        flex: 1,
        minHeight,
        ...style,
      }}>
      {children}
    </ScrollView>
  </SafeAreaView>
);

export default SafeScroll;
