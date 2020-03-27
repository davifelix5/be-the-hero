import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native'
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import * as MailComposer from 'expo-mail-composer';
import { Linking } from 'react-native'

import styles from './style';

import logoImg from '../../assets/logo.png'

export default function Detail() {
    const route = useRoute();
    const incident = route.params.incident;
    const navigation = useNavigation();
    const msg = `Olá, ${incident.name}. Me comovi com o caso "${incident.title}" e estou disposto a fornecer a ajuda necessário de R$ ${String(incident.value.toFixed(2)).replace('.', ',')}.`;

    function navigateBack() {
        navigation.goBack();
    }

    function sendMail() {
        MailComposer.composeAsync({
            subject: `Herói do caso: ${incident.title}`,
            recipients: [incident.email],
            body: msg,
        });
    }

    function sendWhatsApp() {
        Linking.openURL(`whatsapp://send?phone=55${incident.whatsapp}&text=${msg}`);
        //Abrindo por deeplinking: aplicativos que abrem com parâmetros como se fosse uma URL
    }

    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <Image source={logoImg} />
            
                <TouchableOpacity onPress={navigateBack}>
                    <Feather name="arrow-left" size={16} color="#E82041" />
                </TouchableOpacity>

            </View>

                <View style={styles.incident}>
                    <Text style={[styles.incidentProperty, { marginTop: 0 }]}>ONG:</Text>
                    <Text style={styles.incidentValue}>{incident.name} de {incident.city} / {incident.uf} </Text>

                    <Text style={styles.incidentProperty}>CASO:</Text>
                    <Text style={styles.incidentValue}>{incident.title}</Text>

                    <Text style={styles.incidentProperty}>VALOR:</Text>
                    <Text style={styles.incidentValue}>R$ {String(incident.value.toFixed(2)).replace('.', ',')}</Text>
                </View>

                <View style={styles.contactBox}>
                    <Text style={styles.heroTitle}>Salve o dia!</Text>
                    <Text style={styles.heroTitle}>Seja o herói desse caso.</Text>
                    
                    <Text style={styles.heroDescription}>Entre em contato:</Text>

                    <View style={styles.actions}>

                        <TouchableOpacity style={styles.action} onPress={sendWhatsApp}>
                            <Text style={styles.actionText}>WhatsApp</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.action} onPress={sendMail}>
                            <Text style={styles.actionText}>Email</Text>
                        </TouchableOpacity>

                    </View>

            </View>

        </View>
    );
};