import { MemberModalProvider } from './contexts/MemberModalContext';
import { MemberDataProvider } from './contexts/MemberDataContext';
import { MemberView } from './components/MemberView';

function App() {
  return (
    <MemberDataProvider>
      <MemberModalProvider>
        <MemberView />
      </MemberModalProvider>
    </MemberDataProvider>
  );
}

export default App;
