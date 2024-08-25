import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  Switch,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const addTask = () => {
    if (title.trim()) {
      setTasks([...tasks, { title, status: false }]);
      setTitle(""); // Clear input after adding
    }
  };

  const toggleStatus = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, status: !task.status } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    const filteredTasks = tasks.filter((_, i) => i !== index);
    setTasks(filteredTasks);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>ToDo App</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Task Title"
          value={title}
          onChangeText={setTitle}
        />
        <Button title="Add Task" onPress={addTask} disabled={!title.trim()} />
      </View>
      <FlatList
        data={tasks}
        renderItem={({ item, index }) => (
          <View style={styles.taskCard}>
            <Text style={styles.taskText}>{item.title}</Text>
            <Switch
              value={item.status}
              onValueChange={() => toggleStatus(index)}
            />
            <TouchableOpacity onPress={() => deleteTask(index)}>
              <Text style={styles.deleteText}>🗑️</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderColor: "#ced4da",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  taskCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderRadius: 5,
    backgroundColor: "#ffffff",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  taskText: {
    flex: 1,
    fontSize: 16,
  },
  deleteText: {
    color: "red",
    fontSize: 18,
    marginLeft: 10,
  },
});
