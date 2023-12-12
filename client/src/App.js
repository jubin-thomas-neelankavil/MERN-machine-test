import './App.css';
import Adduser from './components/Adduser';
import NavBar from './components/NavBar';
import AllUsers from './components/AllUsers';
import CodeForInterview from './components/CodeForInterview ';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import EditUser from './components/EditUser';

function App() {
  return (
    <>
    <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={  <CodeForInterview />} />
        
          <Route path='/all' element={<AllUsers />} /> 
          
          <Route path='/add' element={<Adduser />} /> 
          
          <Route path='/edit/:id' element={<EditUser />} />

        </Routes>
      </BrowserRouter>
      </>
  );
}

export default App;
