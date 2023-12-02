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

  // const _ESLintUnderscore = "teste"; // ESLint - no-underscore-dangle
  // const no_use_camelcase = "CamelCase não utilizado"; // ESLint - camelcase

  // const uselessVariable = "variável sem utilização"; // ESLint - no-unused-vars

  useEffect(listAll, []) // ESLint - exhaustive-deps - React

  function listAll() {
    repo.listAll().then(customers => {
      setCustomers(customers)
      showTable()

      // console.log('Teste regra de consoles com ESLint'); // ESLint - no-console
      // alert('Teste regra de Alerts com ESLint'); // ESLint - no-alert
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