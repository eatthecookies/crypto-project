import { Spin, Table, Typography } from "antd";
import { useState } from "react";
import type { TableColumnsType } from "antd";
import { useQuery } from "@tanstack/react-query";
import { LoadingOutlined } from "@ant-design/icons";
import { CryptoDataType } from "./types.ts";
import { fetchData, transformData } from "./functions.ts";
import { Select } from "antd";
import { Button } from "antd";
import styles from "./CurrencyTable.module.css";

const columns: TableColumnsType<CryptoDataType> = [
  {
    title: "№",
    dataIndex: "key",
    key: "key",
  },
  {
    title: "Логотип",
    dataIndex: "logo",
    key: "logo",
    render: (logo: string) => (
      <img src={logo} alt="Logo" style={{ width: "20px" }} />
    ),
  },
  {
    title: "Название",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Тикер",
    dataIndex: "symbol",
    key: "symbol",
  },
  {
    title: "Цена",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Изменение (24ч)",
    dataIndex: "priceChange",
    key: "priceChange",
  },
  {
    title: "Капитализация",
    dataIndex: "marketCap",
    key: "marketCap",
  },
  {
    title: "Объем торгов (24ч)",
    dataIndex: "volume",
    key: "volume",
  },
];

export default function CurrencyTable() {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("market_cap_desc");

  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["currencies", page, sort],
    queryFn: () => fetchData(page, sort),
  });

  if (isError) {
    return <div>Ошибка: {error.toString()}</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.sort}>
        <Typography>Сортировка</Typography>
        <Select
          defaultValue={sort}
          style={{ width: 320 }}
          onChange={(value) => setSort(value)}
          options={[
            { value: "market_cap_asc", label: "По возрастанию market_cap" },
            { value: "market_cap_desc", label: "По убыванию market_cap" },
            { value: "volume_asc", label: "По возрастанию volume" },
            { value: "volume_desc", label: "По убыванию volume" },
            { value: "id_asc", label: "По возрастанию id" },
            { value: "id_desc", label: "По убыванию id" },
          ]}
        />
      </div>

      {isLoading ? (
        <Spin
          className={styles.loading}
          indicator={<LoadingOutlined style={{ fontSize: 56 }} spin />}
        />
      ) : (
        <Table<CryptoDataType>
          className={styles.table}
          columns={columns}
          dataSource={transformData(data)}
          pagination={{
            current: page,
            pageSize: 10,
            showSizeChanger: false,
            hideOnSinglePage: true,
          }}
          size="small"
          tableLayout="fixed"
        />
      )}

      <div className={styles.pagination}>
        <Button size="large" onClick={() => page > 1 && setPage(page - 1)}>
          -
        </Button>
        <Typography>{page}</Typography>
        <Button size="large" onClick={() => setPage(page + 1)}>
          +
        </Button>
      </div>
    </div>
  );
}
