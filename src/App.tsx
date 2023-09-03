import React, { useState, useEffect } from "react";
import {
  Container,
  AppBar,
  Typography,
  Stack,
  TextField,
  Button,
} from "@mui/material";
import TodoItem from "./components/TodoItem";
import { getTodos, saveTodos } from "./utils/features";
const App = () => {
  const [todos, setTodos] = useState<TodoItemType[]>(getTodos());
  const [title, setTitle] = useState<TodoItemType["title"]>("");

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  const completeHandler = (id: TodoItemType["id"]): void => {
    const newTodos: TodoItemType[] = todos.map((i) => {
      if (i.id === id) i.isCompleted = !i.isCompleted;
      return i;
    });
    setTodos(newTodos);
  };

  const deleteHandler = (id: TodoItemType["id"]): void => {
    const newTodos: TodoItemType[] = todos.filter((i) => i.id !== id);

    setTodos(newTodos);
  };

  const editHandler = (
    id: TodoItemType["id"],
    newTitle: TodoItemType["title"]
  ): void => {
    const newTodos: TodoItemType[] = todos.map((i) => {
      if (i.id === id) i.title = newTitle;
      return i;
    });
    setTodos(newTodos);
  };

  const submitHandler = (): void => {
    const newTodo: TodoItemType = {
      title,
      isCompleted: false,
      id: String(Math.random() * 1000),
    };

    setTodos((prev) => [...prev, newTodo]);
    setTitle("");
  };
  return (
    <Container maxWidth="sm" sx={{ height: "100vh" }}>
      <AppBar position="static">
        <Typography>Todo App</Typography>
      </AppBar>
      <Stack height={"80%"} direction={"column"} spacing={"1rem"} p={"1rem"}>
        {todos.map((i) => (
          <TodoItem
            deleteHandler={deleteHandler}
            completeHandler={completeHandler}
            editHandler={editHandler}
            key={i.id}
            todo={i}
          />
        ))}
      </Stack>
      <TextField
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        label={"New Task"}
        onKeyDown={(e) => {
          if (e.key === "Enter" && title !== "") submitHandler();
        }}
      />
      <Button
        onClick={submitHandler}
        variant="contained"
        fullWidth
        sx={{
          margin: "1rem 0",
        }}
        disabled={title === ""}
      >
        Add
      </Button>
    </Container>
  );
};

export default App;
