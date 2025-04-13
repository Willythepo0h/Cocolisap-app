import { Stack } from "expo-router";
import { AuthProvider } from "@/context/AuthContext";
import { ResultsProvider } from "@/context/resultContext";
import { CameraImageProvider } from "@/context/CameraImageContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <ResultsProvider>
        <CameraImageProvider>
          <Stack>
              <Stack.Screen name="auth/index" options={{ headerShown: false }} />
              <Stack.Screen name="employee-tabs" options={{ headerShown: false }} />
              <Stack.Screen name="nonemployee-tabs" options={{ headerShown: false }} />
          </Stack>
        </CameraImageProvider>
      </ResultsProvider>
    </AuthProvider>
  )
}
