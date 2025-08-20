import { ReactElement } from "react";
import { Button, Space, Table, TableProps } from "antd";
import { paymentData, DataType } from "../../data/data";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

export const columns: TableProps<DataType>["columns"] = [
  {
    title: "Платеж",
    dataIndex: "name",
    key: "name",
    sorter: (a, b) => a.name.localeCompare(b.name, "ru"),
    sortDirections: ["ascend", "descend"],
  },
  {
    title: "Сумма (BYN)",
    dataIndex: "money",
    key: "money",
    sorter: (a, b) => a.money - b.money,
    sortDirections: ["ascend", "descend"],
  },
  {
    title: "Дата платежа",
    dataIndex: "date",
    key: "date",
    sorter: (a, b) => a.date.getTime() - b.date.getTime(),
    sortDirections: ["ascend", "descend"],
    render: (date: Date) => date.toLocaleDateString("ru-RU"),
  },
  {
    title: "Действия",
    key: "action",
    render: () => (
      <>
        <Space>
          <Button shape="circle" icon={<EditOutlined />} />
          <Button type="primary" shape="circle" icon={<DeleteOutlined />} />
        </Space>
      </>
    ),
  },
];

type MainProps = {
  search: string;
};

const Main = ({ search }: MainProps): ReactElement => {
  const filteredData = paymentData.filter((item) => {
    const searchLowerCase = search.toLowerCase();
    return (
      item.name.toLowerCase().includes(searchLowerCase) ||
      item.money.toString().includes(searchLowerCase) ||
      item.date.toLocaleDateString("ru-RU").includes(searchLowerCase)
    );
  });

  return (
    <>
      <Table<DataType>
        columns={columns}
        dataSource={filteredData}
        pagination={false}
        showSorterTooltip={{
          target: "sorter-icon",
          title: "Нажмите для сортировки",
        }}
      />
    </>
  );
};

export default Main;
