import React, {useEffect, useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi'
import logoImg from '../../assets/logo.svg';

import api from '../../services/api'

import './styles.css';

export default function Profile() {
    const [incidents, setIncidents] = useState([]);
    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');
    const history = useHistory();

    // Executa uma função para quando alguma dado dentro do array muda. Como está vazio, vai executar uma única vez
    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId,
            },
        }).then(response => {
            setIncidents(response.data)
        })
    }, [ongId])

    // Funçao para apagar caso pelo botão
    async function handleDeleteEvent(id) {
        try {
            document.getElementById(id).style.backgroundColor = '#e02041aa';
            document.getElementById(id).style.transition = '.3s';

            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                },
            });

            setIncidents(incidents.filter(incident => incident.id !== id));
        } catch {
            alert('Erro ao deletar')
        }
    }

    async function handleLogout() {
        localStorage.clear();
        history.push('/profile')
    }
    

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be a hero"/>
                <span>Bem vinda, {ongName}</span>

                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button onClick={handleLogout}>
                    <FiPower size="18" color="E02041" />
                </button>
            </header>

            <h1>Casos cadastrados</h1>
            <ul>{incidents.map(incident => (
                    <li key={incident.id} id={incident.id}>
                        <strong>CASO:</strong>
                        <p>{incident.tile}</p>
                
                        <strong>DESCRIÇÃO:</strong>
                        <p>{incident.description}</p>
                
                        <strong>VALOR:</strong>
                        <p>{incident.value.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</p>
                
                        <button type="button" onClick={() => handleDeleteEvent(incident.id)}>
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}