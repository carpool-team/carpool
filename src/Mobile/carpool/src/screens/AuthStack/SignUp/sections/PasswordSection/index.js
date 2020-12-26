import React from 'react';
import {View, Text} from 'react-native';
import StandardInput from '../../../../../components/common/inputs/StandardInput';
import {colors} from '../../../../../styles';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {StandardButton} from '../../../../../components/common/buttons';
import {styles} from '../index.styles';

const ValidationSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, 'Password is too short (at least 8 characters)')
    .matches(
      /[0-9!?@#$%^&\\*"'+,./:;<>=_`|~\-\(\){}[\]]+/,
      'The password must contain at least one number or special character',
    )
    .matches(
      /[A-Z]+/,
      'The password must contain at least one uppercase letter',
    )
    .required('Password is required'),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords do not match')
    .required('Password confirmation is required'),
});

const PasswordSection = ({onSubmtiPassword, initialValues}) => {
  const {values, handleChange, handleSubmit, touched, errors} = useFormik({
    initialValues,
    validationSchema: ValidationSchema,
    onSubmit: vals => onSubmtiPassword(vals),
  });

  return (
    <View style={styles.container}>
      <StandardInput
        autoFocus
        returnKeyType="next"
        secureTextEntry
        wrapperStyle={styles.inputWrapper}
        placeholder="Password"
        autoCapitalize="none"
        value={values.password}
        onChangeText={handleChange('password')}
        error={touched.password && errors.password ? errors.password : null}
      />
      <Text style={styles.info}>
        Password must be at least 8 characters long and contain at least one
        number, special character and an uppercase letter
      </Text>
      <StandardInput
        secureTextEntry
        returnKeyType="done"
        wrapperStyle={styles.inputWrapper}
        placeholder="Confirm password"
        autoCapitalize="none"
        value={values.password_confirmation}
        onChangeText={handleChange('password_confirmation')}
        error={
          touched.password_confirmation && errors.password_confirmation
            ? errors.password_confirmation
            : null
        }
        onSubmitEditing={handleSubmit}
      />
      <StandardButton
        color={colors.blue}
        onPress={handleSubmit}
        title="Sign up"
        style={styles.button}
      />
    </View>
  );
};

export default PasswordSection;
