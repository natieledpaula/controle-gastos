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

    // Interface visual
    return (
    <View style={styles.container}>
    {/* Título */}
    <Text style={styles.title}>Controle de Gastos</Text>

    {/* Campo descrição */}
    <TextInput
        style={styles.input}
        placeholder="Descrição do Gasto"
        value={descricao}
        onChangeText={setDescricao}
    />

    {/* Campo valor */}
    <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Valor"
        value={valor}
        onChangeText={setValor}
    />

    {/* Botão adicionar/atualizar */}
    <TouchableOpacity
        style={styles.button}
        onPress={adicionarOuAtualizarGasto}
    >
        <Text style={styles.buttonText}>
        {editandoId !== null ? "Atualizar Gasto" : "Adicionar Gasto"}
        </Text>
    </TouchableOpacity>

    {/* Exibição total */}
    <Text style={styles.total}>Total: R$ {totalGastos}</Text>

    {/* Lista de gastos */}
    <FlatList
        data={gastos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
        <View style={styles.itemContainer}>
            {/* Texto do item */}
            <Text style={styles.item}>
            {item.descricao} - R$ {item.valor}
            </Text>

            {/* Ações */}
            <View style={styles.actions}>
            {/* Botão editar */}
            <TouchableOpacity
                onPress={() => editarGasto(item)}
                style={styles.editButton}
            >
                <Text style={styles.actionText}>Editar</Text>
            </TouchableOpacity>

            {/* Botão remover */}
            <TouchableOpacity
                onPress={() => removerGasto(item.id)}
                style={styles.removeButton}
            >
                <Text style={styles.actionText}>Excluir</Text>
            </TouchableOpacity>
            </View>
        </View>
        )}
    />
    </View>
    );
}

// Estilos da aplicação
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        marginTop: 50,
        backgroundColor: "#fff",
    },

    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
    },

    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 12,
        borderRadius: 8,
        marginBottom: 12,
    },

    button: {
        backgroundColor: "#007bff",
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
        marginBottom: 15,
    },

    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },

    total: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 15,
    },

    itemContainer: {
        backgroundColor: "#f5f5f5",
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
    },

    item: {
        fontSize: 16,
        marginBottom: 10,
    },

    actions: {
        flexDirection: "row",
    },

    editButton: {
        backgroundColor: "#28a745",
        padding: 10,
        borderRadius: 6,
        marginRight: 10,
    },

    removeButton: {
        backgroundColor: "#dc3545",
        padding: 10,
        borderRadius: 6,
    },

    actionText: {
        color: "#fff",
        fontWeight: "bold",
    },
});