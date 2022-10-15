import { Routes, Route } from "react-router-dom";
import Home from './components/Home';
import PageNotFound from './components/PageNotFound';
import Card from "./components/Card";
import CreateAccount from "./components/CreateAccount"
import Forget from "./components/Forget";
import Activity from "./components/Activity";
import Edit from "./components/Edit";
import AuthContextProvider from './context/AuthContext';

export function App() {
  return (
    <div className='font-monserrat'>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/card" element={<Card />} />
          <Route path="/createaccount" element={<CreateAccount />} />
          <Route path="/forget" element={<Forget />} />
          <Route path="/activity" element={<Activity />} />
          <Route path="/edit" element={<Edit />} />
          <Route path='*' element={<PageNotFound/>}/>
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
