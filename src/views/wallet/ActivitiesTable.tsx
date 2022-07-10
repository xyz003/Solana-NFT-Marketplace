import React, { useEffect, useState } from "react"
import { Column, usePagination, useTable } from "react-table"
import { Table } from "../../components/Table"
import { useWallet } from "../../contexts"
import { CSVLink, CSVDownload } from "react-csv"
import {
  useWalletBuyActivitiesQuery,
  useWalletSellActivitiesQuery,
} from "../../generated/graphql"
import { dayDifference } from "../../utils"

type Props = {
  key: string
}

type Data = {
  collection: any
  contract: any
  type: any
  epoch: any
  price: any
  mint: any
  buyer: any
  seller: any
  tags: any
}

function ActivitiesTable({ key }: Props) {
  const { wallet } = useWallet()
  // @ts-ignore

  console.log("KEY IS", wallet?.publicKey?.toString())

  // const keyi = "xvDGmFrXL5CCdo5Vr1fb4tUKfSqzUKgpPb3nrH2gzLW"

  const {
    data: sellActivity,
    refetch,
    error,
    loading,
  } = useWalletSellActivitiesQuery({
    variables: { id: wallet?.publicKey?.toString() },
  })
  const {
    data: buyActivity,
    refetch: refetchActivity,
    error: buyError,
    loading: loadingBuy,
  } = useWalletBuyActivitiesQuery({
    variables: { id: wallet?.publicKey?.toString() },
  })

  const [mergedArray, setMergedArray] = useState<Data[]>([])

  console.log("buysell", buyActivity, sellActivity)

  const columns = React.useMemo<Column<Data>[]>(
    () => [
      {
        Header: "Image",
        accessor: "tags",
        // Cell: ({value}) => <img src={value} alt="io" />
        Cell: ({ value }) => {
          console.log("val", value)

          if (value.length > 2) {
            // return value.length === 2 ? "yes" : "no"
            const url = JSON.parse(value)
            const urlJson = JSON.parse(url)
            console.log("value", urlJson)

            return <img src={urlJson?.image} alt="nft" />
          }
          return "N/A"
        },
      },
      {
        Header: "Name",
        accessor: "collection",
        maxWidth: 400,
        minWidth: 200,
        Cell: ({ value }) => {
          if (value.length > 2) {
            const url = JSON.parse(value)
            const urlJson = JSON.parse(url)
            console.log("value", urlJson)

            return urlJson?.name
          }

          return "N/A"
        },
      },
      {
        Header: "Transaction",
        accessor: "contract",
      },
      {
        Header: "Type",
        accessor: "type",
      },
      {
        Header: "Time",
        accessor: "epoch",
        maxWidth: 150,
        minWidth: 150,
        width: 150,
      },
      {
        Header: "Amount",
        accessor: "price",
        maxWidth: 150,
        minWidth: 150,
        width: 150,
      },
      {
        Header: "Mint ID",
        accessor: "mint",
      },

      {
        Header: "Buyer",
        accessor: "buyer",
      },

      {
        Header: "Seller",
        accessor: "seller",
      },
    ],
    []
  )

  useEffect(() => {
    if (
      sellActivity?.transactions !== undefined &&
      sellActivity?.transactions !== null &&
      buyActivity?.transactions !== undefined &&
      buyActivity?.transactions !== null
    ) {
      const { nodes: sellTransactions } = sellActivity.transactions
      const { nodes: buyTransactions } = buyActivity.transactions
      // @ts-ignore
      const merge = sellTransactions?.concat(buyTransactions)
      // @ts-ignore
      if (merge?.length > 0) {
        // @ts-ignore
        const sorted = merge.sort(
          // @ts-ignore
          (a, b) => parseFloat(b?.epoch) - parseFloat(a?.epoch)
        )
        // @ts-ignore
        setMergedArray(sorted)
      }
    }
  }, [sellActivity, buyActivity])

  const data = React.useMemo<Data[]>(() => {
    if (mergedArray.length > 0) {
      console.log("mr", mergedArray)

      // @ts-ignore

      const result = mergedArray.map((x) => ({
        collection: JSON.stringify(x.tags),
        contract: x?.contract,
        type: x?.type,
        epoch: `${dayDifference(x?.epoch)} days ago`,
        price: `${x?.price} SOL`,
        mint: x?.mint,
        buyer: x?.buyer,
        seller: x?.seller,
        tags: JSON.stringify(x.tags),
      }))
      return result
    }
    return []
  }, [mergedArray])

  const csvData = React.useMemo(() => {
    if (mergedArray.length > 0) {
      // @ts-ignore

      const result = mergedArray.map((x) => ({
        Name: JSON.parse(JSON.parse(JSON.stringify(x.tags)))?.name,
        image: JSON.parse(JSON.parse(JSON.stringify(x.tags)))?.image,
        Transaction: x?.contract,
        type: x?.type,
        time: `${dayDifference(x?.epoch)} days ago`,
        price: `${x?.price} SOL`,
        mint: x?.mint,
        buyer: x?.buyer,
        seller: x?.seller,
      }))
      return result
    }
    return []
  }, [mergedArray])

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable<Data>(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 5 },
    },
    usePagination
  )
  return (
    <div style={{ width: "inherit", overflowX: "scroll" }} className="mb-8">
      <div className="flex justify-end">
        <CSVLink
          className="text-blue-500 py-1 px-4 border-solid border border-white rounded mx-1"
          data={csvData}
        >
          Export
        </CSVLink>
      </div>
      <Table<Data>
        getTableProps={getTableProps}
        getTableBodyProps={getTableBodyProps}
        headerGroups={headerGroups}
        rows={page}
        prepareRow={prepareRow}
      />

      {page.length > 0 && (
        <div className="pagination mt-5 flex justify-between">
          <div>
            <button
              className="bg-[#1a1a1a] py-1 px-4 border-solid border border-white rounded mx-1"
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
            >
              {"<<"}
            </button>{" "}
            <button
              className="bg-[#1a1a1a] py-1 px-4 border-solid border border-white rounded mx-1"
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
            >
              {"<"}
            </button>{" "}
            <button
              className="bg-[#1a1a1a] py-1 px-4 border-solid border border-white rounded mx-1"
              onClick={() => nextPage()}
              disabled={!canNextPage}
            >
              {">"}
            </button>{" "}
            <button
              className="bg-[#1a1a1a] py-1 px-4 border-solid border border-white rounded mx-1"
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            >
              {">>"}
            </button>{" "}
            <span>
              Page
              <strong>
                {pageIndex + 1} of {pageOptions?.length}
              </strong>{" "}
            </span>
            <span>
              | Go to page:{" "}
              <input
                className="bg-[#1a1a1a] py-1 px-4 border-solid border border-white rounded mx-1 outline-none"
                type="number"
                defaultValue={pageIndex + 1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0
                  gotoPage(page)
                }}
                style={{ width: "100px", backgroundColor: "transparent" }}
              />
            </span>{" "}
          </div>

          <select
            style={{ width: "100px", backgroundColor: "black" }}
            className="bg-[#1a1a1a] py-1 px-4 border-solid border border-white rounded mx-1 outline-none"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value))
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  )
}

export default ActivitiesTable
