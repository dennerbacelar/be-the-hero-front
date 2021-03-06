import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import api from '../../services/api'

import './styles.css';
import logoImg from '../../assets/logo.svg';

export default function Perfil() {
    const [casos, setCasos] = useState([]);
    const ongId = localStorage.getItem('ongId');
    const ongNome = localStorage.getItem('ongNome');
    const history = useHistory();

    useEffect(() => {
        api.get('perfil', {
            headers: {
                Authorization: ongId,
            }
        }).then(response => {
            setCasos(response.data);
        })
    }, [ongId]);

    async function handleDeletarCaso(id) {
        try {
            await api.delete(`casos/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            });
            setCasos(casos.filter(caso => caso.id !== id))
        } catch (error) {
            alert('Erro ao deletar caso, tente novamente.')
        }
    }

    function handleLogout() {
        localStorage.clear()
        history.push('/');
    }

    return (
        <div className="perfil-container">
            <header>
                <img src={logoImg} alt="Be The Hero" />
                <span>Bem Vinda, {ongNome}</span>
                <Link className="button" to="/caso/novo">Cadastrar novo caso</Link>
                <button  onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>
            <h1>Casos cadastrados</h1>
            <ul>
                {casos.map(caso => (
                    <li key={caso.id}>
                        <strong>Caso:</strong>
                        <p>{caso.titulo}</p>
                        <strong>Descrição</strong>
                        <p>{caso.descricao}</p>
                        <strong>valor: </strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(caso.valor)}</p>
                        <button onClick={() => handleDeletarCaso(caso.id)} type="button">
                            <FiTrash2 size={20} color="a8a8b3" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}