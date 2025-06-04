import { test, expect } from '@playwright/test';

let productData;

test.describe(`API test sample`, () => {
    test.skip('GET Products', async ({ request }) => {
        const productsResponse = await request.get(`https://fakestoreapi.com/products`);
        expect(productsResponse.ok()).toBeTruthy();

        console.log(`AAA`, await productsResponse.json());
    });

    test.skip('POST a new Product, GET and DELETE it', async ({ request }) => {
        const postNewProductResponse = await request.post(`https://fakestoreapi.com/products`, {
            data: {
                title: 'New Product 777',
                price: 777,
                description: 'New Laptop Product 777',
                category: `electronics`,
                image: "https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg",
                rating: { "rate": 7, "count": 127 }
            },
        });
        expect(postNewProductResponse.ok()).toBeTruthy();
        productData = await postNewProductResponse.json();
        console.log(`BBB`, await postNewProductResponse.json());

        // GET the new added Product
        const getProductResponse = await request.get(`https://fakestoreapi.com/products/${productData.id}`);
        expect(getProductResponse.ok()).toBeTruthy();
        console.log(`CCC`, getProductResponse);

        // DELETE the new Product
        const deleteProductResponse = await request.delete(`https://fakestoreapi.com/products/${productData.id}`);
        expect(await deleteProductResponse.json()).toBeNull();
        console.log(`DDD`, await deleteProductResponse.json());
    });

    test(`Mocks API Request and do not call api`, async ({ page }) => {
        // Mock the api call before navigating
        await page.route('https://fakestoreapi.com/products', async route => {
            const json = [{ id: 777, title: 'Iphone 20' }];
            await route.fulfill({ json });
        });
        // Go to the page
        await page.goto('https://fakestoreapi.com/products');
        // Assert that the 'Iphone 20' is visible
        await expect(page.getByText('Iphone 20')).toBeVisible();
    });

    test(`Mocks API Response`, async ({ page }) => {
        // Get the response and add to it
        await page.route('https://fakestoreapi.com/products', async route => {
            const response = await route.fetch();
            const json = await response.json();
            json.push({ id: 777, title: 'Iphone 20' });
            // Fulfill using the original response, while patching the response body with the given JSON object.
            await route.fulfill({ response, json });
        });
        // Go to the page
        await page.goto('https://fakestoreapi.com/products');
        // Assert that the 'Iphone 20' is added
        await expect(page.getByText('Iphone 20')).toBeVisible();
    });
});
