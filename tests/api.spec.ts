// tests/api.spec.js
import { test, expect } from '@playwright/test';

test.describe('Reqres API Automation', () => {

  let userId;

  test('Create User',async ({ request }) => {
    const response = await request.post('https://reqres.in/api/users', {
      headers: {
        'x-api-key': 'reqres-free-v1',
        'Content-Type': 'application/json'
      },
      data: { name: 'John Doe', job: 'Developer' }
    });
    const body = await response.json();
    userId = body.id;
    console.log('User created in beforeAll:', body);
  });

  test('Get Created User', async ({ request }) => {
    const response = await request.get(`https://reqres.in/api/users/1`, {
      headers: {
        'x-api-key': 'reqres-free-v1'
      }
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    console.log('Fetched User:', body);
  });

  test('Update User', async ({ request }) => {
    const response = await request.put(`https://reqres.in/api/users/1`, {
      headers: {
        'x-api-key': 'reqres-free-v1',
        'Content-Type': 'application/json'
      },
      data: {
        name: 'John Smith',
        job: 'Senior Developer'
      }
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    console.log('Updated User:', body);
    expect(body.name).toBe('John Smith');
  });

});
