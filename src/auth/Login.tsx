import { useState, useEffect } from "react"
import {useLocation, useSearchParams} from "react-router-dom"
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Stack,
  Alert
} from "@mui/material"
import { useNavigate } from "react-router-dom"
import api from "../api/axios"

function Login({ setToken }: { setToken: (val: string) => void }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [searchParams] = useSearchParams()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (searchParams.get("logged_out") === "1") {
      setSuccess("✅ Вы успешно вышли")
    }
    // TODO: Send to tasks
    const timeout = setTimeout(() => setSuccess(""), 3000)
    return () => clearTimeout(timeout)
  }, [location.search])

  const login = async () => {
    try {
      const form = new URLSearchParams()
      form.append("username", email)
      form.append("password", password)

      const res = await api.post("/auth/jwt/login", form, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
      })

      localStorage.setItem("token", res.data.access_token)
      setToken(res.data.access_token)
      // ✅ Перенаправляем
      navigate("/tasks")
    } catch (err) {
      setError("Ошибка входа: проверьте данные")
    }
  }

  return (
    <Card sx={{ maxWidth: 400, margin: "auto", mt: 5 }}>
      <CardContent>
        <Typography variant="h5">Login</Typography>
        <Stack spacing={2} mt={2}>
          {success && <Alert severity="success">{success}</Alert>}
          {error && <Alert severity="error">{error}</Alert>}
          <TextField
            label="Email"
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
  )
}

export default Login