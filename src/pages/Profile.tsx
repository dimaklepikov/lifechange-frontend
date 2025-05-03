import { useEffect, useState } from "react"
import api from "../api/axios"
import { Card, CardContent, Typography, CircularProgress } from "@mui/material"

function Profile() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    api.get("/users/me").then(res => setUser(res.data))
  }, [])

  return (
    <Card sx={{ maxWidth: 600, margin: "auto", mt: 5 }}>
      <CardContent>
        <Typography variant="h5">Profile</Typography>
        {user ? (
          <Typography sx={{ mt: 2 }}>
            <pre>{JSON.stringify(user, null, 2)}</pre>
          </Typography>
        ) : (
          <CircularProgress />
        )}
      </CardContent>
    </Card>
  )
}

export default Profile