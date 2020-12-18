import React, {useReducer} from 'react';
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

const AddRide = ({navigation}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

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

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    width: '100%',
  },
});

export default AddRide;
