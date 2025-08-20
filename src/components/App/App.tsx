import { ReactElement, useState } from "react";
import Main from "../Main/Main";
import PaymentSearch from "../Search/PaymentSearch";

export const App = (): ReactElement => {
  const [search, setSearch] = useState("");

  return (
    <>
      <PaymentSearch search={search} setSearch={setSearch} />
      <Main search={search}  />
    </>
  );
};
