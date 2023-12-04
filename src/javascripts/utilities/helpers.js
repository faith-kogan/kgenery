import { WINDOW } from "./env";

export const getDimensions = () => ({
  height: WINDOW.innerHeight,
  width: WINDOW.innerWidth,
});

export default getDimensions;
