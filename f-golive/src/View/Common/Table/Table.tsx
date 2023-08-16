import React, { FunctionComponent, PropsWithChildren } from 'react'

export interface ITableProps extends PropsWithChildren { 
}

interface ITableComponents {
  Head: FunctionComponent<PropsWithChildren>
  Body: FunctionComponent<PropsWithChildren>
  Cell: FunctionComponent<PropsWithChildren>
  Row: FunctionComponent<{
    children: React.ReactElement<unknown, string | React.JSXElementConstructor<unknown>>[]
    onMouseEnter?: React.MouseEventHandler<HTMLTableRowElement>
  }>
  Footer: FunctionComponent<{ children: React.ReactElement<unknown, string | React.JSXElementConstructor<unknown>>[] }>
}

export const Table: FunctionComponent<ITableProps> & ITableComponents = ({ children }) => {
  return (
    <div className="overflow-x-auto w-full">
      <table className={'w-full table-fixed rounded-md'}>{children}</table>
    </div>
  )
}

Table.Head = ({ children }) => {
  return <thead className="">{children}</thead>
}

Table.Body = ({ children }) => {
  return <tbody className="">{children}</tbody>
}

Table.Row = ({ children, onMouseEnter }) => {
  return <tr onMouseEnter={onMouseEnter}>{children}</tr>
}

Table.Footer = ({ children }) => {
  return <tfoot>{children}</tfoot>
}

Table.Cell = ({ children }) => {
  return <td className="py-2 px-3">{children}</td>
}
