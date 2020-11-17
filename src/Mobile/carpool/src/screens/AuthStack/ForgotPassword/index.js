import React from 'react';
import {Text, SafeAreaView, StyleSheet, View} from 'react-native';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import StandardInput from '../../../components/common/inputs/StandardInput';
import {colors, sheet} from '../../../styles';
import {StandardButton} from '../../../components/common/buttons';

const ValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Not a valid email address')
    .required('Email is required'),
});

const ForgotPassword = () => {
  const {values, handleChange, handleSubmit, touched, errors} = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: ValidationSchema,
    onSubmit: vals => console.log(vals),
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

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    width: '100%',
    backgroundColor: colors.background,
  },
  title: {
    ...sheet.textSemiBold,
    fontSize: 45,
    color: colors.blue,
    alignSelf: 'center',
    marginVertical: 25,
  },
  container: {
    alignItems: 'center',
    marginVertical: 20,
    paddingHorizontal: 32,
    flex: 1,
  },
  inputWrapper: {
    width: '100%',
    marginBottom: 20,
  },
  message: {
    ...sheet.textRegular,
    width: '100%',
    marginBottom: 20,
    color: colors.grayDark,
    fontSize: 14,
  },
  button: {
    marginTop: 20,
  },
});

export default ForgotPassword;
