import { HashRouter, Route, Routes } from "react-router-dom"
import Auth from "./layout/Auth.jsx"
import Login from "./layout/login.jsx"
import Registrar from "./views/Registrar.jsx"
import { AuthProvider } from './context/AuthProvider.jsx';
import { PrivateRoute } from "./routes/PrivateRouter.jsx"
import Dashboard from "./layout/Dashboard.jsx";

function App() {
  return (
    <>
      <HashRouter>
        <AuthProvider>
          <Routes>

            <Route path='/' element={<Auth />}>
              <Route index element={<Login />}></Route>
              <Route path='registrar' element={<Registrar />}></Route>
            </Route>

            <Route path='home/*' element={
              <PrivateRoute>
                <Routes>
                    <Route element={<Dashboard />}>
                      <Route index element={<Dashboard />} />
                      {/* <Route path='listar' element={<Listar />} />
                      <Route path='visualizar/:id' element={<Visualizar />} />
                      <Route path='crear' element={<Crear />} />
                      <Route path='actualizar/:id' element={<Actualizar />} /> */}
                    </Route>
                  </Routes>
              </PrivateRoute>
            } />
          </Routes>
        </AuthProvider>
      </HashRouter>
    </>
  )
}

export default App
