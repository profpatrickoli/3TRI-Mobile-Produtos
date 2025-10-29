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
    const dados = [
      {
        id_produto: 1,
        nome: "Camiseta Básica",
        descricao: "100% algodão, disponível em várias cores.",
        preco: 49.9,
        foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8lRbS7eKYzDq-Ftxc1p8G_TTw2unWBMEYUw&s"
      },
      {
        id_produto: 2,
        nome: "Tênis Esportivo",
        descricao: "Ideal para corrida e caminhadas.",
        preco: 199.9,
        foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8lRbS7eKYzDq-Ftxc1p8G_TTw2unWBMEYUw&s"

      },
      {
        id_produto: 3,
        nome: "Mochila Escolar",
        descricao: "Grande capacidade, resistente à água.",
        preco: 89.9,
        foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8lRbS7eKYzDq-Ftxc1p8G_TTw2unWBMEYUw&s"
      },
      {
        id_produto: 4,
        nome: "Fone Bluetooth",
        descricao: "Som de alta qualidade e bateria duradoura.",
        preco: 149.9,
        foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8lRbS7eKYzDq-Ftxc1p8G_TTw2unWBMEYUw&s"
      },
      {
        id_produto: 5,
        nome: "Relógio Digital",
        descricao: "Design moderno com pulseira de silicone.",
        preco: 79.9,
        foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8lRbS7eKYzDq-Ftxc1p8G_TTw2unWBMEYUw&s"
      },
      {
        id_produto: 6,
        nome: "Garrafa Térmica",
        descricao: "Mantém líquidos quentes por até 12h.",
        preco: 59.9,
        foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8lRbS7eKYzDq-Ftxc1p8G_TTw2unWBMEYUw&s"
      },
      {
        id_produto: 7,
        nome: "Carregador Portátil",
        descricao: "10.000mAh, ideal para viagens.",
        preco: 99.9,
        foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8lRbS7eKYzDq-Ftxc1p8G_TTw2unWBMEYUw&s"
      },
      {
        id_produto: 8,
        nome: "Boné",
        descricao: "Proteção solar e estilo para o dia a dia.",
        preco: 39.9,
        foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8lRbS7eKYzDq-Ftxc1p8G_TTw2unWBMEYUw&s"
      },
      {
        id_produto: 9,
        nome: "Luminária LED",
        descricao: "Recarga USB e ajuste de brilho.",
        preco: 69.9,
        foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8lRbS7eKYzDq-Ftxc1p8G_TTw2unWBMEYUw&s"
      },
      {
        id_produto: 10,
        nome: "Capa para Celular",
        descricao: "Proteção contra quedas e arranhões.",
        preco: 29.9,
        foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8lRbS7eKYzDq-Ftxc1p8G_TTw2unWBMEYUw&s"
      }
    ]
    setProdutos(dados);
    setLoading(false);
    setRefreshing(false);
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
            <Text style={styles.preco}>R$ {item.preco.toFixed(2).replace(".", ",")}</Text>
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
