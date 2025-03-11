
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Home from '..//src/components/home/Home';
import TeacherDashboard from './components/Dashboards/TeacherDashboard';
import CardMarkerDashboard from './components/Dashboards/CardMarkerDashboard';
import AdminDashboard from './components/Dashboards/AdminDashboard';
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/'  element={<Home/>}></Route>
          <Route path='/Login'  element={<Login/>}></Route>

          {/* Teacher */}
          <Route path='/TeacherDashboard' element={<TeacherDashboard/>}></Route>
          {/* Card Marker */}
       
          <Route path='/CardMarkerDashboard' element={<CardMarkerDashboard/>}></Route>

          {/* Admin */}
          <Route path='/Admin' element={<AdminDashboard/>}></Route>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
