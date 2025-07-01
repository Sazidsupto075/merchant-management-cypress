# Cypress Automation - Merchant Management Portal

This is an end-to-end Cypress test suite for automating a custom Merchant Management Admin Portal built with Angular and Tailwind.

## 🔑 Key Features
- ✅ Keycloak SSO login with `cy.origin`
- 🔐 Role-based login for Maker/Approver
- 📊 Dynamic filtering without search buttons
- 🔒 Lock/Unlock icon logic
- 📝 Remarks modal detection
- 🔄 Pagination & Refresh flow
- 🔽 Dropdown filter handling

## 🛠️ Setup Instructions

```bash
npm install
npx cypress open

## Setup Instructions

1. Clone the repository
2. Run `npm install`
3. Create a `cypress.env.json` file with the following structure:

```json
{
  "username": "your_username",
  "password": "your_password"
}
