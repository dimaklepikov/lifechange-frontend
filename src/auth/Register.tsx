import { useState } from "react"
import { TextField, Button, Card, CardContent, Typography, Stack } from "@mui/material"
import api from "../api/axios"

function Register() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const register = async () => {
    await api.post("/auth/register", {
      username,
      password
    })
    alert("Registered! Now login.")
  }

  return (
    <Card sx={{ maxWidth: 400, margin: "auto", mt: 5 }}>
      <CardContent>
        <Typography variant="h5">Register</Typography>
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
          <Button variant="contained" onClick={register}>
            Register
          </Button>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default Register