import React from 'react';
import {
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  View,
} from 'react-native';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {colors} from '../../../styles';
import StandardInput from '../../../components/common/inputs/StandardInput';
import {StandardButton} from '../../../components/common/buttons';
import {styles} from './index.styles';

const ValidationSchema = Yup.object().shape({
  email: Yup.string().required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const SignIn = ({navigation}) => {
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
          wrapperStyle={styles.passwordInputWrapper}
          placeholder="Password"
          autoCapitalize="none"
          value={values.password}
          onChangeText={handleChange('password')}
          error={touched.password && errors.password ? errors.password : null}
          onSubmitEditing={handleSubmit}
        />
        <View style={styles.forgotWrapper}>
          <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.forgot}>Forgot your password?</Text>
          </TouchableOpacity>
        </View>
        <StandardButton
          color={colors.blue}
          onPress={handleSubmit}
          title="Sign in"
          style={styles.button}
        />
        <Text style={styles.dontHave}>Don't have an account yet?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.signUp}>Sign up</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
