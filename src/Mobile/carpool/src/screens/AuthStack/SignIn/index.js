import React from 'react';
import {Text, ScrollView, StyleSheet, SafeAreaView} from 'react-native';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {colors, sheet} from '../../../styles';
import StandardInput from '../../../components/common/inputs/StandardInput';
import {StandardButton} from '../../../components/common/buttons';

const ValidationSchema = Yup.object().shape({
  email: Yup.string().required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const SignIn = () => {
  const {values, handleChange, handleSubmit, touched, errors} = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: ValidationSchema,
    onSubmit: vals => console.log(vals),
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.title}>Carpool</Text>
      <ScrollView contentContainerStyle={styles.scrollView}>
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
        <StandardInput
          returnKeyType="done"
          secureTextEntry
          wrapperStyle={styles.inputWrapper}
          placeholder="Password"
          autoCapitalize="none"
          value={values.password}
          onChangeText={handleChange('password')}
          error={touched.password && errors.password ? errors.password : null}
          onSubmitEditing={handleSubmit}
        />
        <StandardButton
          color={colors.blue}
          onPress={handleSubmit}
          title="Sign in"
          style={styles.button}
        />
      </ScrollView>
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
    fontSize: 54,
    color: colors.blue,
    alignSelf: 'center',
    marginVertical: 40,
  },
  scrollView: {
    alignItems: 'center',
    marginVertical: 20,
    paddingHorizontal: 32,
  },
  inputWrapper: {
    width: '100%',
    marginBottom: 40,
  },
  button: {
    marginTop: 20,
  },
});

export default SignIn;
