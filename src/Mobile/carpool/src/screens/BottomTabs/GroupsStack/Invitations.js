import React, {useEffect} from 'react';
import {SafeAreaView, Alert} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import * as actions from '../../../store/actions';
import {InvitationsList} from '../../../components/Groups';
import {GoBack} from '../../../components/navigation';

const Invitations = ({navigation}) => {
  const invitations = useSelector(store => store.accountReducer.invitations);
  const dispatch = useDispatch();

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <GoBack onPress={navigation.goBack} />,
    });
  }, []);

  const onAccept = item => {
    dispatch(actions.acceptInvitation(item.groupInviteId))
      .then(() => navigation.goBack())
      .catch(err =>
        Alert.alert(
          'Error',
          'An error ocurred when trying to accept invitation. Please try again.',
          [
            {
              text: 'Ok',
              style: 'default',
            },
          ],
        ),
      );
  };

  const onDecline = async item => {
    dispatch(actions.declineInvitation(item.groupInviteId))
      .then(() => navigation.goBack())
      .catch(err =>
        Alert.alert(
          'Error',
          'An error ocurred when trying to reject invitation. Please try again.',
          [
            {
              text: 'Ok',
              style: 'default',
            },
          ],
        ),
      );
  };

  const onRefresh = () => dispatch(actions.getInvitations());

  return (
    <SafeAreaView style={{flex: 1}}>
      <InvitationsList
        data={invitations.data}
        loading={invitations.loading}
        onDecline={onDecline}
        onAccept={onAccept}
        onRefresh={onRefresh}
      />
    </SafeAreaView>
  );
};

export default Invitations;
