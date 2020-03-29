const request = require('supertest');

const app = require('../../src/app');

const connection = require('../../src/database/connection');

describe('Ong', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.destroy();
    });

    it('should be able to create a new Ong', async () => {
        const response = await request(app)
                        .post('/ongs')
                        .send({
                            name: "teste",
                            email: "test@mail.com",
                            whatsapp: "1111111111",
                            city: "Pedra Branca",
                            uf: "CE"
                        });

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });
});
