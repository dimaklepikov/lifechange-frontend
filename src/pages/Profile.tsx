import { useEffect, useState } from "react"
import api from "../api/axios"
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Stack,
  Button,
  TextField
} from "@mui/material"

function Profile() {
  const [user, setUser] = useState<any>(null)
  const [editMode, setEditMode] = useState(false)
  const [form, setForm] = useState({ name: "", age: "", height: "", weight: "" })

  useEffect(() => {
    api.get("/users/me").then(res => {
      setUser(res.data)
      setForm({
        name: res.data.name ?? "",
        age: res.data.age ?? "",
        height: res.data.height ?? "",
        weight: res.data.weight ?? ""
      })
    })
  }, [])

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [field]: e.target.value })
  }

  const handleSave = async () => {
  try {
    const payload: Record<string, any> = {}

    for (const [key, value] of Object.entries(form)) {
      if (["weight", "height"].includes(key)) {
        payload[key] = value === "" ? null : parseFloat(value)
      } else if (["age"].includes(key)) {
        payload[key] = value === "" ? null : parseInt(value)
      } else {
        payload[key] = value
      }
    }

    const res = await api.patch("/users/me", payload)
    setUser(res.data)
    setEditMode(false)
  } catch (err) {
    console.error("Ошибка при обновлении профиля", err)
  }
}

  if (!user) {
    return (
      <Stack alignItems="center" mt={5}>
        <CircularProgress />
      </Stack>
    )
  }

  return (
    <Card sx={{ maxWidth: 600, margin: "auto", mt: 5 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Профиль
        </Typography>

        {editMode ? (
          <Stack spacing={2}>
            <TextField label="Имя" value={form.name} onChange={handleChange("name")} />
            <TextField label="Возраст" value={form.age} onChange={handleChange("age")} />
            <TextField label="Рост" value={form.height} onChange={handleChange("height")} />
            <TextField label="Вес" value={form.weight} onChange={handleChange("weight")} />
            <Stack direction="row" spacing={1}>
              <Button variant="contained" onClick={handleSave}>Сохранить</Button>
              <Button variant="outlined" onClick={() => setEditMode(false)}>Отмена</Button>
            </Stack>
          </Stack>
        ) : (
          <Stack spacing={1}>
            <Typography>Имя: {user.name || "-"}</Typography>
            <Typography>Возраст: {user.age || "-"}</Typography>
            <Typography>Рост: {user.height || "-"} см</Typography>
            <Typography>Вес: {user.weight || "-"} кг</Typography>
            <Button sx={{ mt: 2 }} onClick={() => setEditMode(true)} variant="outlined">
              Редактировать
            </Button>
          </Stack>
        )}
      </CardContent>
    </Card>
  )
}

export default Profile