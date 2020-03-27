import React, { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons'
import {useNavigation} from '@react-navigation/native'
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';
import api from '../../services/api'

import styles from './styles'

import logoImg from '../../assets/logo.png';

export default function Incidents() {
    const [incidents, setIncidents] = useState([])
    const [total, setTotal] = useState(0);
    const navigation = useNavigation();
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    function navigateToDetail(incident) {
        navigation.navigate('Datail', { incident });
    }

    async function loadIncidents() {
        if (loading) {
            return; //se ja estiver carregando, parar
        }

        if (total > 0 && incidents.length === total) {
            return; // parar se já tiver carregado tudo
        }

        setLoading(true);

        const response = await api.get('incidents', {
            params: { page }
        })

        setIncidents([...incidents, ...response.data]) // para juntar um array no outro
        setTotal(response.headers['x-totalcount']) // pegar a quantidade total de casos
        setPage(page + 1)
        setLoading(false)
    }

    useEffect(() => {
        loadIncidents()
    }, [])

    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>Total de <Text style={styles.headerTextBold}>{total} casos.</Text></Text>
            </View>

            <View>
                <Text style={styles.title}>Bem vindo!</Text>
                <Text style={styles.description}>Escola um dos casos abaixo e salve o dia</Text>
            </View>


            <FlatList 
              style={styles.incidentList}
              data={incidents}
              keyExtractor = {incident => String(incident.id)}
              showsVerticalScrollIndicator={true}
              onEndReached={loadIncidents} //carregar itens quando chegar no final
              onEndReachedThreshold={0.2} // começar a carregar quando chegar no fim da lista
              renderItem={({ item: incident }) => (
                <View style={styles.incident}>
                    <Text style={styles.incidentProperty}>ONG:</Text>
                    <Text style={styles.incidentValue}>{incident.name}</Text>

                    <Text style={styles.incidentProperty}>CASO:</Text>
                    <Text style={styles.incidentValue}>{incident.title}</Text>

                    <Text style={styles.incidentProperty}>Valor:</Text>
                    <Text style={styles.incidentValue}>R$ {String(incident.value.toFixed(2)).replace('.', ',')}</Text>

                    <TouchableOpacity
                        style={styles.detailsButton}
                        onPress={() => navigateToDetail(incident)}
                    >
                        <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                        <Feather name="arrow-right" size={16} color= '#E02041' />
                    </TouchableOpacity>
                </View>
              )}
            />

        </View>
    );
};
