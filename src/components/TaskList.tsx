import { useEffect, useState } from "react"
import {
  Typography,
  Card,
  CardContent,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  TextField,
  Stack
} from "@mui/material"
import api from "../api/axios"

interface TaskOption {
  id: number
  text: string
}

interface Task {
  id: string
  title: string
  description?: string
  task_type: "single_choice" | "multiple_choice" | "text"
  options: TaskOption[]
}

function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [answers, setAnswers] = useState<Record<string, any>>({})

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

  const handleSingleChange = (taskId: string, value: number) => {
    setAnswers({ ...answers, [taskId]: value })
  }

  const handleMultiChange = (taskId: string, value: number) => {
    const current = answers[taskId] || []
    setAnswers({
      ...answers,
      [taskId]: current.includes(value)
        ? current.filter((v: number) => v !== value)
        : [...current, value]
    })
  }

  const handleTextChange = (taskId: string, value: string) => {
    setAnswers({ ...answers, [taskId]: value })
  }

  return (
    <Card sx={{ maxWidth: 700, margin: "auto", mt: 5 }}>
      <CardContent>
        <Typography variant="h5">Ваши задания</Typography>

        {tasks.map((task) => (
          <div key={task.id} style={{ marginTop: 24 }}>
            <Typography variant="subtitle1">{task.title}</Typography>
            <Typography variant="body2" color="text.secondary">{task.description}</Typography>

            {task.task_type === "single_choice" && (
              <RadioGroup
                value={answers[task.id] || ""}
                onChange={(e) => handleSingleChange(task.id, parseInt(e.target.value))}
              >
                {task.options.map((opt) => (
                  <FormControlLabel
                    key={opt.id}
                    value={opt.id}
                    control={<Radio />}
                    label={opt.text}
                  />
                ))}
              </RadioGroup>
            )}

            {task.task_type === "multiple_choice" && (
              <Stack>
                {task.options.map((opt) => (
                  <FormControlLabel
                    key={opt.id}
                    control={
                      <Checkbox
                        checked={(answers[task.id] || []).includes(opt.id)}
                        onChange={() => handleMultiChange(task.id, opt.id)}
                      />
                    }
                    label={opt.text}
                  />
                ))}
              </Stack>
            )}

            {task.task_type === "text" && (
              <TextField
                fullWidth
                label="Ваш ответ"
                value={answers[task.id] || ""}
                onChange={(e) => handleTextChange(task.id, e.target.value)}
                multiline
                rows={3}
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