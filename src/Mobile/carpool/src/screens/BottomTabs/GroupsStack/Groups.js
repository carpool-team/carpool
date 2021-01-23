import React, {useEffect} from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Alert,
} from 'react-native';
import sheet from '../../../styles/sheet';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from '../../../styles/colors';
import {useSelector, useDispatch} from 'react-redux';
import * as actions from '../../../store/actions';
import {GroupsList} from '../../../components/Groups';

const Groups = ({navigation}) => {
  const groups = useSelector(store => store.accountReducer.groups);
  const invitations = useSelector(store => store.accountReducer.invitations);
  const dispatch = useDispatch();

  const onItemPress = item => {
    navigation.push('GroupDetails', {group: item});
  };

  const onRefresh = () => {
    dispatch(actions.getGroups());
    dispatch(actions.getInvitations());
  };

  useEffect(() => {
    onRefresh();
  }, []);

  useEffect(() => {
    if (groups.error) {
      Alert.alert(
        'Error',
        'An error ocurred when trying to fetch groups from the server. Please try again.',
        [
          {
            text: 'Ok',
            style: 'default',
          },
        ],
      );
    }
  }, [groups]);

  useEffect(() => {
    if (invitations.error) {
      Alert.alert(
        'Error',
        'An error ocurred when trying to fetch invitations from the server. Please try again.',
        [
          {
            text: 'Ok',
            style: 'default',
          },
        ],
      );
    }
  }, [invitations]);

  const getInvitations = number => {
    if (number === 0) {
      return null;
    } else {
      return (
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Invitations')}>
          <Text style={styles.number}>
            {`${number} new invitation${number > 1 ? 's' : ''}`}
          </Text>
          <Icon name="group-add" size={32} color={colors.grayDark} />
        </TouchableOpacity>
      );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {getInvitations(invitations.data ? invitations.data.length : 0)}
        <GroupsList
          data={groups.data}
          loading={groups.loading}
          onItemPress={onItemPress}
          onRefresh={onRefresh}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  button: {
    ...sheet.rowCenterSplit,
    width: '100%',
    padding: 16,
  },
  number: {
    ...sheet.textSemiBold,
    fontSize: 14,
    color: colors.blue,
  },
});

export default Groups;
