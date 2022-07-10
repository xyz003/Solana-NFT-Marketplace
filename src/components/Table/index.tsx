import React, { useState } from "react"
import { UseTableInstanceProps } from "react-table"

export interface TableNewProps<T extends object>
  extends Pick<
    UseTableInstanceProps<T>,
    | "getTableProps"
    | "headerGroups"
    | "getTableBodyProps"
    | "prepareRow"
    | "rows"
  > {}

export function Table<T extends object>(props: TableNewProps<T>) {
  const { getTableProps, headerGroups, getTableBodyProps, rows, prepareRow } =
    props

  return (
    <div>
      <table className="mt-8 w-full" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  className="text-blue-500 font-light text-left p-3"
                  {...column.getHeaderProps({
                    style: { minWidth: column.minWidth, width: column.width },
                  })}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      className="p-3 font-light text-left"
                      {...cell.getCellProps()}
                      style={{}}
                    >
                      {cell.render("Cell")}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      {rows.length === 0 && (
        <div className="w-full text-center">No Item Found</div>
      )}
    </div>
  )
}
