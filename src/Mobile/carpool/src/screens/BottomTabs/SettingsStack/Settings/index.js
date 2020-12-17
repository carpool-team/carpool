import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import {StandardButton} from '../../../../components/common/buttons';
import {colors, sheet} from '../../../../styles';
import * as actions from '../../../../store/actions';
import {useDispatch, useSelector} from 'react-redux';
import UpView from '../../../../components/common/UpView';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {FullScreenLoading} from '../../../../components/common/loaders';
import {SafeScroll} from '../../../../components/common/wrappers';
import {styles} from './index.styles';

const Settings = () => {
  const user = useSelector(state => state.accountReducer.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.getUser());
  }, []);

  const onLogout = () => dispatch(actions.logoutUser());

  const onDelete = () =>
    Alert.alert(
      'Warning!',
      'Are you sure you want to delete your account? This action cannot be undone.',
      [
        {
          style: 'default',
          text: 'Cancel',
        },
        {
          style: 'destructive',
          text: 'Delete',
          onPress: () => dispatch(actions.deleteAccount()),
        },
      ],
    );

  return (
    <SafeScroll minHeight={500}>
      {user.loading ? (
        <FullScreenLoading />
      ) : (
        <View style={styles.container}>
          <View style={styles.flexCenter}>
            <View style={sheet.rowCenter}>
              <View style={styles.flexCenter}>
                <TouchableOpacity onPress={onDelete}>
                  <Text style={styles.delete}>Delete</Text>
                </TouchableOpacity>
              </View>
              <UpView
                style={styles.circle}
                borderRadius={9999}
                contentContainerStyle={styles.contentContainer}>
                <Icon name="person" color={colors.grayDark} size={65} />
              </UpView>
              <View style={styles.flexCenter}>
                <TouchableOpacity>
                  <Text style={styles.edit}>Edit</Text>
                </TouchableOpacity>
              </View>
            </View>
            <Text style={styles.name}>{`${user.data.firstName} ${
              user.data.lastName
            }`}</Text>
            <Text style={styles.email}>{user.data.email}</Text>
          </View>
          <StandardButton
            title="Logout"
            color={colors.red}
            onPress={onLogout}
          />
        </View>
      )}
    </SafeScroll>
  );
};

export default Settings;
