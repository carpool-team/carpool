import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native';
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
      .then(res => {
        console.log('SUCCESS');
      })
      .catch(err => alert('Error ocurred'));
  };

  const onDecline = async item => {
    dispatch(actions.declineInvitation(item.groupInviteId))
      .then(res => {
        console.log('SUCCESS');
      })
      .catch(err => alert('Error ocurred'));
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
