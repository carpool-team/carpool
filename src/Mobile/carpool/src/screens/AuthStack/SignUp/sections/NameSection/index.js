import React from 'react';
import {Text, View} from 'react-native';
import StandardInput from '../../../../../components/common/inputs/StandardInput';
import {colors} from '../../../../../styles';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {StandardButton} from '../../../../../components/common/buttons';
import {styles} from '../index.styles';

const ValidationSchema = Yup.object().shape({
  first_name: Yup.string().required('First name is required'),
  last_name: Yup.string().required('Last name is required'),
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
        value={values.first_name}
        onChangeText={handleChange('first_name')}
        autoFocus
        error={
          touched.first_name && errors.first_name ? errors.first_name : null
        }
      />
      <StandardInput
        returnKeyType="next"
        wrapperStyle={styles.inputWrapper}
        placeholder="Last name"
        value={values.last_name}
        onChangeText={handleChange('last_name')}
        error={touched.last_name && errors.last_name ? errors.last_name : null}
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
