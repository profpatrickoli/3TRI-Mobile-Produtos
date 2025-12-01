import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";

interface Produto {
  id_produto: number;
  nome: string;
  descricao: string;
  preco: number;
  foto: string;
}

function Main() {
  const insets = useSafeAreaInsets();
  const [pesquisa, setPesquisa] = useState("");
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  async function carregarProdutos(){
    try {
      // VERIFICAR O IP DA MÁQUINA QUE ESTÁ RODANDO A API NO
      // TERMINAL COM O COMANDO ifconfig (Linux) OU ipconfig (Windows)
      const resposta = await fetch("http://10.213.5.197:3000/estoque")
      const dados = await resposta.json()
      console.log(dados)
      setProdutos(dados);
    } catch (erro) {
      console.log(erro)
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    carregarProdutos();
  }, []);

  const recarregarProdutos = () => {
    setRefreshing(true);
    carregarProdutos();
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top + 10,
          paddingBottom: insets.bottom + 10,
        },
      ]}
    >
      <View style={styles.bordaPesquisar}>
        <Text style={styles.textoPesquisar}>Pesquisar: </Text>
        <TextInput
          style={styles.inputPesquisar}
          value={pesquisa}
          onChangeText={setPesquisa}
          placeholder="Digite aqui..."
          placeholderTextColor="#ccc"
        />
        <Ionicons
          name="search"
          size={24}
          color="#888888"
          style={styles.iconePesquisar}
        />
      </View>

      <FlatList
        data={produtos.filter((produto) =>
          produto.nome.toLowerCase().includes(pesquisa.toLowerCase())
        )}
        keyExtractor={(item) => item.id_produto.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image
              source={{ uri: item.foto }}
              style={styles.imagem}
              contentFit="cover"
            />
            <View style={styles.info}>
              <Text style={styles.nome}>{item.nome}</Text>
              <Text style={styles.descricao}>{item.descricao}</Text>
            </View>
            <Text style={styles.preco}>R$ {item.preco}</Text>
          </View>
        )}
        contentContainerStyle={styles.lista}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={recarregarProdutos} />
        }
      />
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <Main />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  bordaPesquisar: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  textoPesquisar: {
    marginLeft: 20,
  },
  inputPesquisar: {
    flex: 1,
    borderWidth: 0.5,
    borderColor: "#888888",
    borderRadius: 25,
    paddingLeft: 20,
    paddingRight: 20,
    width: 200,
  },
  iconePesquisar: {
    marginRight: 20,
    marginLeft: 10,
  },
  lista: {
    paddingHorizontal: 16,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    padding: 10,
    marginVertical: 6,
    borderRadius: 10,
    elevation: 2,
  },
  imagem: {
    width: 75,
    height: 60,
    marginRight: 10,
    borderRadius: 6,
  },
  info: {
    flex: 1,
  },
  nome: {
    fontSize: 16,
    fontWeight: "bold",
  },
  descricao: {
    fontSize: 12,
    color: "#555",
  },
  preco: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#2e7d32",
    marginLeft: 8,
  },
});
