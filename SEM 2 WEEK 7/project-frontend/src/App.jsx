import React, { useState } from 'react';
import Signup from './components/Signup';
import Login from './components/Login';
import ChangePassword from './components/ChangePassword';

const App = () => {
  const [token, setToken] = useState(null);

  return (
    <div>
      <h1>Social Media App</h1>
      {!token ? (
        <>
          <Signup />
          <Login setToken={setToken} />
        </>
      ) : (
        <>
          <ChangePassword token={token} />
          <button onClick={() => setToken(null)}>Logout</button>
        </>
      )}
    </div>
  );
};

export default App;
