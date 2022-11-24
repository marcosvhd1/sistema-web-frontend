import MainContent from '../../components/MainContent';
import { getDecrypted } from '../../utils/crypto';


const LOCAL_DATA = getDecrypted(localStorage.getItem('user'));
const TOKEN = LOCAL_DATA?.user.accessToken;

export const HEADERS = {
  headers: {
    'Authorization': TOKEN
  }
};

export function Home() {

  return (
    <MainContent>
      <h1>Main</h1>
    </MainContent>
  );
}
