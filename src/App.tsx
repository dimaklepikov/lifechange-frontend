import { useState } from "react"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import Login from "./auth/Login"
import Register from "./auth/Register"
import Profile from "./pages/Profile"
import Tasks from "./components/TaskList"
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Stack,
  Container
} from "@mui/material"

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"))

  const logout = () => {
    localStorage.removeItem("token")
    setToken(null)
  }

  return (
    <BrowserRouter>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            LifeChange
          </Typography>
          <Stack direction="row" spacing={2}>
            {!token && <Button color="inherit" component={Link} to="/login">Login</Button>}
            {!token && <Button color="inherit" component={Link} to="/register">Register</Button>}
            {token && <Button color="inherit" component={Link} to="/profile">Profile</Button>}
            {token && <Button color="inherit" component={Link} to="/tasks">Tasks</Button>}
            {token && <Button color="inherit" onClick={logout}>Logout</Button>}
          </Stack>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/register" element={<Register setToken={setToken} />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/tasks" element={<Tasks />} />
        </Routes>
      </Container>
    </BrowserRouter>
  )
}

export default App