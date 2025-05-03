import { RadioGroup, FormControlLabel, Radio, Typography, Card, CardContent } from "@mui/material"

function TaskList() {
  const tasks = [
    { id: 1, description: "Сделать разминку" },
    { id: 2, description: "Почитать 30 минут" }
  ]

  return (
    <Card sx={{ maxWidth: 600, margin: "auto", mt: 5 }}>
      <CardContent>
        <Typography variant="h5">Tasks for Today</Typography>
        {tasks.map((task) => (
          <div key={task.id}>
            <Typography sx={{ mt: 2 }}>{task.description}</Typography>
            <RadioGroup row>
              <FormControlLabel value="none" control={<Radio />} label="Нет" />
              <FormControlLabel value="partial" control={<Radio />} label="Частично" />
              <FormControlLabel value="done" control={<Radio />} label="Готово" />
            </RadioGroup>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export default TaskList