
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Home from '..//src/components/home/Home';
import Dashboard from './components/Dashboard/Dashboard';
import User from './pages/Admin/User';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/'  element={<Home/>}></Route>
          <Route path='/Login'  element={<Login/>}></Route>
          <Route path='/dashboard'  element={<Dashboard/>}></Route>
          <Route path='/users'  element={<User/>}></Route>
          <Route path='/adduser'  element={<Dashboard/>}></Route>
          {/* Add more routes as needed */}
          
          
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
