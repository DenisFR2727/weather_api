import Thermometer from "react-thermometer-component";

interface ThermometerProps {
  temp_c: number | undefined | null;
}
const ThermometerWeather = ({ temp_c }: ThermometerProps) => {
  return (
    <Thermometer
      theme="light"
      value={temp_c}
      max="60"
      steps="3"
      format="°C"
      size="small"
      height="300"
    />
  );
};
export default ThermometerWeather;
