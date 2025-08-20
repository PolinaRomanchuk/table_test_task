import { Input } from "antd";
const { Search } = Input;

import { ReactElement } from "react";

type PaymentSearchProps = {
  search: string;
  setSearch: (value: string) => void;
};

const PaymentSearch = ({
  setSearch,
}: PaymentSearchProps): ReactElement => {
  return (
    <>
      <Search
        placeholder="что вы хотели бы найти"
        allowClear
        onChange={(e) => setSearch(e.target.value)}
      />
    </>
  );
};

export default PaymentSearch;
