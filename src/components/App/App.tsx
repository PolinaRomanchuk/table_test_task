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
  const [editingPayment, setEditingPayment] = useState<DataType | null>(null);

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
      <Main
        search={search}
        paymentData={paymentData}
        setPaymentData={setPaymentData}
        setEditingPayment={setEditingPayment}
        setOpenModal={setOpenModal}
      />

      <PaymentModal
        open={openModal}
        setOpenModal={setOpenModal}
        editingPayment={editingPayment}
        onSave={(payment) => {
          if (editingPayment) {
            setPaymentData((prev) =>
              prev.map((p) => (p.key === payment.key ? payment : p))
            );
            setEditingPayment(null);
          } else {
            setPaymentData([...paymentData, payment]);
          }
        }}
        setEditingPayment={setEditingPayment}
      />
    </>
  );
};
