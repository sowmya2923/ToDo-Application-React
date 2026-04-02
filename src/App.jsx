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
    position: "relative",
    overflow: "hidden",
  },
  orb: {
    position: "absolute",
    top: "-80px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "420px",
    height: "420px",
    background: "radial-gradient(circle, rgba(255,107,53,0.13) 0%, transparent 70%)",
    pointerEvents: "none",
  },
  card: {
    background: "#1a1828",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: "24px",
    padding: "44px 38px",
    width: "100%",
    maxWidth: "460px",
    position: "relative",
    boxShadow: "0 32px 80px rgba(0,0,0,0.6)",
  },
  headerRow: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "6px",
  },
  icon: {
    width: "36px",
    height: "36px",
    background: "linear-gradient(135deg, #ff6b35, #f7c59f)",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "16px",
    flexShrink: 0,
  },
  title: {
    fontFamily: "'Syne', sans-serif",
    fontSize: "26px",
    fontWeight: 800,
    color: "#fffffe",
    margin: 0,
    letterSpacing: "-0.5px",
    flex: 1,
  },
  countPill: {
    background: "rgba(255,107,53,0.15)",
    border: "1px solid rgba(255,107,53,0.25)",
    color: "#ff6b35",
    fontSize: "11px",
    fontWeight: 500,
    borderRadius: "20px",
    padding: "3px 10px",
  },
  subtitle: {
    fontSize: "13px",
    color: "#6e6b8a",
    margin: "0 0 28px",
    paddingLeft: "48px",
  },
  divider: {
    height: "1px",
    background: "linear-gradient(90deg, rgba(255,107,53,0.3), transparent)",
    marginBottom: "28px",
  },
  inputRow: {
    display: "flex",
    gap: "10px",
    marginBottom: "28px",
  },
  input: {
    flex: 1,
    background: "#211f35",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "14px",
    padding: "13px 18px",
    fontSize: "14px",
    color: "#fffffe",
    fontFamily: "'DM Sans', sans-serif",
    outline: "none",
  },
  addBtn: {
    background: "linear-gradient(135deg, #ff6b35, #e85c27)",
    border: "none",
    borderRadius: "14px",
    padding: "13px 22px",
    color: "#fff",
    fontSize: "14px",
    fontWeight: 500,
    fontFamily: "'DM Sans', sans-serif",
    cursor: "pointer",
    whiteSpace: "nowrap",
    boxShadow: "0 4px 20px rgba(255,107,53,0.3)",
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
    gap: "12px",
    background: "#211f35",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: "14px",
    padding: "15px 18px",
  },
  dot: {
    width: "7px",
    height: "7px",
    borderRadius: "50%",
    background: "#ff6b35",
    flexShrink: 0,
    opacity: 0.7,
  },
  taskText: {
    fontSize: "14px",
    color: "#ccc9e8",
    flex: 1,
  },
  deleteBtn: {
    background: "rgba(229,49,112,0.1)",
    border: "1px solid rgba(229,49,112,0.2)",
    borderRadius: "9px",
    padding: "6px 13px",
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
    padding: "32px 0 8px",
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
        <div style={styles.orb} />
        <div style={styles.card}>
          <div style={styles.headerRow}>
            <div style={styles.icon}>✓</div>
            <h2 style={styles.title}>My To-Do List</h2>
            <span style={styles.countPill}>
              {tasks.length} {tasks.length === 1 ? "task" : "tasks"}
            </span>
          </div>
          <p style={styles.subtitle}>Organize your day, one task at a time</p>
          <div style={styles.divider} />

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
              + Add Task
            </button>
          </div>

          {tasks.length === 0 ? (
            <div style={styles.emptyState}>
              <div style={{ fontSize: "28px", marginBottom: "8px", opacity: 0.4 }}>📋</div>
              <div>No tasks yet — add one above!</div>
            </div>
          ) : (
            <ul style={styles.list}>
              {tasks.map((t, index) => (
                <li key={index} style={styles.listItem}>
                  <div style={styles.dot} />
                  <span style={styles.taskText}>{t}</span>
                  <button style={styles.deleteBtn} onClick={() => deleteTask(index)}>
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