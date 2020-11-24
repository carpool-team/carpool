import React from 'react';
import {ScrollView} from 'react-native';
import StandardInput from '../../../../../components/common/inputs/StandardInput';
import {colors} from '../../../../../styles';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {StandardButton} from '../../../../../components/common/buttons';
import {styles} from '../index.styles';

const ValidationSchema = Yup.object().shape({
  // TODO: Password strength validation
  password: Yup.string().required('Password is required'),
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
    <ScrollView contentContainerStyle={styles.scrollView}>
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
    </ScrollView>
  );
};

export default PasswordSection;
