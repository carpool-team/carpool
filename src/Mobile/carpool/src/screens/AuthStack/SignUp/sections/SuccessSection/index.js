import React from 'react';
import {View, Text} from 'react-native';
import {colors} from '../../../../../styles';
import {StandardButton} from '../../../../../components/common/buttons';
import {useNavigation} from '@react-navigation/native';
import {styles} from './index.styles';

const SuccessSection = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.success}>Success!</Text>
      <Text style={styles.message}>
        You can now sign in using your email and password.
      </Text>
      <StandardButton
        onPress={() => navigation.navigate('SignIn')}
        title="Sign in"
        color={colors.green}
      />
    </View>
  );
};

export default SuccessSection;
