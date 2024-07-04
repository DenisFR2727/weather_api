import Thermometer from "react-thermometer-component";

import "./thermometer.scss";
interface ThermometerProps {
  temp_c: number | undefined | null;
  theme?: "dark" | "light" | "small";
}
const ThermometerWeather: React.FC<ThermometerProps> = ({
  temp_c,
  theme = "dark",
}: ThermometerProps) => {
  return (
    <Thermometer
      theme={theme}
      value={temp_c}
      max="60"
      steps="6"
      format="°C"
      size="small"
      height="300"
    />
  );
};
export default ThermometerWeather;
