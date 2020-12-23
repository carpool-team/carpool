import React, {useEffect, useMemo} from 'react';
import {View, Alert} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import * as actions from '../../../../store/actions';
import {FullScreenLoading} from '../../../../components/common/loaders';
import StandardInput from '../../../../components/common/inputs/StandardInput';
import {GoBack} from '../../../../components/navigation';
import {StandardButton} from '../../../../components/common/buttons';
import {SafeScroll} from '../../../../components/common/wrappers';
import {styles} from './index.styles';
import {colors} from '../../../../styles';

const isNotEmptyObject = obj => !!Object.keys(obj).length;

const ValidationSchema = Yup.object().shape({
  firstName: Yup.string().notRequired(),
  lastName: Yup.string().notRequired(),
  email: Yup.string().email('Not a valid email'),
});

const EditUser = ({navigation}) => {
  const user = useSelector(state => state.accountReducer.user);

  const dispatch = useDispatch();

  useEffect(() => {
    !user.data && dispatch(actions.getUser());

    navigation.setOptions({
      headerLeft: () => <GoBack onPress={navigation.goBack} />,
    });
  }, []);

  useEffect(() => {
    if (user.data && !user.loading) {
      setValues({
        firstName: user.data.firstName ?? '',
        lastName: user.data.lastName ?? '',
        email: user.data.email ?? '',
      });
    }
  }, [user]);

  const {
    values,
    touched,
    errors,
    handleChange,
    handleSubmit,
    initialValues,
    setValues,
    setSubmitting,
    isSubmitting,
  } = useFormik({
    initialValues: {
      firstName: user.data.firstName ?? '',
      lastName: user.data.lastName ?? '',
      email: user.data.email ?? '',
    },
    enableReinitialize: true,
    validationSchema: ValidationSchema,
    onSubmit: values => onSubmit(values),
  });

  const onSubmit = vals => {
    dispatch(actions.editUser(vals))
      .then(() => {
        Alert.alert('Success!', 'Your account was successfully updated.', [
          {
            text: 'Ok',
            style: 'default',
          },
        ]);
      })
      .catch(err => {
        Alert.alert(
          'Error',
          'An error ocurred when trying to update your profile. Please try again',
          [
            {
              text: 'Ok',
              style: 'default',
            },
          ],
        );
      })
      .finally(() => setSubmitting(false));
  };

  const diff = useMemo(() => {
    return Object.keys(values).reduce((diff, key) => {
      if (initialValues[key] === values[key]) return diff;
      return {
        ...diff,
        [key]: values[key],
      };
    }, {});
  }, [values]);

  return (
    <SafeScroll minHeight={500}>
      {user.loading || !user.data ? (
        <FullScreenLoading />
      ) : (
        <View style={styles.container}>
          <StandardInput
            returnKeyType="done"
            autoCapitalize="words"
            wrapperStyle={styles.inputWrapper}
            placeholder="First name"
            value={values.firstName}
            onChangeText={handleChange('firstName')}
            error={
              touched.firstName && errors.firstName ? errors.firstName : null
            }
          />
          <StandardInput
            returnKeyType="done"
            autoCapitalize="words"
            wrapperStyle={styles.inputWrapper}
            placeholder="Last name"
            value={values.lastName}
            onChangeText={handleChange('lastName')}
            error={touched.lastName && errors.lastName ? errors.lastName : null}
          />
          <StandardInput
            returnKeyType="done"
            autoCapitalize="none"
            wrapperStyle={styles.emailInputWrapper}
            placeholder="Email"
            value={values.email}
            onChangeText={handleChange('email')}
            error={touched.email && errors.email ? errors.email : null}
            editable={false}
          />
          <StandardButton
            title="Submit"
            color={colors.blue}
            onPress={handleSubmit}
            disabled={!isNotEmptyObject(diff)}
            loading={isSubmitting}
          />
        </View>
      )}
    </SafeScroll>
  );
};

export default EditUser;
