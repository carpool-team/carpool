import React from 'react';
import {Text, View} from 'react-native';
import StandardInput from '../../../../../components/common/inputs/StandardInput';
import {colors} from '../../../../../styles';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {StandardButton} from '../../../../../components/common/buttons';
import {styles} from '../index.styles';

const ValidationSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string()
    .email('Not a valid email')
    .required('Email is required'),
});

const NameSection = ({onSubmitName, initialValues, apiError}) => {
  const {values, handleChange, handleSubmit, touched, errors} = useFormik({
    initialValues,
    validationSchema: ValidationSchema,
    onSubmit: vals => onSubmitName(vals),
  });

  return (
    <View style={styles.container}>
      {!!apiError && <Text style={styles.apiError}>{apiError}</Text>}
      <StandardInput
        returnKeyType="next"
        wrapperStyle={styles.inputWrapper}
        placeholder="First name"
        value={values.firstName}
        onChangeText={handleChange('firstName')}
        autoFocus
        error={touched.firstName && errors.firstName ? errors.firstName : null}
      />
      <StandardInput
        returnKeyType="next"
        wrapperStyle={styles.inputWrapper}
        placeholder="Last name"
        value={values.lastName}
        onChangeText={handleChange('lastName')}
        error={touched.lastName && errors.lastName ? errors.lastName : null}
      />
      <StandardInput
        returnKeyType="done"
        wrapperStyle={styles.inputWrapper}
        placeholder="Email address"
        keyboardType="email-address"
        autoCapitalize="none"
        value={values.email}
        onChangeText={handleChange('email')}
        error={touched.email && errors.email ? errors.email : null}
        onSubmitEditing={handleSubmit}
      />
      <StandardButton
        color={colors.blue}
        onPress={handleSubmit}
        title="Next"
        style={styles.button}
      />
    </View>
  );
};

export default NameSection;
