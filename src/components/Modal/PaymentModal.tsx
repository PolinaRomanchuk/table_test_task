import { DatePicker, Form, FormProps, Input, Modal } from "antd";
import { ReactElement } from "react";
import type { Dayjs } from "dayjs";
import { DataType } from "../../data/data";

type PaymentModalProps = {
  open: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  onSave: (payment: DataType) => void;
};

type FieldType = {
  name: string;
  money: number;
  date: Dayjs;
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
  errorInfo
) => {};

const PaymentModal = ({
  open,
  setOpenModal,
  onSave,
}: PaymentModalProps): ReactElement => {
  const [form] = Form.useForm();

  const handleFinish = (values: FieldType) => {
    onSave({
      key: Date.now().toString(),
      name: values.name,
      money: values.money,
      date: values.date.toDate(),
    });
    setOpenModal(false);
    form.resetFields();
  };

  return (
    <>
      <Modal
        open={open}
        title="Новый платеж"
        onCancel={() => {
          setOpenModal(false);
        }}
        okText="Создать"
        cancelText="Отмена"
        onOk={() => {
          form.submit();
        }}
      >
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 20 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={handleFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Платеж"
            name="name"
            rules={[{ required: true, message: "Пожалуйста, заполните поле" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Cумма"
            name="money"
            rules={[{ required: true, message: "Пожалуйста, заполните поле" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Дата платежа"
            name="date"
            rules={[{ required: true, message: "Пожалуйста, выберите дату" }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default PaymentModal;
