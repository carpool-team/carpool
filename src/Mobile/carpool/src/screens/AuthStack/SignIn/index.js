import React, {useEffect} from 'react';
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
import * as actions from '../../../store/actions/auth';
import {useDispatch, useSelector} from 'react-redux';
import {FullScreenLoading} from '../../../components/common/loaders';

const ValidationSchema = Yup.object().shape({
  email: Yup.string().required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const SignIn = ({navigation}) => {
  const {
    values,
    handleChange,
    handleSubmit,
    touched,
    errors,
    setSubmitting,
    isSubmitting,
  } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: ValidationSchema,
    onSubmit: vals => onSubmitData(vals),
  });

  const dispatch = useDispatch();

  const onSubmitData = data => {
    setSubmitting(true);
    dispatch(actions.getToken(data));
  };

  const tokens = useSelector(state => state.authReducer.tokens);

  useEffect(() => {
    if (tokens.error) {
      alert('ERROR');
    }
  }, [tokens.error]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.title}>Carpool</Text>
      {isSubmitting ? (
        <FullScreenLoading />
      ) : (
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
      )}
    </SafeAreaView>
  );
};

export default SignIn;
