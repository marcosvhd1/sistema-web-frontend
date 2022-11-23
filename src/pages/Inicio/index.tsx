import MainContent from '../../components/MainContent';


const LOCAL_DATA = JSON.parse(localStorage.getItem('user')!);
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
