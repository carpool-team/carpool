import React, {useReducer, useEffect, useState} from 'react';
import {SafeAreaView, Alert} from 'react-native';
import {initialState, SearchActions, reducer} from '../reducer';
import {GoBack} from '../../../../components/navigation';
import {
  SelectGroup,
  SelectDirection,
  SelectLocation,
  SelectDate,
} from './sections';
import {useIsFocused} from '@react-navigation/native';
import {styles} from './index.styles';
import {useDispatch} from 'react-redux';
import * as actions from '../../../../store/actions';
import {FullScreenLoading} from '../../../../components/common/loaders';

const Search = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);
  const isFocused = useIsFocused();

  const rdispatch = useDispatch();

  useEffect(() => {
    console.log(state);
    if (state.group) {
      const onPress = () => {
        if (state.location) {
          dispatch({type: SearchActions.SET_LOCATION, payload: null});
          return;
        }
        if (state.swap !== null) {
          dispatch({type: SearchActions.SET_SWAP, payload: null});
          return;
        }
        if (state.group) {
          dispatch({type: SearchActions.SET_GROUP, payload: null});
          return;
        }
      };

      navigation.setOptions({
        headerLeft: () => <GoBack onPress={onPress} />,
      });
    } else {
      navigation.setOptions({
        headerLeft: undefined,
      });
    }

    if (state.group && state.location && state.date && state.swap !== null) {
      onSubmit();
    }
  }, [state]);

  useEffect(() => {
    !isFocused && dispatch({type: SearchActions.CLEAN_STATE});
  }, [isFocused]);

  const onSubmitGroup = group =>
    dispatch({type: SearchActions.SET_GROUP, payload: group});

  const onSubmitDirection = value =>
    dispatch({type: SearchActions.SET_SWAP, payload: value});

  const onSubmitLocation = location =>
    dispatch({type: SearchActions.SET_LOCATION, payload: location});

  const onSubmitDate = date =>
    dispatch({type: SearchActions.SET_DATE, payload: date});

  const onSubmit = () => {
    setLoading(true);
    rdispatch(actions.findRides(state))
      .then(res => {
        navigation.navigate('SearchResults', {results: res});
      })
      .catch(err => {
        Alert.alert(
          'Error',
          'An error ocurred when trying to fetch rides from the server. Please try again.',
          [
            {
              style: 'default',
              text: 'Try again',
              onPress: () => dispatch({type: SearchActions.CLEAN_STATE}),
            },
          ],
        );
      });
  };

  const renderSection = () => {
    if (!state.group) {
      return <SelectGroup onSubmit={onSubmitGroup} />;
    }
    if (state.swap === null) {
      return <SelectDirection onSubmit={onSubmitDirection} state={state} />;
    }
    if (!state.location) {
      return <SelectLocation onSubmit={onSubmitLocation} state={state} />;
    }
    if (loading) {
      return <FullScreenLoading />;
    }
    return <SelectDate onSubmit={onSubmitDate} />;
  };

  return <SafeAreaView style={styles.safeArea}>{renderSection()}</SafeAreaView>;
};

export default Search;
