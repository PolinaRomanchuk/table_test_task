import { ReactElement } from "react";
import Image from "../../assets/test.jpg";

export const App = (): ReactElement => {
  return (
    <>
      Hello
      <img src={Image} alt="cat"/>
    </>
  );
};
