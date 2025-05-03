import { useState } from "react"
import { TextField, Button, Card, CardContent, Typography, Stack, Snackbar, Alert } from "@mui/material"
import { useNavigate } from "react-router-dom"
import api from "../api/axios"

function Register({ setToken }: { setToken: (val: string) => void }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [error, setError] = useState(false)
  const navigate = useNavigate()

  const register = async () => {
    try {
      // 👤 Регистрируем пользователя
      await api.post("/auth/register", {
        email,
        password,
        name,
      })

      // 🔐 Сразу логиним
      const form = new URLSearchParams()
      form.append("username", email) // FastAPI Users требует "username"
      form.append("password", password)

      const res = await api.post("/auth/jwt/login", form.toString(), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })

      localStorage.setItem("token", res.data.access_token)
      setToken(res.data.access_token)

      // ✅ Перенаправляем
      navigate("/tasks")
    } catch (err) {
      console.error("Registration/Login error:", err)
      setError(true)
    }
  }

  return (
    <>
      <Card sx={{ maxWidth: 400, margin: "auto", mt: 5 }}>
        <CardContent>
          <Typography variant="h5">Register</Typography>
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
            <TextField
              label="Name"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Button variant="contained" onClick={register}>
              Register
            </Button>
          </Stack>
        </CardContent>
      </Card>

      <Snackbar
        open={error}
        autoHideDuration={4000}
        onClose={() => setError(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="error" onClose={() => setError(false)}>
          Registration or login failed.
        </Alert>
      </Snackbar>
    </>
  )
}

export default Register