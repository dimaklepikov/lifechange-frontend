import {
  Typography,
  Card,
  CardContent,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  TextField,
  Button,
  FormGroup
} from "@mui/material"
import { useEffect, useState } from "react"
import api from "../api/axios"

interface TaskOption {
  id: number
  text: string
}

interface Task {
  id: string
  title: string
  description: string
  task_type: "single_choice" | "multiple_choice" | "text"
  options: TaskOption[]
}

interface TaskAnswer {
  selected_option_ids?: number[]
  text_answer?: string
}

type AnswersMap = {
  [taskId: string]: TaskAnswer
}

function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [answers, setAnswers] = useState<AnswersMap>({})
  const [success, setSuccess] = useState<string | null>(null)

  useEffect(() => {
    const fetchTasks = async () => {
      const res = await api.get("/tasks/me")
      setTasks(res.data)
    }
    fetchTasks()
  }, [])

  const handleOptionChange = (taskId: string, optionId: number) => {
    setAnswers((prev) => ({
      ...prev,
      [taskId]: {
        selected_option_ids: [optionId],
        text_answer: prev[taskId]?.text_answer
      }
    }))
  }
  const handleMultiChange = (taskId: string, optionId: number) => {
  const current = answers[taskId]?.selected_option_ids || []

  const newOptions = current.includes(optionId)
    ? current.filter((v: number) => v !== optionId)
    : [...current, optionId]

  setAnswers({
    ...answers,
    [taskId]: {
      selected_option_ids: newOptions,
      text_answer: answers[taskId]?.text_answer || ""
    }
  })
}

  const handleTextChange = (taskId: string, text: string) => {
    setAnswers((prev) => ({
      ...prev,
      [taskId]: {
        selected_option_ids: prev[taskId]?.selected_option_ids,
        text_answer: text
      }
    }))
  }

  const handleSubmit = async () => {
    const payload = Object.entries(answers).map(([task_id, answer]) => ({
      task_id,
      ...answer
    }))
    try {
      await api.post("/tasks/answers", payload)
      setSuccess("✅ Ваши ответы сохранены")
      setTimeout(() => setSuccess(null), 3000)
    } catch (error) {
      console.error("Ошибка при отправке:", error)
    }
  }

  return (
    <Card sx={{ maxWidth: 600, margin: "auto", mt: 5 }}>
      <CardContent>
        <Typography variant="h5">Tasks for Today</Typography>
        {tasks.map((task) => (
          <div key={task.id} style={{ marginTop: 20 }}>
            <Typography>{task.title}</Typography>
            <Typography variant="body2" color="text.secondary">{task.description}</Typography>

            {task.task_type === "text" ? (
              <TextField
                fullWidth
                multiline
                rows={3}
                sx={{ mt: 2 }}
                value={answers[task.id]?.text_answer || ""}
                onChange={(e) => handleTextChange(task.id, e.target.value)}
              />
            ) : task.task_type === "multiple_choice" ? (
              <FormGroup sx={{ mt: 2 }}>
                {task.options.map((option) => (
                  <FormControlLabel
                    key={option.id}
                    control={
                      <Checkbox
                        checked={
                          answers[task.id]?.selected_option_ids?.includes(option.id) || false
                        }
                        onChange={() => handleMultiChange(task.id, option.id)}
                      />
                    }
                    label={option.text}
                  />
                ))}
              </FormGroup>
            ) : (
              <RadioGroup
                value={answers[task.id]?.selected_option_ids?.[0] || ""}
                onChange={(e) =>
                  handleOptionChange(task.id, parseInt(e.target.value))
                }
              >
                {task.options.map((option) => (
                  <FormControlLabel
                    key={option.id}
                    value={option.id}
                    control={<Radio />}
                    label={option.text}
                  />
                ))}
              </RadioGroup>
            )}
          </div>
        ))}

        <Button
          variant="contained"
          sx={{ mt: 3 }}
          onClick={handleSubmit}
        >
          Отправить
        </Button>
        {success && (
          <Typography color="green" sx={{ mt: 2 }}>
            {success}
          </Typography>
        )}
      </CardContent>
    </Card>
  )
}

export default TaskList