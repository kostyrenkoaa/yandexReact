import {BASE_URL} from "../../src/utils/constants";

describe('tests_app', () => {
  beforeEach(function () {
    cy.intercept("GET", BASE_URL + "/ingredients", { fixture: "ingredients" })
    cy.visit('http://localhost:3000')
    cy.wait(1000)
  })

  it('check_modal', () => {
    cy.get('#643d69a5c3f7b9001cfa093c').click()
    cy.wait(1000)
    cy.get('h2').contains('Детали ингредиента')
    cy.get('[data-cypress=button-close]').click()
    cy.wait(2000)
  })

  it('creating_order', () => {
    // Перенос элементов
    cy.dragElement('#643d69a5c3f7b9001cfa093c')
    cy.wait(1000)
    cy.dragElement('#643d69a5c3f7b9001cfa093e')
    cy.wait(1000)
    cy.dragElement('#643d69a5c3f7b9001cfa0942')
    cy.wait(1000)
    cy.get('[data-cypress=button-order-start]').click()


    // Авторизация
    cy.wait(1000)
    cy.intercept("POST", BASE_URL + "/auth/login", { fixture: "login" })
    cy.get('input[type=email]').type('test@ro.ru')
    cy.get('input[type=password]').type('123456')
    cy.get('[data-cypress=button-login]').click()
    cy.wait(1000)

    // Выполнение заказа
    cy.intercept("POST", BASE_URL + "/orders", { fixture: "orders" })
    cy.get('[data-cypress=button-order-start]').click()
    cy.get('[data-cypress=order-number]').contains('17067')
  })
})
