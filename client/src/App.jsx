import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import NavBar from './components/NavBAr'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import EventsPage from './pages/EventsPage'
import BlogsPage from './pages/BlogsPage'
import EventPage from './pages/EventPage'
import {Routes, Route} from 'react-router-dom'
import {Toaster} from"react-hot-toast"
import DashBoardPage from './pages/DashboardPage'
import SignUpPage from './pages/SignUpPage'
function App() {

  return (
    <div className="min-h-screen bg-base-200 transition-colors duration-300" data-theme="mytheme">
      <NavBar/>
      <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/events' element={<EventsPage />} />
      <Route path='/blogs' element = {<BlogsPage />} />
      <Route path= '/dashboard' element= {<DashBoardPage /> }/>
      <Route path= '/signup' element= {<SignUpPage /> }/>
      </Routes>
      <Footer/>
      <Toaster position='top-center' reverseOrder={false}/>
    </div>
  )
}

export default App
