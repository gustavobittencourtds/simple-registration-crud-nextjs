import Customer from "../core/Customer"
import { EditIcon, trashIcon } from "./Icons"

interface TableProps {
  customer: Customer[]
  selectedCustomer?: (customer: Customer) => void
  deletedCustomer?: (customer: Customer) => void
}

export default function Table(props: TableProps) {

  const showActions = props.selectedCustomer || props.deletedCustomer

  function renderTablesHeader() {
    return (
      <tr>
        <th className="text-left p-4">Código</th>
        <th className="text-left p-4">Nome</th>
        <th className="text-left p-4">Idade</th>
        { showActions ? <th className="text-center p-4">Ações</th> : false }
        
      </tr>
    )
  }

  function renderTableData() {
    return props.customer?.map((customer, index) => {
      return (
        <tr
          key={customer.id}
          className={`${index % 2 == 0 ? 'bg-purple-200' : 'bg-purple-100'}`}
        >
          <td className="text-left p-4">{customer.id}</td>
          <td className="text-left p-4">{customer.name}</td>
          <td className="text-left p-4">{customer.age}</td>

          { showActions ? renderActions(customer) : false }
        </tr>
      )
    })
  }

  function renderActions(customer: Customer) {
    return (
      <td className="flex justify-center ">

        { props.selectedCustomer ? (
          <button
            data-testid="edit-button"
            className={`
            flex justify-center items-center
            text-green-600 rounded-full p-2 m-1
            hover:bg-purple-50
          `}
            onClick={()=> props.selectedCustomer?.(customer)}
          >
            {EditIcon}
          </button>
        ): false }
        
        { props.deletedCustomer ? (
          <button
            data-testid="delete-button"
            className={`
            flex justify-center items-center
            text-red-500 rounded-full p-2 m-1
            hover:bg-purple-50
          `}
            onClick={() => props.deletedCustomer?.(customer)}
          >
            {trashIcon}
          </button>
        ) : false }

      </td>
    )
  }

  return (
    <table
      data-testid="table-element"
      className="w-full rounded-xl overflow-hidden">
      <thead className={`
        text-gray-100
        bg-gradient-to-r from-purple-500 to-purple-800
      `}>
        {renderTablesHeader()}
      </thead>
      <tbody data-testid="tbody-element">
        {renderTableData()}
      </tbody>
    </table>
  )
}