import {BrowserRouter, Routes, Route} from 'react-router-dom';
// import LoginLayout from './layout/LoginLayout';
// import Login from './views/Login';
import CustomLayout from './layout/CustomLayout';
import Home from './views/Home';
import NewClient from './views/NewClient';
import EditClient from './views/EditClient';
import DetailsClient from './views/DetailsClient';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path='/' element={<LoginLayout/>}>
          <Route index element={<Login></Login>}/>
        </Route> */}
        <Route path='/clients' element={<CustomLayout/>}>
          <Route index element={<Home/>}/>
          <Route path='new' element={<NewClient/>}/>
          <Route path='edit/:id' element={<EditClient/>}/>
          <Route path=':id' element={<DetailsClient/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
