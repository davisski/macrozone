import { globalStyles } from "@/styles/global";
import { Link } from "expo-router";
import { Pressable, Text, TextInput, View } from "react-native";

const Login = () => {
  return (
    <View style={globalStyles.container}>
        <View style={globalStyles.center}>
            <View style={globalStyles.auth}>
                <Text style={globalStyles.title}>Login</Text>
                <TextInput placeholder="Email" style={globalStyles.input} />
                <TextInput placeholder="Password" style={globalStyles.input} secureTextEntry />
                <Pressable style={globalStyles.button} onPress={() => {}}>
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
