import { globalStyles } from "@/styles/global";
import { Link } from "expo-router";
import { Pressable, Text, TextInput, View } from "react-native";

const Register = () => {
  return (
    <View style={globalStyles.container}>
        <View style={globalStyles.center}>
            <View style={globalStyles.auth}>
                <Text style={globalStyles.title}>Register</Text>
                <TextInput placeholder="Email" style={globalStyles.input} />
                <TextInput placeholder="Password" style={globalStyles.input} secureTextEntry />
                <TextInput placeholder="Confirm Password" style={globalStyles.input} secureTextEntry />
                <Pressable style={globalStyles.button} onPress={() => {}}>
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