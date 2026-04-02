import React, { useState, useEffect } from "react";

const styles = {
  wrapper: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#0f0e17",
    padding: "24px",
    fontFamily: "'DM Sans', sans-serif",
  },
  card: {
    background: "#1a1828",
    border: "0.5px solid rgba(255,255,255,0.08)",
    borderRadius: "20px",
    padding: "40px 36px",
    width: "100%",
    maxWidth: "440px",
  },
  title: {
    fontFamily: "'Syne', sans-serif",
    fontSize: "28px",
    fontWeight: 800,
    color: "#fffffe",
    margin: "0 0 6px",
    letterSpacing: "-0.5px",
  },
  subtitle: {
    fontSize: "13px",
    color: "#6e6b8a",
    margin: "0 0 28px",
  },
  badge: {
    display: "inline-block",
    background: "rgba(255,107,53,0.15)",
    color: "#ff6b35",
    fontSize: "11px",
    fontWeight: 500,
    borderRadius: "6px",
    padding: "2px 8px",
    marginLeft: "8px",
    verticalAlign: "middle",
  },
  inputRow: {
    display: "flex",
    gap: "10px",
    marginBottom: "28px",
  },
  input: {
    flex: 1,
    background: "#211f35",
    border: "0.5px solid rgba(255,255,255,0.1)",
    borderRadius: "12px",
    padding: "12px 16px",
    fontSize: "14px",
    color: "#fffffe",
    fontFamily: "'DM Sans', sans-serif",
    outline: "none",
  },
  addBtn: {
    background: "#ff6b35",
    border: "none",
    borderRadius: "12px",
    padding: "12px 20px",
    color: "#fff",
    fontSize: "14px",
    fontWeight: 500,
    fontFamily: "'DM Sans', sans-serif",
    cursor: "pointer",
    whiteSpace: "nowrap",
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  listItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: "#211f35",
    border: "0.5px solid rgba(255,255,255,0.07)",
    borderRadius: "12px",
    padding: "14px 16px",
  },
  taskText: {
    fontSize: "14px",
    color: "#d4d1f0",
    flex: 1,
  },
  deleteBtn: {
    background: "rgba(229,49,112,0.12)",
    border: "0.5px solid rgba(229,49,112,0.25)",
    borderRadius: "8px",
    padding: "6px 12px",
    color: "#e53170",
    fontSize: "12px",
    fontWeight: 500,
    fontFamily: "'DM Sans', sans-serif",
    cursor: "pointer",
    whiteSpace: "nowrap",
  },
  emptyState: {
    textAlign: "center",
    color: "#4e4b6a",
    fontSize: "13px",
    padding: "24px 0",
  },
};

function TodoApp() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (task.trim() === "") {
      alert("Enter a task");
      return;
    }
    setTasks([...tasks, task]);
    setTask("");
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500&display=swap"
        rel="stylesheet"
      />
      <div style={styles.wrapper}>
        <div style={styles.card}>
          <h2 style={styles.title}>
            My To-Do List
            <span style={styles.badge}>{tasks.length}</span>
          </h2>
          <p style={styles.subtitle}>Stay on top of your day</p>

          <div style={styles.inputRow}>
            <input
              style={styles.input}
              type="text"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTask()}
              placeholder="Enter a task..."
            />
            <button style={styles.addBtn} onClick={addTask}>
              + Add
            </button>
          </div>

          {tasks.length === 0 ? (
            <p style={styles.emptyState}>No tasks yet — add one above!</p>
          ) : (
            <ul style={styles.list}>
              {tasks.map((t, index) => (
                <li key={index} style={styles.listItem}>
                  <span style={styles.taskText}>{t}</span>
                  <button
                    style={styles.deleteBtn}
                    onClick={() => deleteTask(index)}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}

export default TodoApp;