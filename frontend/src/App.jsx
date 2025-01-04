
import {BrowserRouter, Routes,Route} from "react-router-dom"
import {useSelector} from "react-redux"
import HomeSection from "./Components/Home/Home"
import PublicNavbar from "./Components/Navbar/publicNav"
import PrivateNavbar from "./Components/Navbar/privateNav"
import LoginForm from "./Components/Users/Login"
import RegistrationForm from "./Components/Users/Register"
import { getUserFromLocalStorage } from './utils/getUserFromLocalStorage.js'
import AddCategory from "./Components/Category/AddCategory.jsx"
import CategoriesList from "./Components/Category/CategoriesList.jsx"
import UpdateCategory from "./Components/Category/UpdateCategory.jsx"
import TransactionForm from "./Components/Transactions/TransactionForm.jsx"
import Dashboard from "./Components/Users/Dashboard.jsx"
import UserProfile from "./Components/Users/UserProfile.jsx"
import AuthRoute from "./Components/AuthRoute/AuthRoute.jsx"

function App() {

  //? token from local storage.
  const token = getUserFromLocalStorage()
  const user = useSelector((state)=> state?.auth?.user)
  return (
   <BrowserRouter>
   {user ? <PrivateNavbar/> :<PublicNavbar/> }
      
      <Routes>
          <Route path="/" element={<HomeSection/>} />
          <Route path="/login" element={<LoginForm/>} />
          <Route path="/register" element={<RegistrationForm/>} />
          <Route path="/add-category" element={
            <AuthRoute>
                <AddCategory/>
            </AuthRoute>
            } />
          <Route path="/categories" element={
            <AuthRoute>
                <CategoriesList/>
            </AuthRoute>
            } />
          <Route path="/update-category/:id" element={
            <AuthRoute>
                <UpdateCategory/>
            </AuthRoute>
            } />
          <Route path="/add-transaction" element={
            <AuthRoute>
                <TransactionForm/>
            </AuthRoute>
            } />
          <Route path="/dashboard" element={
            <AuthRoute>
                <Dashboard/>
            </AuthRoute> } />
            
          <Route path="/profile" element={
                <AuthRoute>
                    <UserProfile/>
                </AuthRoute> } />
        
          
      </Routes>
   </BrowserRouter>
  )
}

export default App
