

const { test, expect } = require('@playwright/test');
const fs = require('fs');
const PDFDocument = require('pdfkit');
const path = require('path');

// Description: This test automates the process of logging into a bookstore, searching for a book, saving its details, and logging out.
test('User can log in, search a book, save details, and log out', async ({ page}) => {
  // await context.clearCookies();
  // await context.clearPermissions();
  // await page.goto('https://demoqa.com');
  // await page.evaluate(() => localStorage.clear());
  const username = 'testuser124';
  const password = 'Test@123';

  // 1. Navigate to Book Store
  await page.goto('https://demoqa.com/books');

  // 2. Login
  await page.click('#login');
  await page.fill('#userName', username);
  await page.fill('#password', password);
  await page.click('#login');

  // 3. Validate username & logout button (3s timeout)
  await expect(page.locator('#userName-value')).toHaveText(username,{timeout: 3000});
  await expect(page.locator('#submit')).toHaveText('Log out');


  // 4. Wait for Search Box (3s timeout)
  await page.waitForSelector('#searchBox', { state: 'visible', timeout: 3000 });
  await expect(page.locator('#searchBox')).toBeVisible();

  // 5. Search
  await page.fill('#searchBox', 'Learning JavaScript Design Patterns');

  // 6. Validate search result (3s timeout)
  await expect(page.locator('a:has-text("Learning JavaScript Design Patterns")')).toBeVisible({ timeout: 3000 });

  // 7. Extract and save details
  const title = await page.textContent('a:has-text("Learning JavaScript Design Patterns")');
  const author = await page.textContent('div.rt-tr-group div.rt-td:nth-child(3)');
  const publisher = await page.textContent('div.rt-tr-group div.rt-td:nth-child(4)');

  const cleanTitle = title.trim();
  const cleanAuthor = author.trim();
  const cleanPublisher = publisher.trim();
  fs.writeFileSync('book_info.txt', `Title: ${cleanTitle}\nAuthor: ${cleanAuthor}\nPublisher: ${cleanPublisher}`);

  // 8. Generate PDF file
  const pdfPath = path.resolve(__dirname, 'book_info.pdf');
  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream('book_info.pdf'));
  doc.fontSize(18).text('Book Information', { align: 'center' });
  doc.moveDown();
  doc.fontSize(14).text(`Title: ${title}`);
  doc.text(`Author: ${author}`);
  doc.text(`Publisher: ${publisher}`);
  doc.end();

  console.log('PDF generated: book_info.pdf');
  // 9. Create a temporary HTML download page
 const htmlPath = path.resolve(__dirname, 'download.html');
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <body>
      <h2>Download Your Book Info PDF</h2>
      <a href="file://${pdfPath}" download="book_info.pdf">Click here to download PDF</a>
    </body>
    </html>
  `;
  fs.writeFileSync(htmlPath, htmlContent);
  console.log('Download page generated at:', htmlPath);

  
  // 10. Logout
  await page.click('#submit:has-text("Log out")');
});
