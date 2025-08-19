import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import EventsPage from './pages/EventsPage'
import BlogsPage from './pages/BlogsPage'
import EventPage from './pages/EventPage'
import {Routes, Route} from 'react-router-dom'
import {Toaster} from"react-hot-toast"
import DashBoardPage from './pages/DashboardPage'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoutes from './components/ProtectedRoutes'
import AdminPanelPage from './pages/Admin/AdminPanelPage'
import AdminEvents from './pages/Admin/AdminEvents'
import AdminBlogs from './pages/Admin/AdminBlogs'
import AdminAttendance from './pages/Admin/AdminAttendance'
import GalleryPage from './pages/GalleryPage'
import DashboardCopy from './pages/DashboardPageCopy'
import Leaderboard from './pages/LeaderBoardPage'
function App() {

  return (
    <AuthProvider >
    <div className="min-h-screen bg-base-200 transition-colors duration-300" data-theme="mytheme_dark">
      <NavBar/>
      <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/events' element={
        <ProtectedRoutes>
          <EventsPage />
        </ProtectedRoutes>
        
      } />
      <Route path='/gallery' element={
        <ProtectedRoutes>
          <GalleryPage />
        </ProtectedRoutes>
        
      } />
      <Route path='/blogs'  element={
        <ProtectedRoutes>
          <BlogsPage />
        </ProtectedRoutes>
        
      } />
      <Route path= '/dashboard'  element={
        <ProtectedRoutes>
          <DashBoardPage/>
        </ProtectedRoutes>
        
      }/>
      <Route path= '/leaderboard'  element={
        <ProtectedRoutes>
          <Leaderboard/>
        </ProtectedRoutes>
        
      }/>
      <Route path= '/signup' element= {<SignUpPage /> }/>
      <Route path='/login' element={<LoginPage/>}/>

      <Route path= '/admin'  element={
        <ProtectedRoutes requireAdmin>
          <AdminPanelPage />
        </ProtectedRoutes>
        
      }/>
      <Route path= '/admin/events'  element={
        <ProtectedRoutes requireAdmin>
          <AdminEvents/>
        </ProtectedRoutes>
        
      }/>
      <Route path= '/admin/blogs'  element={
        <ProtectedRoutes requireAdmin>
          <AdminBlogs/>
        </ProtectedRoutes>
        
      }/>
      <Route path= '/admin/attendance'  element={
        <ProtectedRoutes requireAdmin>
          <AdminAttendance />
        </ProtectedRoutes>
        
      }/>
      </Routes>
      {/* <Footer/> */}
      <Toaster position='top-center' reverseOrder={false}/>
    </div>
    </AuthProvider>
  )
}

export default App
