   
import {  BrowserRouter,  Routes , Route } from 'react-router-dom';
import Home from './components/home/Home';
import MiniDrawer from './dashboard/MiniDrawer';
import Dashboard from './dashboard/page/Dashboard/Dashboard';
import Calendar from './dashboard/page/calendar/Calendar';
import ContactsInformation from './dashboard/page/contactsInformation/ContactsInformation';
import InvoicesBalances from './dashboard/page/invoicesBalances/InvoicesBalances';
import ManageTeam from './dashboard/page/manageTeam/ManageTeam';
 
import ProfileForme from './dashboard/page/profileForme/ProfileForme';
 
import BarChart from './dashboard/page/barChart/BarChart';
import PieChart from './dashboard/page/pieChart/PieChart';
import LineChart from './dashboard/page/lineChart/LineChart';
import Demmande from './components/hero/Demmande';
import DemmandeList from "./dashboard/page/demande/demmande-list";
import GestionArticle from './dashboard/page/gestionArticle/GestionArticle';
 

function App() {
  return (
    <BrowserRouter >
      <Routes>
        <Route path="/" exact Component={Home}/> 
        <Route path="/" element ={<MiniDrawer/>}> 
        <Route  path='/admin' element={<Dashboard/>}/>
        <Route path='/adminManage' element={<DemmandeList/>}/>
        <Route path='/adminCalendar' element={<Calendar/>}/>
        <Route path='/adminContacts' element={<ContactsInformation/>}/>
        <Route path='/adminInvoices' element={<InvoicesBalances/>}/>
        <Route path='/adminArticle' element={<GestionArticle/>}/>
        <Route path='/adminProfile' element={<ProfileForme/>}/>
        <Route path='/adminBar' element={<BarChart/>}/>
        <Route path='/adminpie' element={<PieChart/>}/>
        <Route path='/adminLine' element={<LineChart/>}/>
        <Route path='/dommande' element={<Demmande/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
 
  );
}

export default App;