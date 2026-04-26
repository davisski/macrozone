import { register } from "@/storage/auth";
import { useStore } from "@/storage/store";
import { globalStyles } from "@/styles/global";
import { Link } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, Text, TextInput, View } from "react-native";

const Register = () => {
  const { setUser, setIsAuthenticated } = useStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = () => {

    if(!email){
        Alert.alert("Error", "Email is required");
        return;
    }else if(email.length && !/\S+@\S+\.\S+/.test(email)){
        Alert.alert("Error", "Email is invalid");
        return;
    }

    if(!password){
        Alert.alert("Error", "Password is required");
        return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }
    register(email, password)
      .then(({ user }) => {
        setUser(user);
        setIsAuthenticated(true);
      })
      .catch((error) => {
        console.error("Registration error:", error);
      });
  };

  return (
    <View style={globalStyles.container}>
        <View style={globalStyles.center}>
            <View style={globalStyles.auth}>
                <Text style={globalStyles.title}>Register</Text>
                <TextInput placeholder="Email" style={globalStyles.input} onChangeText={setEmail} />
                <TextInput placeholder="Password" style={globalStyles.input} secureTextEntry onChangeText={setPassword} />
                <TextInput placeholder="Confirm Password" style={globalStyles.input} secureTextEntry onChangeText={setConfirmPassword} />
                <Pressable style={globalStyles.button} onPress={handleRegister}>
                    <Text style={globalStyles.buttonText}>Register</Text>
                </Pressable>

                <View>
                    <Text style={globalStyles.text}>Already have an account? <Link href="/login" style={globalStyles.link}>Log in</Link></Text>
                </View>
            </View>
        </View>
    </View>
  )
}
export default Register;