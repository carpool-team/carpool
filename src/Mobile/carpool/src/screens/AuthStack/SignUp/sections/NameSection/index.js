import React from 'react';
import {ScrollView} from 'react-native';
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

const NameSection = ({onSubmitName}) => {
  const {values, handleChange, handleSubmit, touched, errors} = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      email: '',
    },
    validationSchema: ValidationSchema,
    onSubmit: vals => onSubmitName(vals),
  });

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
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
        autoCapitalize={false}
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
    </ScrollView>
  );
};

export default NameSection;
