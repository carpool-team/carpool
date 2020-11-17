import React from 'react';
import {Text, SafeAreaView, View} from 'react-native';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import StandardInput from '../../../components/common/inputs/StandardInput';
import {colors} from '../../../styles';
import {StandardButton} from '../../../components/common/buttons';
import {styles} from './index.styles';

const ValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Not a valid email address')
    .required('Email is required'),
});

const ForgotPassword = ({navigation}) => {
  const {values, handleChange, handleSubmit, touched, errors} = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: ValidationSchema,
    onSubmit: vals => {
      console.log(vals);
      navigation.navigate('SignIn');
    },
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.title}>Carpool</Text>
      <View style={styles.container}>
        <StandardInput
          autoFocus
          returnKeyType="next"
          wrapperStyle={styles.inputWrapper}
          placeholder="Email address"
          keyboardType="email-address"
          autoCapitalize="none"
          value={values.email}
          onChangeText={handleChange('email')}
          error={touched.email && errors.email ? errors.email : null}
        />
        <Text style={styles.message}>
          A message will be sent to that address containing a link to reset your
          password
        </Text>
        <StandardButton
          color={colors.orange}
          onPress={handleSubmit}
          title="Reset"
          style={styles.button}
        />
      </View>
    </SafeAreaView>
  );
};

export default ForgotPassword;
