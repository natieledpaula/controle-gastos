// Importar o React e o Hook useState para controle de estado
import React, {use, useState} from "react";

// Importar os componentes nativos para construção da Interface
import {
    View, //Container de layout
    TextInput, //Campo de entrada de texto
    Text, //Exibição de texto
    TouchableOpacity, // Botão clicavel
    FlatList, // Lista de itens
    StyleSheet, // Estilização
    Alert, // Alertas do sistema
} from "react-native";

// Componente principal

export default function HomeScreen() {
    // Estados do formulario
    const [descricao, setDescricao] = useState(""); // Descrição de gasto
    const [valor, setValor] = useState(""); // Valor do gastos
    const [gastos, setGastos] = useState([]); // Lista de gastos
    const [editandoId, setRditandoId] = useState(null); // ID do gastos em edição

    // Adicionar ou atuaizar gastos
    const AdicionarOuAtualizarGasto = () => {
        // Validar: campos vazios
        if(!descricao || !valor) {
            Alert.alert("Erro", "Digite um valor numerico!");
            return;
        }

        // Validação: valor precisa ser numerico
        if(isNaN(parseFloat(valor))) {
            Alert.alert("Erro", "Digite um valor numerico!");
            return;
        }
    }
}

