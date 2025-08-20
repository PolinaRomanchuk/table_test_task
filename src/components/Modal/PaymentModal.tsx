import { DatePicker, Form, FormProps, Input, Modal, notification } from "antd";
import { ReactElement, useEffect } from "react";
import type { Dayjs } from "dayjs";
import { DataType } from "../../data/data";
import dayjs from "dayjs";

type PaymentModalProps = {
  open: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  onSave: (payment: DataType) => void;
  editingPayment?: DataType | null;
  setEditingPayment: React.Dispatch<React.SetStateAction<DataType | null>>;
};

type FieldType = {
  name: string;
  money: number;
  date: Dayjs;
};

const PaymentModal = ({
  open,
  setOpenModal,
  onSave,
  editingPayment,
  setEditingPayment,
}: PaymentModalProps): ReactElement => {
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();

  const handleFinish = (values: FieldType) => {
    const payment: DataType = {
      key: editingPayment ? editingPayment.key : Date.now().toString(),
      name: values.name,
      money: values.money,
      date: values.date.toDate(),
    };
    onSave(payment);
    setOpenModal(false);
    form.resetFields();
    api.success({
      message: "Успех",
      description: editingPayment
        ? "Платеж успешно обновлен"
        : "Платеж успешно создан",
    });
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = () => {
    api.error({
      message: "Ошибка",
      description: "Что-то пошло не так",
    });
  };

  useEffect(() => {
    if (editingPayment) {
      form.setFieldsValue({
        name: editingPayment.name,
        money: editingPayment.money,
        date: editingPayment.date ? dayjs(editingPayment.date) : null,
      });
    } else {
      form.resetFields();
    }
  }, [editingPayment, form, open]);

  return (
    <>
      {contextHolder}
      <Modal
        open={open}
        title={editingPayment ? "Редактировать платеж" : "Новый платеж"}
        onCancel={() => {
          setOpenModal(false);
          setEditingPayment(null);
          form.resetFields();
        }}
        okText={editingPayment ? "Сохранить" : "Создать"}
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
          initialValues={{ remember: false }}
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
