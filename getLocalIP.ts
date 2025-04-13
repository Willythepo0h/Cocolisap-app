import * as Network from "expo-network";
import Constants from "expo-constants";

/**
 * Dynamically generates a local API URL based on current IP and specified port.
 * If an environment variable is set, it will use that instead.
 * 
 * @param port - The port your backend server is running on.
 * @param envKey - Optional: environment key in app config to use as override.
 * @returns Local network URL or override if defined.
 */
export const getLocalApiUrl = async (
  port: number,
  envKey?: string
): Promise<string> => {
  const envUrl = envKey ? Constants.expoConfig?.extra?.[envKey] : null;
  if (envUrl) return envUrl;

  try {
    const ip = await Network.getIpAddressAsync();
    return `http://${ip}:${port}`;
  } catch (error) {
    console.warn("Failed to get IP:", error);
    return `http://localhost:${port}`;
  }
};
