import React, {useReducer, useEffect, useState} from 'react';
import {Text, SafeAreaView} from 'react-native';
import {NameSection, PasswordSection} from './sections';
import {reducer, initialState, SignUpActions} from './reducer';
import {styles} from './index.styles';

const SignUp = props => {
  const [apiError, setApiError] = useState(null);

  const [store, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (store.first_name && store.last_name && store.password && store.email) {
      console.log('SUBMIT', store);
      // if(error) {
      //   setApiError(error);
      //   dispatch({type: SignUpActions.SET_PASSWORD, payload: ''});
      //   dispatch({type: SignUpActions.SET_EMAIL, payload: ''});
      // }
    }
  }, [store]);

  const onSubmitName = ({first_name, last_name, email}) => {
    dispatch({type: SignUpActions.SET_FIRST_NAME, payload: first_name});
    dispatch({type: SignUpActions.SET_LAST_NAME, payload: last_name});
    dispatch({type: SignUpActions.SET_EMAIL, payload: email});
  };

  const onSubmitPassword = ({password}) =>
    dispatch({type: SignUpActions.SET_PASSWORD, payload: password});

  const renderSection = () => {
    const {first_name, last_name, email, password} = store;
    if (!store.first_name || !store.last_name || !store.email) {
      return (
        <NameSection
          onSubmitName={onSubmitName}
          initialValues={{
            first_name,
            last_name,
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
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.title}>Carpool</Text>
      {renderSection()}
    </SafeAreaView>
  );
};

export default SignUp;