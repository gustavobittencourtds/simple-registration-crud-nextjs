import { useState } from "react";
import Customer from "../core/Customer";
import Button from "./Button";
import Input from "./Input";

interface FormProps {
  customer: Customer
  changedCustomer?: (customer: Customer) => void
  canceled?: () => void
}

export default function Form(props: FormProps) {
  const id = props.customer?.id

  const [name, setName] = useState(props.customer?.name ?? '') //usar o tipo do nome do cliente ou string por padrão
  const [age, setAge] = useState(props.customer?.age ?? 0) //usar o tipo da idade do cliente ou zero por padrão

  return (
    <div data-testid="form-element">
      {id ? (
        <Input text="Código" value={id} readOnly className="mb-5" />
      ): false }

      <Input text="Name" value={name} onValueChange={setName} className="mb-5" />
      <Input text="Age" value={age} type="number" onValueChange={setAge} />

      <div className="flex justify-end mt-7">
        <Button
          color="blue"
          className="mr-2"
          onClick={()=> props.changedCustomer?.(new Customer(name, +age, id))}
          disabled={name === '' ? true : false }
        >
          {id ? 'Alterar' : 'Salvar' }
        </Button>

        <Button
          onClick={props.canceled}
          color="gray">
          Cancelar
        </Button>
      </div>
    </div>
  )
}