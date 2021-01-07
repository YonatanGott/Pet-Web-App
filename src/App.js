
import React from 'react'
import UserContextProvider from './contexts/UserContext'
import Routes from './components/Routes';


function App() {

  return (
    <div className="App">
      <UserContextProvider>
        <Routes />
      </UserContextProvider>
    </div>
  );
}

export default App;
