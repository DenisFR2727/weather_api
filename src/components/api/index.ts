import configuration from "../../configuration";
interface WeatherFetchProps {
  location: string;
}
export async function WeatherFetch<T>({
  location,
}: WeatherFetchProps): Promise<T> {
  try {
    const url = `https://api.weatherapi.com/v1/current.json?key=${configuration.apiToken}&q=${location}&aqi=no`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch data from the server, status: ${response.status}`
      );
    }
    const data = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
export async function AstronomyFetch<T>({
  location,
}: WeatherFetchProps): Promise<T> {
  try {
    const url = `https://api.weatherapi.com/v1/astronomy.json?key=${configuration.apiToken}&q=${location}&aqi=no`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch data from the server, status: ${response.status}`
      );
    }
    const data = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
