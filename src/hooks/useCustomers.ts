import { useEffect, useState } from "react"
import CustomerCollection from "../backend/database/CustomerCollection"
import Customer from "../core/Customer"
import CustomerRepository from "../core/CustomerRepository"
import useComponentsVisibility from "./useComponentsVisibility"

export default function useCustomers() {
  const repo: CustomerRepository = new CustomerCollection()

  const { isTableVisible, showForm, showTable } = useComponentsVisibility()

  const [customer, setCustomer] = useState<Customer>(Customer.empty())
  const [customers, setCustomers] = useState<Customer[]>([])


  useEffect(listAll, [])

  function listAll() {
    repo.listAll().then(customers => {
      setCustomers(customers)
      showTable()
    })
  }

  function selectCustomer(customer: Customer) {
    setCustomer(customer)
    showForm()
  }

  async function deleteCustomer(customer: Customer) {
    await repo.delete(customer)
    listAll()
  }

  async function saveCustomer(customer: Customer) {
    await repo.save(customer)
    listAll()
  }

  function newClient() {
    setCustomer(Customer.empty())
    showForm()
  }

  return {
    customer,
    customers,
    newClient,
    saveCustomer,
    deleteCustomer,
    selectCustomer,
    listAll,
    isTableVisible,
    showTable
  }
}