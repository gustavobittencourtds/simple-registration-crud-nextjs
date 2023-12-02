import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom';

import Home from "../src/pages/index";


describe("Home", () => {
  it("should render New Client button", () => {
    render(<Home />);
    expect(screen.getByText("New Client")).toBeInTheDocument();
  });

  it("should render Form with Name, Age fields and buttons", async () => {
    render(<Home />);
    userEvent.click(screen.getByText("New Client"));

    const formComponent = await screen.findByTestId("form-element");

    // verifica se encontrou o formulário de cadastro
    expect(formComponent).toBeInTheDocument();
    
    // Verifique se os botões estão presentes no formulário
    expect(formComponent).toHaveTextContent("Salvar");
    expect(formComponent).toHaveTextContent("Cancelar");
  });
});
