import { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function Home() {
  /*
   * On this page will be a Todo list
   * The user will be able to add, edit and delete todos
   * The user will be able to mark todos as complete
   * The user will be able to filter todos by complete and incomplete
   * Each Todos can have a category that can later be used to filter
   */

  // State
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [filter, setFilter] = useState("all");

  // isEditable
  // takes in the id of the todo
  const [isEditable, setIsEditable] = useState(null);

  // Functions
  const addTodo = () => {
    const randomId = Math.floor(Math.random() * 10000000);
    if (todo) {
      setTodos([...todos, { id: randomId, todo, complete: false }]);
      setTodo("");
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          todo.complete = !todo.complete;
        }
        return todo;
      })
    );
  };

  const editTodo = (id) => {
    setIsEditable(id);
  };

  const filterTodos = (filter) => {
    switch (filter) {
      case "complete":
        return todos.filter((todo) => todo.complete);
      case "incomplete":
        return todos.filter((todo) => !todo.complete);
      default:
        return todos;
    }
  };

  const saveTodos = async () => {
    try {
      await AsyncStorage.setItem("todos", JSON.stringify(todos));
    } catch (error) {
      console.log(error);
    }
  };

  const getTodos = async () => {
    try {
      const todos = await AsyncStorage.getItem("todos");
      if (todos) {
        setTodos(JSON.parse(todos));
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Effects
  useEffect(() => {
    getTodos();
  }, []);

  useEffect(() => {
    saveTodos();
  }, [todos]);

  return (
    <View style={styles.container}>
      <Pressable onPress={() => setIsEditable(null)}>
        <Text style={styles.title}>Todo List</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Add a todo"
            value={todo}
            onChangeText={(text) => setTodo(text)}
          />
          <Pressable onPress={addTodo} style={styles.button}>
            <Text style={styles.buttonText}>Add</Text>
          </Pressable>
        </View>
        <View style={styles.filterContainer}>
          <Pressable
            onPress={() => setFilter("all")}
            style={styles.filterButton}
          >
            <Text
              style={[
                styles.filterText,
                filter === "all" && styles.filterTextActive,
              ]}
            >
              All
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setFilter("complete")}
            style={styles.filterButton}
          >
            <Text
              style={[
                styles.filterText,
                filter === "complete" && styles.filterTextActive,
              ]}
            >
              Complete
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setFilter("incomplete")}
            style={styles.filterButton}
          >
            <Text
              style={[
                styles.filterText,
                filter === "incomplete" && styles.filterTextActive,
              ]}
            >
              Incomplete
            </Text>
          </Pressable>
        </View>
        <View style={styles.todosContainer}>
          {filterTodos(filter).map((todo) => (
            // If todo is complete, add a line through it
            // If a todo is pressed, make it editable
            // If a todo is editable, add a save button
            // each todo has a ❌ button to delete it and a ✅ button to mark it as complete
            // using isEditable state, make the todo editable
            <View key={todo.id} style={styles.todoContainer}>
              <Pressable onPress={() => editTodo(todo.id)}>
                {isEditable === todo.id ? (
                  <TextInput
                    style={styles.input}
                    value={todo.todo}
                    //once the user is done editing, save the todo and reset the isEditable state
                    onBlur={() => {
                      setIsEditable(null);
                    }}
                    onChangeText={
                      // prevent the old todo from being updated
                      (text) => {
                        setTodos(
                          todos.map((todo) => {
                            if (todo.id === isEditable) {
                              todo.todo = text;
                            }
                            return todo;
                          })
                        );
                      }
                    }
                  />
                ) : (
                  <Text
                    style={[
                      styles.todoText,
                      todo.complete && styles.todoTextComplete,
                    ]}
                  >
                    {todo.todo}
                  </Text>
                )}
              </Pressable>
              <Pressable onPress={() => deleteTodo(todo.id)}>
                <Text style={styles.deleteText}>❌</Text>
              </Pressable>
              <Pressable onPress={() => toggleComplete(todo.id)}>
                <Text style={styles.editText}>✅</Text>
              </Pressable>
            </View>
          ))}
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  input: {
    width: 200,
    height: 40,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  button: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
  },
  filterContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  filterButton: {
    padding: 10,
    marginRight: 10,
  },
  filterText: {
    color: "black",
  },
  filterTextActive: {
    color: "blue",
  },
  todosContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  todoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  todoText: {
    fontSize: 20,
    marginRight: 10,
  },
  todoTextComplete: {
    textDecorationLine: "line-through",
  },
  deleteText: {
    fontSize: 20,
    marginRight: 10,
    color: "red",
  },
  editText: {
    fontSize: 20,
    marginRight: 10,
    color: "green",
  },
});
