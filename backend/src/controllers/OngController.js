const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {
    create: async (req, res) => {
        // criando as variáveis que serão inseridas no banco
        const {name, email, whatsapp, city, uf} = req.body;
        // usando um pacote do node para gerar caracteres aleatórios como ID
        const id = crypto.randomBytes(4).toString("HEX");
  
        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf
        })
  
        return res.json({ id });
    },

    list: async (req, res) => {
        const ongs = await connection('ongs').select('*');
        return res.json(ongs);
    },

    delete: async (req, res) => {
        const ong_id = req.params.id;

        await connection('ongs').where('id', ong_id).delete();

        return res.json({ ong_id });
    }
}