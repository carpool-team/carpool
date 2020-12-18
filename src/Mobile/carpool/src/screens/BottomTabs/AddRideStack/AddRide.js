import React, {useReducer, useEffect} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {reducer, initialState, AddRideActions} from './reducer';
import {
  SelectGroup,
  SelectDirection,
  SelectLocation,
  PickTime,
  SetSeats,
  RideSummary,
  RideCreated,
  RideError,
} from './sections';
import {styles} from './index.styles';
import {GoBack} from '../../../components/navigation';
import {useIsFocused} from '@react-navigation/native';

const AddRide = ({navigation}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (state.group) {
      const onPress = () => {
        if (state.seats !== null) {
          dispatch({type: AddRideActions.SET_SEATS, payload: null});
          return;
        }
        if (state.regular !== null) {
          dispatch({type: AddRideActions.SET_REGULAR, payload: null});
          return;
        }
        if (state.location) {
          dispatch({type: AddRideActions.SET_LOCATION, payload: null});
          return;
        }
        if (state.swap !== null) {
          dispatch({type: AddRideActions.SET_SWAP, payload: null});
          return;
        }
        if (state.group) {
          dispatch({type: AddRideActions.SET_GROUP, payload: null});
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
    !isFocused && dispatch({type: AddRideActions.CLEAN_STATE});
  }, [isFocused]);

  const renderSection = () => {
    if (!state.group) {
      return <SelectGroup dispatch={dispatch} />;
    }
    if (state.swap === null) {
      return <SelectDirection dispatch={dispatch} state={state} />;
    }
    if (!state.location) {
      return <SelectLocation dispatch={dispatch} state={state} />;
    }
    if (state.regular === null) {
      return <PickTime dispatch={dispatch} />;
    }
    if (!state.seats) {
      return <SetSeats dispatch={dispatch} />;
    }

    if (state.success) {
      return <RideCreated onPress={() => navigation.navigate('RidesStack')} />;
    }

    if (state.error) {
      return (
        <RideError
          onPress={() => dispatch({type: AddRideActions.CLEAN_STATE})}
        />
      );
    }

    return <RideSummary state={state} rdispatch={dispatch} />;
  };

  return <SafeAreaView style={styles.safeArea}>{renderSection()}</SafeAreaView>;
};

export default AddRide;
