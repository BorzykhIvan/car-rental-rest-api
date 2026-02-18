const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost', // jeśli testujesz poza Dockerem
    database: 'car_rental',
    password: 'postgres',
    port: 5432,
});

describe('Repository Integration Test', () => {
    let client;

    beforeAll(async () => {
        client = await pool.connect();
        await client.query('BEGIN');
    });

    afterAll(async () => {
        await client.query('ROLLBACK');
        client.release();
        await pool.end();
    });

    test('should insert and fetch car from DB', async () => {
        // Arrange — добавим бренд, чтобы получить brand_id
        const brandRes = await client.query("INSERT INTO brands (name) VALUES ('TestBrand') RETURNING id");
        const brandId = brandRes.rows[0].id;

        // Insert car
        const insertRes = await client.query(
            "INSERT INTO cars (brand_id, model, year, daily_price, available) VALUES ($1, 'TestModel', 2024, 150.00, true) RETURNING *",
            [brandId]
        );
        const insertedCar = insertRes.rows[0];

        // Fetch again
        const selectRes = await client.query("SELECT * FROM cars WHERE id = $1", [insertedCar.id]);

        // Assert
        expect(selectRes.rows[0].brand_id).toBe(brandId);
    });
});
