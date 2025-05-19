import { RouterProvider } from 'react-router-dom';
import router from './routes/AppRoutes'
import { ThemeProvider } from './store/ThemeContext';
import { UserContextProvider } from './store/UserContext';

const App: React.FC = () => {

  return (
    <>
      <ThemeProvider>
        <UserContextProvider>
          <RouterProvider router={router}>

          </RouterProvider>
        </UserContextProvider>
      </ThemeProvider>
    </>
  )
}

export default App
