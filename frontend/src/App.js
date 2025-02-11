


import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Home from './Home';
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/Login'  element={<Login/>}></Route>
          <Route path='/'  element={<Home/>}></Route>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
