import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom';

import Button from "../src/components/Button";
import Customer from "../src/core/Customer";
import Form from "../src/components/Form";
import Table from "../src/components/Table";

const firstCustomer = new Customer("Gustavo Bittencourt", 26, 1);
const secondCustomer = new Customer("John Doe", 20, 2);
const thirdCustomer = new Customer("Another John Doe", 55, 3);

const mockCustomers = [firstCustomer, secondCustomer, thirdCustomer];

const mockSelectedCustomer = jest.fn();
const mockDeleteCustomer = jest.fn();

describe("Table View", () => {

  it("renders the table with customers", () => {
    render(<Table customer={mockCustomers} selectedCustomer={mockSelectedCustomer} deletedCustomer={mockDeleteCustomer} />);

    const table = screen.getByRole("table");

    expect(table).toBeInTheDocument();

    const customersRows = screen.getAllByRole("row");
    expect(customersRows.length).toBe(4); // header + 3 customers
  });

  it("renders the table with no customers", () => {
    render(<Table customer={[]} selectedCustomer={mockSelectedCustomer} deletedCustomer={mockDeleteCustomer} />);

    const table = screen.getByRole("table");

    expect(table).toBeInTheDocument();

    const customersRows = screen.getAllByRole("row");
    expect(customersRows.length).toBe(1); // header only
  
  })

  it("should call delete function when delete button was clicked", () => {
    render(<Table customer={mockCustomers} selectedCustomer={mockSelectedCustomer} deletedCustomer={mockDeleteCustomer(firstCustomer)} />);

    const deleteButtons = screen.queryAllByTestId("delete-button");
    userEvent.click(deleteButtons[0]);

    expect(mockDeleteCustomer).toHaveBeenCalledTimes(1);

  })

  it("should call update function when update button was clicked", () => {
    render(<Table customer={mockCustomers} selectedCustomer={mockSelectedCustomer(firstCustomer)} deletedCustomer={mockDeleteCustomer} />);

    const editButtons = screen.queryAllByTestId("edit-button");
    userEvent.click(editButtons[0]);

    expect(mockSelectedCustomer).toHaveBeenCalledTimes(1);

  })

  it("should return the customer data when update function was called", () => {
    const mockChangedCustomer = jest.fn();

    render(<Form customer={firstCustomer} changedCustomer={mockChangedCustomer(firstCustomer)} />);

    const idInput = screen.getByTestId('codigo');
    expect(idInput).toHaveValue("1");

    const nameInput = screen.getByTestId("name");
    expect(nameInput).toHaveValue("Gustavo Bittencourt");

    const ageInput = screen.getByTestId("age");
    expect(ageInput).toHaveValue(26);

  })

  it("should call newClient function when register button was clicked", () => {
    const mockNewCustomer = jest.fn();
    render(<Button buttonType="register" onClick={mockNewCustomer()} disabled={false} />);

    const newCustomerButton = screen.getByTestId("register-button");
    userEvent.click(newCustomerButton);

    expect(mockNewCustomer).toHaveBeenCalledTimes(1);
  })

  it("renders the Form with name and age fields when is a new customer", () => {
    render(<Form customer={[]} changedCustomer={[]} />);
    
    const ageInput = screen.getByTestId("age");
    expect(ageInput).toBeInTheDocument();

    const nameInput = screen.getByTestId("name");
    expect(nameInput).toBeInTheDocument();
  });

  it("save button must be disabled when Name field is empty", async () => {
    render(<Form customer={[]} changedCustomer={[]} />);

    const nameInput = screen.getByTestId("name");
    expect(nameInput).toHaveValue("");

    const saveButton = screen.getByTestId("save-button");
    expect(saveButton).toBeDisabled();  
  })

  it("save button must be enabled when Name field is empty", async () => {
    render(<Form customer={[]} changedCustomer={[]} />);

    const nameInput = screen.getByTestId("name");
    expect(nameInput).toHaveValue("");

    const saveButton = screen.getByTestId("save-button");
    expect(saveButton).toBeDisabled();
    userEvent.type(nameInput, "Gustavo Bittencourt");

    await waitFor(() => {
      expect(saveButton).toBeEnabled();
    })

  })

});