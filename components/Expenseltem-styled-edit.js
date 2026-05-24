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

        // Atualização de gasto existente
        if(editandoId !== null) {
            const gastosAtualizados = gastos.map((item) => item.id === editandoId? {
                ...item, 
                descricao,
                valor: parseFloat(valor).toFixed(2),
            }
            :item,
        );
        setGastos(gastosAtualizados); // Atualiza lista
        setEditandoId(null); // Sai do modo edição
        } else {
            // Criação de novo gasto
            const novoGasto = {
                id: Date.now().toString(), // Gerar ID unico
                descricao,
                valor: parseFloat(valor).toFixed(2),
            };

            setGastos([...gastos, novoGasto]); // Adicionar novo gasto
        }

        //Limpa formulario
        setDescricao("");
        setValor("");
    };

    // Remover Gasto
    const RemoverGasto = (id) => {
        //Remove item pelo ID
        setGastos(gastos.filter((item) => item.id !== id));

        // Caso esteja editando o item removido
        if(editandoId === id) {
            setEditandoId(null);
            setDescricao("");
            setValor("");
        }
    };

    // Editar gasto
    const editarGasto = (item) => {
        // Preenche formulario
        setDescricao(item.descricao);
        setValor(item.valor);

        // Salvar ID do item em edição
        setEditandoId(item.id);
    };

    // Calculo total dos gastos
    const totalGastos = gastos
    .reduce((acc, item) => acc + parseFloat(item.valor), 0)
    .toFixed(2);
}

