import { ReactElement, useState } from "react";
import Main from "../Main/Main";
import PaymentSearch from "../Search/PaymentSearch";
import { Button } from "antd";
import PaymentModal from "../Modal/PaymentModal";
import { DataType, initialPaymentData } from "../../data/data";

export const App = (): ReactElement => {
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [paymentData, setPaymentData] =
    useState<DataType[]>(initialPaymentData);

  return (
    <>
      <Button
        type="primary"
        onClick={() => {
          setOpenModal(true);
        }}
      >
        Добавить новый платеж
      </Button>
      <PaymentSearch search={search} setSearch={setSearch} />
      <Main search={search} paymentData={paymentData} setPaymentData={setPaymentData}/>

      <PaymentModal
        open={openModal}
        setOpenModal={setOpenModal}
        onSave={(payment) => setPaymentData([...paymentData, payment])}
      />
    </>
  );
};
