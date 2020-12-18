import React, {useReducer, useEffect, useMemo} from 'react';
import {SafeAreaView} from 'react-native';
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

const Search = ({navigation}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const isFocused = useIsFocused();

  const isEmpty = useMemo(() => {
    return Object.keys(state)
      .map(item => state[item])
      .some(x => x === null);
  }, [state]);

  useEffect(() => {
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
  }, [state]);

  useEffect(() => {
    !isFocused && dispatch({type: SearchActions.CLEAN_STATE});
  }, [isFocused]);

  useEffect(() => {
    !isEmpty && console.log('SUBMIT');
  }, [isEmpty]);

  const onSubmitGroup = group =>
    dispatch({type: SearchActions.SET_GROUP, payload: group});

  const onSubmitDirection = value =>
    dispatch({type: SearchActions.SET_SWAP, payload: value});

  const onSubmitLocation = location =>
    dispatch({type: SearchActions.SET_LOCATION, payload: location});

  const onSubmitDate = date =>
    dispatch({type: SearchActions.SET_DATE, payload: date});

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
    return <SelectDate onSubmit={onSubmitDate} />;
  };

  return <SafeAreaView style={styles.safeArea}>{renderSection()}</SafeAreaView>;
};

export default Search;
