import { useState } from "react"
import { TextField, Button, Card, CardContent, Typography, Stack } from "@mui/material"
import api from "../api/axios"

function Login({ setToken }: { setToken: (val: string) => void }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const login = async () => {
    const form = new URLSearchParams()
    form.append("username", username) // 👈 FastAPI ждёт "username", хотя это email
    form.append("password", password)

    try {
      const res = await api.post("/auth/jwt/login", form, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
      })

      localStorage.setItem("token", res.data.access_token)
      setToken(res.data.access_token)
    } catch (err) {
      console.error("Login error:", err)
      alert("Invalid email or password.")
    }
  }

  return (
    <Card sx={{ maxWidth: 400, margin: "auto", mt: 5 }}>
      <CardContent>
        <Typography variant="h5">Login</Typography>
        <Stack spacing={2} mt={2}>
          <TextField
            label="Username"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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