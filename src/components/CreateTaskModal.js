// src/components/CreateTaskModal.js
import * as React from 'react';
import { Modal, Box, Typography, TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const CreateTaskModal = ({ open, handleClose, handleCreate }) => {
  const [task, setTask] = React.useState({
    title: '',
    sub_title: '',
    priority: 'low',
    due_date: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCreate(task);
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="create-task-modal-title"
      aria-describedby="create-task-modal-description"
    >
      <Box sx={style}>
        <Typography id="create-task-modal-title" variant="h6" component="h2">
          Create New Task
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Title"
            name="title"
            value={task.title}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Subtitle"
            name="sub_title"
            value={task.sub_title}
            onChange={handleChange}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="priority-label">Priority</InputLabel>
            <Select
              labelId="priority-label"
              name="priority"
              value={task.priority}
              onChange={handleChange}
            >
              <MenuItem value="high">High</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="low">Low</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            margin="normal"
            label="Due Date"
            name="due_date"
            type="datetime-local"
            InputLabelProps={{ shrink: true }}
            value={task.date}
            onChange={handleChange}
          />
          <Button type="submit" variant="contained" color="primary">
            Create Task
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default CreateTaskModal;
