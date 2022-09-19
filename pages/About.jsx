import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function About() {
  const buttonSize = 50;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About</Text>
      <Text style={styles.text}>
        This is a Todo app that I made to learn React Native.
      </Text>
      <View style={styles.linkContainer}>
        <Pressable
          style={styles.button}
          onPress={() => {
            Linking.openURL("https://github.com/setsudan/react-native-todo");
          }}
        >
          <Ionicons name="logo-github" size={buttonSize} color="black" />
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => {
            Linking.openURL("https://linkedin.com/in/ethlny");
          }}
        >
          <Ionicons name="logo-linkedin" size={buttonSize} color="black" />
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => {
            Linking.openURL("https://ethlny.vercel.app");
          }}
        >
          <Ionicons name="link-outline" size={buttonSize} color="black" />
        </Pressable>
      </View>
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
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
  button: {
    fontSize: 20,
    marginHorizontal: 10,
  },
  linkContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
});
