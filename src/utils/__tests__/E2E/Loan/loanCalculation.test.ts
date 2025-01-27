import { LoanFormData, LoanResult } from "@/types/loan.types";
import { calculateLoan } from "@/utils/calculations";

const testLoanParams: LoanFormData = {
  loanAmount: "10000",
  months: "12",
  birthDate: "01/01/1990"
};

const testLoanResults: LoanResult = calculateLoan(testLoanParams);

describe('Calculating the loan through form submission', () => {
  it('should submit the form and display a success message', () => {
    cy.visit('/');

    cy.get('input[name="loanAmount"]').type(testLoanParams.loanAmount);
    cy.get(`input[name="months"]`).type(testLoanParams.months);
    cy.get(`input[name="birthDate"]`).type(testLoanParams.birthDate);

    cy.get("button").contains("Calcular").click();

    cy.intercept("POST", "/api/loan_calculation", (req) => {
      cy.wrap(req.body).should('deep.equal', {
        loanAmount: Number(testLoanParams.loanAmount),
        months: Number(testLoanParams.months),
        birthDate: testLoanParams.birthDate,
      });

      req.reply({
        statusCode: 200,
        body: testLoanResults,
      });
    }).as("loanCalculationRequest");

    cy.wait("@loanCalculationRequest").then((interception) => {
      const response = interception.response?.body;
      cy.wrap(response).should('deep.equal', testLoanResults);
    });

    cy.contains("Resultado da Simulação").should("be.visible");
    cy.contains(`${testLoanResults.monthlyPayment}`).should("be.visible");
    cy.contains(`${testLoanResults.totalLoanAmount}`).should("be.visible");
    cy.contains(`${testLoanResults.interestRate}`).should("be.visible");
  });
});