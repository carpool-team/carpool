import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import * as actions from '../../../../store/actions';
import {useActiveAccount} from '../../../../hooks';
import {DriversHome, PassengersHome} from '../../../../components/Home';

const Home = ({navigation}) => {
  const {activeAccount} = useActiveAccount();
  const isPassenger = activeAccount === 'passenger';

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.getDriversRides());
    dispatch(actions.getUsersRides());
    dispatch(actions.getGroups());
  }, []);

  return isPassenger ? <PassengersHome /> : <DriversHome />;
};

export default Home;
