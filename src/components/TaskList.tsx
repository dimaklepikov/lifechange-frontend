import { useEffect, useState } from "react"
import {
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  Card,
  CardContent,
  Checkbox,
  TextField
} from "@mui/material"
import api from "../api/axios"

interface Task {
  id: string
  title: string
  description: string
  task_type: "single_choice" | "multiple_choice" | "text"
  is_global: boolean
  assigned_user_id: string | null
}

function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await api.get("/tasks/me")
        setTasks(res.data)
      } catch (err) {
        console.error("Ошибка при загрузке задач", err)
      }
    }
    fetchTasks()
  }, [])

  return (
    <Card sx={{ maxWidth: 600, margin: "auto", mt: 5 }}>
      <CardContent>
        <Typography variant="h5">Задания на сегодня</Typography>
        {tasks.map((task) => (
          <div key={task.id} style={{ marginTop: 20 }}>
            <Typography variant="subtitle1">{task.title}</Typography>
            <Typography variant="body2" color="text.secondary">
              {task.description}
            </Typography>

            {task.task_type === "single_choice" && (
              <RadioGroup row>
                <FormControlLabel value="none" control={<Radio />} label="Нет" />
                <FormControlLabel value="partial" control={<Radio />} label="Частично" />
                <FormControlLabel value="done" control={<Radio />} label="Готово" />
              </RadioGroup>
            )}

            {task.task_type === "multiple_choice" && (
              <>
                <FormControlLabel control={<Checkbox />} label="Часть 1" />
                <FormControlLabel control={<Checkbox />} label="Часть 2" />
              </>
            )}

            {task.task_type === "text" && (
              <TextField
                label="Ваш ответ"
                fullWidth
                multiline
                rows={2}
                sx={{ mt: 1 }}
              />
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export default TaskList