import Home from './Components/Home';
import Login from './Components/Login';
import { Route,Routes } from 'react-router-dom';
import AddNew from './Components/AddNew';
import Requests from './Components/Requests';
import ForgetPassword from './Components/ForgetPassword';
import SendCode from './Components/SendCode';
import AllGuids from './Components/AllGuids';
import SupDetailsRequest from './Components/SupDetailsRequest';
import SeeDetails from './Components/SeeDetails';
import SupDetailsAllGuide from './Components/SupDetailsAllGuide';
import EditPlace from './Components/EditPlace';
import Comment from './Components/Comment';


function App() {
  
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/home'  element={<Home/>}/>
        <Route path='/forget_password' element={<ForgetPassword/>}/>
        <Route path='/send_code' element={<SendCode/>}/>
        <Route path='/add-new' element={<AddNew/>}/>
        <Route path='/edit-place/:place_id' element={<EditPlace/>}/>
        <Route path='/view-comment/:place_id'element={<Comment/>}/>
        <Route path='/requests' element={<Requests/>}/>
        <Route path='/all-guids' element={<AllGuids/>}/>
        <Route path='/see-details/:guideId' element={<SupDetailsRequest/>}/>
        <Route path='/see-details-guide/:guideId' element={<SupDetailsAllGuide/>}/>
        <Route path="/see-place/:place_id" element={<SeeDetails />} />
        </Routes>
     </div>
  );
}

export default App;
