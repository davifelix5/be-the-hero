const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');


describe('ONG', () => {
    beforeEach( async () => {
        await connection.migrate.rollback(); // antes de cada teste, limpa o banco de dados
        await connection.migrate.latest(); // antes de cada teste, executar as migrations
    })

    afterAll(async () => {
        await connection.destroy() // depois de todos os testes, fecha a conexão
    })

    it('should be able to create a new ONG', async () => {

        const response = await request(app).post('/ongs').send({
            name: "AACD",
            email: "contato@aacd.com.br",
            whatsapp: "4700000000",
            city: "São Paulo",
            uf: "SP"
        })

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    })
})


describe('Fetch IDS', () => {

    beforeEach( async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    })

    afterAll(async () => {
        await connection.destroy()
    })


    it('should get all incidents ids and put them on an array', async () => {
        const response = await connection('incidents').select('id')

        console.log(response);
    })

})