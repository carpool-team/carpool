import React, {useReducer, useEffect, useMemo} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {initialState, SearchActions, reducer} from '../reducer';
import {
  SelectGroup,
  SelectDirection,
  SelectLocation,
  SelectDate,
} from './sections';

const Search = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const isEmpty = useMemo(() => {
    return Object.keys(state)
      .map(item => state[item])
      .some(x => x === null);
  }, [state]);

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

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    width: '100%',
  },
});

export default Search;
