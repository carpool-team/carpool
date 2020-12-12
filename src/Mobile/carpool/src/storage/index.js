import SInfo from 'react-native-sensitive-info';

const storeData = async (key, value) => {
  try {
    await SInfo.setItem(key, value, {
      keychainService: 'myKeychain',
      sharedPreferencesName: 'mySharedPrefs',
    });
  } catch (e) {
    console.log(e);
  }
};

const readData = async key => {
  try {
    const value = await SInfo.getItem(key, {
      keychainService: 'myKeychain',
      sharedPreferencesName: 'mySharedPrefs',
    });

    return value;
  } catch (e) {
    console.log(e);
  }
};

const removeData = async key => {
  try {
    await SInfo.deleteItem(key, {
      keychainService: 'myKeychain',
      sharedPreferencesName: 'mySharedPrefs',
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
