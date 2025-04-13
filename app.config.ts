import 'dotenv/config';

export default {
  expo: {
    name: "Cocolisap-app",
    slug: "Cocolisap-app",
    version: "1.0.0",
    orientation: "portrait",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    icon: "./assets/images/icon.png",
    splash: {
      image: "./assets/images/splash-icon.png",
      imageWidth: 200,
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    ios: {
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff"
      }
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png"
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash-icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff"
        }
      ]
    ],
    experiments: {
      typedRoutes: true
    },
    extra: {
      AUTH_API_URL: process.env.AUTH_API_URL,
      FAST_API_URL: process.env.FAST_API_URL,
    }
  }
};

