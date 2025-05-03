import { useState } from "react"
import { TextField, Button, Card, CardContent, Typography, Stack, Snackbar, Alert } from "@mui/material"
import api from "../api/axios"

function Register() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)

  const register = async () => {
    try {
      await api.post("/auth/register", {
        email,
        password
      })
      setSuccess(true)
    } catch (err) {
      console.error("Registration error:", err)
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
              fullWidth
              type="email"
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
            <Button variant="contained" onClick={register}>
              Register
            </Button>
          </Stack>
        </CardContent>
      </Card>

      <Snackbar
        open={success}
        autoHideDuration={4000}
        onClose={() => setSuccess(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}  // 👈 Центр внизу
      >
        <Alert severity="success" onClose={() => setSuccess(false)}>
          Registered! You can now login.
        </Alert>
      </Snackbar>

      <Snackbar
        open={error}
        autoHideDuration={4000}
        onClose={() => setError(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}  // 👈 Центр внизу
      >
        <Alert severity="error" onClose={() => setError(false)}>
          Registration failed.
        </Alert>
      </Snackbar>
    </>
  )
}

export default Register