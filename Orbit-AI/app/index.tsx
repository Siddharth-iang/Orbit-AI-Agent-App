import { Text, View, Platform, Image, Dimensions, TouchableOpacity } from "react-native";
import { useRouter } from 'expo-router'
import { useAuth, useUser } from '@clerk/clerk-expo'
import { useEffect, useCallback } from 'react'
import * as WebBrowser from 'expo-web-browser'
import * as AuthSession from 'expo-auth-session'
import { useSSO } from '@clerk/clerk-expo'

export const useWarmUpBrowser = () => {
  useEffect(() => {
    if (Platform.OS !== 'android') return
    void WebBrowser.warmUpAsync()
    return () => {
      // Cleanup: closes browser when component unmounts
      void WebBrowser.coolDownAsync()
    }
  }, [])
}

WebBrowser.maybeCompleteAuthSession()

export default function Index() {
  const router = useRouter()
  const { isSignedIn } = useAuth()
  const { user } = useUser();

  console.log(user?.primaryEmailAddress?.emailAddress)

  useEffect(() => {
    if (isSignedIn) {
      router.replace('/home')
    }
  }, [isSignedIn])

  useWarmUpBrowser()

  // Use the `useSSO()` hook to access the `startSSOFlow()` method
  const { startSSOFlow } = useSSO()

  const onLoginPress = useCallback(async () => {
    try {
      console.log('Login button pressed')
      const redirectUrl = AuthSession.makeRedirectUri()
      console.log('Redirect URL:', redirectUrl)

      // Start the authentication process by calling `startSSOFlow()`
      const { createdSessionId, setActive, signIn, signUp } = await startSSOFlow({
        strategy: 'oauth_google',
        redirectUrl,
      })
      console.log('SSO Flow completed, session:', createdSessionId)

      // If sign in was successful, set the active session
      if (createdSessionId) {
        setActive!({
          session: createdSessionId,
          // Check for session tasks and navigate to custom UI to help users resolve them
          // See https://clerk.com/docs/guides/development/custom-flows/overview#session-tasks
          navigate: async ({ session }) => {
            if (session?.currentTask) {
              console.log(session?.currentTask)
              router.push('/home')
              return
            }

            router.push('/')
          },
        })
      } else {
        // If there is no `createdSessionId`,
        // there are missing requirements, such as MFA
        // See https://clerk.com/docs/guides/development/custom-flows/authentication/oauth-connections#handle-missing-requirements
      }
    } catch (err) {
      // See https://clerk.com/docs/guides/development/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }, [])

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        paddingTop: Platform.OS == 'android' ? 30 : 40,
        backgroundColor: '#fff'
      }}
    >
      <Image source={require('../assets/images/ai.png')}
        style={{
          width: "100%",
          height: 550,
          resizeMode: "cover"
        }}
      />

      <View style={{ position: 'absolute', bottom: 50, left: 20, right: 20, top: 450 }}>
        <Text style={{ fontSize: 35, fontWeight: "bold", marginBottom: 10, textAlign: "center", color: "#3692ff" }}>Welcome to Orbit AI</Text>
        <Text style={{ fontSize: 16, textAlign: "center", color: "#3692ff", marginTop: 20 }}>Your Ultimate AI Personal Agent to make life easier. Try it today for Completely Free!</Text>

        <TouchableOpacity onPress={onLoginPress}>
          <Text style={{ fontSize: 16, textAlign: "center", color: "#fff", padding: 12, marginTop: 50, backgroundColor: "#3692ff", borderRadius: 12, width: "100%" }}>Get Started</Text>
        </TouchableOpacity>

        <Text style={{ fontSize: 16, textAlign: "center", color: "#3692ff", marginTop: 20 }}>By clicking Get Started, you agree to our Terms of Service and Privacy Policy.</Text>
      </View>
    </View>
  );
}
