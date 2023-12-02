import type { NextPage } from 'next'
import Button from '../components/Button'
import Form from '../components/Form'
import Layout from '../components/Layout'
import Table from '../components/Table'
import useCustomers from '../hooks/useCustomers'

const Home: NextPage = () => {

  const {
    customer,
    customers,
    newClient,
    selectCustomer,
    deleteCustomer,
    saveCustomer,
    isTableVisible,
    showTable
  } = useCustomers()
  
  return (
    <div className={`
      flex justify-center items-center h-screen
      bg-gradient-to-r from-blue-500 to-purple-500
      text-white
    `}>

      <Layout title='Simple Registration' >
        {isTableVisible ?(
          <>
            <div className='flex justify-end'>
              <Button
                className='mb-4'
                color='blue'
                onClick={newClient}
              >
                New Client
              </Button>
            </div>

            <Table
              customer={customers}
              selectedCustomer={selectCustomer}
              deletedCustomer={deleteCustomer}
            />
          </>
        ): (
            <Form
              customer={customer}
              canceled={showTable}
              changedCustomer={saveCustomer}
            />
        )}
      </Layout>
    </div>
  )
}

export default Home
