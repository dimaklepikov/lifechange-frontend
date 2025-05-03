import { useState } from "react"
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Stack,
  Snackbar,
  Alert,
} from "@mui/material"
import api from "../api/axios"

function Login({ setToken }: { setToken: (val: string) => void }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)

  const login = async () => {
    const form = new URLSearchParams()
    form.append("username", email)  // 👈 FastAPI Users ожидает "username"
    form.append("password", password)

    try {
      const res = await api.post("/auth/jwt/login", form.toString(), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })

      localStorage.setItem("token", res.data.access_token)
      setToken(res.data.access_token)
      setSuccess(true)
    } catch (err) {
      console.error("Login error:", err)
      setError(true)
    }
  }

  return (
    <>
      <Card sx={{ maxWidth: 400, margin: "auto", mt: 5 }}>
        <CardContent>
          <Typography variant="h5">Login</Typography>
          <Stack spacing={2} mt={2}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button variant="contained" onClick={login}>
              Login
            </Button>
          </Stack>
        </CardContent>
      </Card>

      <Snackbar
        open={success}
        autoHideDuration={4000}
        onClose={() => setSuccess(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" onClose={() => setSuccess(false)}>
          Logged in successfully.
        </Alert>
      </Snackbar>

      <Snackbar
        open={error}
        autoHideDuration={4000}
        onClose={() => setError(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="error" onClose={() => setError(false)}>
          Invalid email or password.
        </Alert>
      </Snackbar>
    </>
  )
}

export default Login