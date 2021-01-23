import React, {useReducer, useEffect, useState} from 'react';
import {Text} from 'react-native';
import {NameSection, PasswordSection, SuccessSection} from './sections';
import {reducer, initialState, SignUpActions} from './reducer';
import {styles} from './index.styles';
import * as actions from '../../../store/actions/auth';
import {useDispatch} from 'react-redux';
import {FullScreenLoading} from '../../../components/common/loaders';
import {SafeScroll} from '../../../components/common/wrappers';
import {GoBack} from '../../../components/navigation';

const SignUp = ({navigation}) => {
  const [apiError, setApiError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const [store, dispatch] = useReducer(reducer, initialState);

  const rdispatch = useDispatch();

  useEffect(() => {
    const {firstName, lastName, email} = store;
    const onPress = () => {
      if (!firstName || !lastName || !email) {
        navigation.goBack();
      } else {
        dispatch({type: SignUpActions.SET_EMAIL, payload: ''});
        dispatch({type: SignUpActions.SET_PASSWORD, payload: ''});
      }
    };

    navigation.setOptions({
      headerLeft: () => <GoBack onPress={onPress} />,
    });
  }, [store]);

  useEffect(() => {
    if (store.firstName && store.lastName && store.password && store.email) {
      setLoading(true);
      rdispatch(actions.registerUser(store))
        .then(() => {
          setSuccess(true);
        })
        .catch(err => {
          if (err.response) {
            if (err.response.data) {
              setApiError(err.response.data.responseException[0].description);
            } else {
              setApiError('An error ocurred, try again');
            }
          }
          dispatch({type: SignUpActions.RESET});
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [store]);

  const onSubmitName = ({firstName, lastName, email}) => {
    dispatch({type: SignUpActions.SET_FIRST_NAME, payload: firstName});
    dispatch({type: SignUpActions.SET_LAST_NAME, payload: lastName});
    dispatch({type: SignUpActions.SET_EMAIL, payload: email});
  };

  const onSubmitPassword = ({password}) =>
    dispatch({type: SignUpActions.SET_PASSWORD, payload: password});

  const renderSection = () => {
    const {firstName, lastName, email, password} = store;

    if (loading) {
      return <FullScreenLoading />;
    }

    if (success) {
      return <SuccessSection />;
    }

    if (!firstName || !lastName || !email) {
      return (
        <NameSection
          onSubmitName={onSubmitName}
          initialValues={{
            firstName,
            lastName,
            email,
          }}
          apiError={apiError}
        />
      );
    }
    return (
      <PasswordSection
        onSubmtiPassword={onSubmitPassword}
        initialValues={{password}}
      />
    );
  };

  return (
    <SafeScroll minHeight={600}>
      <Text style={styles.title}>Carpool</Text>
      {renderSection()}
    </SafeScroll>
  );
};

export default SignUp;
