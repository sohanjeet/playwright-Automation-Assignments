# Playwright Automation Assignments

This repository contains **end-to-end UI and API automation tests** written using [Playwright](https://playwright.dev/).  
It includes well-structured test scripts, clear documentation, and a dedicated results folder for easy reference.

---

## 📌 Project Overview
This project automates functional and regression testing for web applications and APIs.  
It also demonstrates how to use Playwright for **browser automation** along with **API testing** (including authentication headers like `reqres-free-v1`).

---

## 🛠 Tech Stack
- **Language:** TypeScript
- **Framework:** Playwright Test Runner
- **Assertions:** Playwright's built-in expect library
- **Reporting:** Playwright HTML Reporter (with custom results folder)
- **Version Control:** Git & GitHub

---

## 📂 Project Structure
├── tests/ # Test scripts (UI & API)
├── playwright.config.ts # Playwright configuration
├── results/ # Test run results & HTML reports
├── README.md # Project documentation
└── package.json # Dependencies & scripts
---
⚡ Getting Started
1️⃣ Clone the Repository
-->git clone https://github.com/sohanjeet/playwright-Automation-Assignments.git
-->cd playwright-Automation-Assignments
2️⃣ Install Dependencies
-->npm install
3️⃣ Run Tests
-->npx playwright test
4️⃣ View Test Report
-->npx playwright show-report
---
📊 Reports
-After test execution, reports are generated inside the results/ folder.
Open them via:
-->npx playwright show-report

📊 Generating Allure Reports
This project supports Allure Reporting for better visualization of test results.
1️⃣ Install Allure Dependencies
-->Run the following command to install Playwright’s Allure reporter and the Allure CLI:
-->npm install --save-dev allure-playwright / npm install -g allure-commandline
2️⃣ Configure Allure in Playwright
-->In your playwright.config.ts (or .js), add the Allure reporter:
import { defineConfig } from '@playwright/test';
export default defineConfig({
  reporter: [
    ['list'],
    ['allure-playwright']
  ],
});
3️⃣ Run Tests with Allure Output
-->Execute your tests and save the results for Allure:
-->npx playwright test --reporter=line,allure-playwright
By default, results will be stored in the allure-results folder.
4️⃣ Generate Allure Report
After running the tests, generate the HTML report:
-->allure generate allure-results --clean -o allure-report
5️⃣ Open Allure Report Locally
-->allure open allure-report
---
Screenshots
-->Allure Report
<img width="1741" height="956" alt="Screenshot (474)" src="https://github.com/user-attachments/assets/de93aa75-f931-49e4-aa61-fb9b22f9e267" />
---

📄 License

This project is licensed under the MIT License.


