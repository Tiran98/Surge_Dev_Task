import {Routes, Route, BrowserRouter} from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import UserList from './components/Admin/UserList';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/login" exact={true} element={<Login/>}></Route>
          <Route path="/Register" exact={true} element={<Register/>}></Route>
          <Route path="/UserList" exact={true} element={<UserList/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
