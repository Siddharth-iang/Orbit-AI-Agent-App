import { Text, View, Platform, Image, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native";
export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        paddingTop: Platform.OS == 'android' ? 30 : 40,
        backgroundColor: '#fff'
      }}
    >
      <Image source={ require('../assets/images/ai.png')}
        style={{
          width: "100%",
          height: 550,
          resizeMode: "cover"
        }}
      />

      <View style={{ position: 'absolute', bottom: 50, left: 20, right: 20, top: 450}}>
        <Text style={{ fontSize: 35, fontWeight: "bold", marginBottom: 10, textAlign: "center", color: "#3692ff" }}>Welcome to Orbit AI</Text>
        <Text style={{ fontSize: 16, textAlign: "center", color: "#3692ff", marginTop: 20 }}>Your Ultimate AI Personal Agent to make life easier. Try it today for Completely Free!</Text>

        <TouchableOpacity>
          <Text style={{ fontSize: 16, textAlign: "center", color: "#fff", padding: 12, marginTop: 50, backgroundColor: "#3692ff", borderRadius: 12, width: "100%" }}>Get Started</Text>
        </TouchableOpacity>

        <Text style={{ fontSize: 16, textAlign: "center", color: "#3692ff", marginTop: 20 }}>By clicking Get Started, you agree to our Terms of Service and Privacy Policy.</Text>
      </View>
    </View>
  );
}
