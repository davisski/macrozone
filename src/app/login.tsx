import { login } from "@/storage/auth";
import { useStore } from "@/storage/store";
import { globalStyles } from "@/styles/global";
import { Link } from "expo-router";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

const Login = () => {
  const { setUser, setIsAuthenticated } = useStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    login(email, password)
      .then(({ user }) => {
        setUser(user);
        setIsAuthenticated(true);
      })
      .catch((error) => {
        console.error("Login error:", error);
      });
  };

  return (
    <View style={globalStyles.container}>
        <View style={globalStyles.center}>
            <View style={globalStyles.auth}>
                <Text style={globalStyles.title}>Login</Text>
                <TextInput placeholder="Email" style={globalStyles.input} onChangeText={setEmail} />
                <TextInput placeholder="Password" style={globalStyles.input} secureTextEntry onChangeText={setPassword} />
                <Pressable style={globalStyles.button} onPress={handleLogin}>
                    <Text style={globalStyles.buttonText}>Login</Text>
                </Pressable>

                <View>
                    <Text style={globalStyles.text}>Don't have an account? <Link href="/register" style={globalStyles.link}>Sign up</Link></Text>
                </View>
            </View>
        </View>
    </View>
  )
}

export default Login;
