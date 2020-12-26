import SInfo from 'react-native-sensitive-info';
import {KEYCHAIN_SERVICE, SHARED_PREFERENCES_NAME} from '@env';

const storeData = async (key, value) => {
  try {
    await SInfo.setItem(key, value, {
      keychainService: KEYCHAIN_SERVICE,
      sharedPreferencesName: SHARED_PREFERENCES_NAME,
    });
  } catch (e) {
    console.log(e);
  }
};

const readData = async key => {
  try {
    const value = await SInfo.getItem(key, {
      keychainService: KEYCHAIN_SERVICE,
      sharedPreferencesName: SHARED_PREFERENCES_NAME,
    });

    return value;
  } catch (e) {
    console.log(e);
  }
};

const removeData = async key => {
  try {
    await SInfo.deleteItem(key, {
      keychainService: KEYCHAIN_SERVICE,
      sharedPreferencesName: SHARED_PREFERENCES_NAME,
    });
  } catch (e) {
    console.log(e);
  }
};

const STORAGE_KEYS = {
  token: 'TOKEN',
  refreshToken: 'REFRESH_TOKEN',
  userId: 'USER_ID',
};

export {STORAGE_KEYS, storeData, readData, removeData};
