import { getDecrypted } from './crypto';

export function userInfos() {
  const LOCAL_DATA = getDecrypted(localStorage.getItem('user'));
  const TOKEN = LOCAL_DATA?.user.accessToken;

  const userInfos = {
    header: {
      headers: {
        'Authorization': TOKEN
      }
    },
    infos: LOCAL_DATA?.user
  };
  return userInfos;
}
