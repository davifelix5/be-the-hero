import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Register() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [whatsapp, setWhatsapp] = useState('')
    const [city, setCity] = useState('')
    const [uf, setUf] = useState('')
    
    const history = useHistory();

    async function handleRegister(event) {

        event.preventDefault();
        const data = {
            name,
            email,
            whatsapp,
            city,
            uf
        }

        try {
            const response = await api.post('ongs', data);
            alert("Seu ID de acesso: " + response.data.id);
            history.push('/')
        } catch {
            alert("Ocorreu um erro em seu cadastro")
        }
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be the Hero"/>

                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos de sua ONG.</p>
                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="E02041" />
                        Não tenho cadastro
                    </Link>
                </section>
                <form onSubmit={handleRegister}>
                    <input
                    placeholder="Nome da ONG"
                    onChange = {e => setName(e.target.value)}
                    />
                    <input
                    type="email" placeholder="E-mail"
                    onChange = {e => setEmail(e.target.value)}
                    />
                    <input
                    placeholder="WhatsAPP"
                    onChange = {e => setWhatsapp(e.target.value)}
                    />
                    
                    <div className="input-group">
                        <input 
                        placeholder="Cidade"
                        onChange={e => setCity(e.target.value)}
                        />
                        <input
                        placeholder="UF" maxLength="2" style={{ width: 80 }}
                        onChange={e => setUf(e.target.value)}
                        />
                    </div>

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}