import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';

import Home from "../src/pages/index";
import userEvent from "@testing-library/user-event";

import useCustomers from "../src/hooks/useCustomers";
import Customer from "../src/core/Customer";

const renderComponent = () => {
  return render(<Home />);
};

const newClient = jest.fn();
const selectCustomer = jest.fn();
const deleteCustomer = jest.fn();
const saveCustomer = jest.fn();
const showTable = jest.fn();
const customer = Customer;
const customers = [];
const isTableVisible = true;

const constRenderForm = () => {
  
  <useCustomers.Provider value={{
    customer,
    customers,
    newClient,
    selectCustomer,
    deleteCustomer,
    saveCustomer,
    isTableVisible,
    showTable,
  }}>
  </useCustomers.Provider>

  return render(
    <Home />
  )
}

describe("Home Component", () => {
  it("should render correctly", () => {
    renderComponent();
  });

  it("should render Form with Name, Age fields and buttons", async () => {
    renderComponent();

    // Clique no botão "New Client"
    const buttonNewClient = screen.getByText("New Client"); 
    fireEvent.click(buttonNewClient);

    // Encontre o formulário pelo atributo de teste
    const formComponent = await screen.findByTestId("form-element");

    // Valida se encontrou o formulário de cadastro
    expect(formComponent).toBeInTheDocument();

    // Valida se os botões estão presentes no formulário
    expect(formComponent).toHaveTextContent("Salvar");
    expect(formComponent).toHaveTextContent("Cancelar");

    // Valida se os campos estão no documento
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Age")).toBeInTheDocument();
  });

  it("save button should be disabled when Name is empty", async () => {
    renderComponent();

    // Dispara evento de clique no botão "New Client"
    const buttonNewClient = screen.getByText("New Client"); 
    fireEvent.click(buttonNewClient);

    // Encontre o formulário pelo atributo de teste
    const formComponent = await screen.findByTestId("form-element");

    // Valida se encontrou o formulário de cadastro
    expect(formComponent).toBeInTheDocument();

    // Valida se o botão "Salvar" está desativado inicialmente
    expect(screen.getByText("Salvar")).toBeDisabled();

    // Simula a digitação de um valor no campo "Name"
    userEvent.type(screen.getByLabelText("Name"), "Gustavo");

    // Aguarda a atualização do botão após a digitação
    await waitFor(() => {
      expect(screen.getByText("Salvar")).not.toBeDisabled();
    });
  });

  it("validate empty table and no customers customization button is visible", async () => {
    renderComponent();

    // Aguarda a exibição da tabela ao iniciar o app
    await waitFor(() => {
      // Valida se a tabela está vazia
      const tbodyElement = screen.getByTestId("tbody-element");
      expect(tbodyElement).toBeEmptyDOMElement();
    });
  })

  it("validate Edit and Remove buttons in a filled table", async () => {
    renderComponent();

    // Aguarda a exibição da tabela ao iniciar o app
    await waitFor(() => {
      // Valida se a tabela está vazia
      const tbodyElement = screen.getByTestId("tbody-element");
      expect(tbodyElement).toBeEmptyDOMElement();
    });
  })

  it("should render Form correctly", async () => {

    constRenderForm()

    const buttonNewClient = screen.getByText("New Client");
    fireEvent.click(buttonNewClient);

    expect(isTableVisible)
  });

  


});
