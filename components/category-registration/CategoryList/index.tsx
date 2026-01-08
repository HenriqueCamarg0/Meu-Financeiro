import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../styles";
import {
  categoriaService,
  subCategoriaService,
  Categoria,
} from "../../../services/categoriaService";

interface ListProps {
  refreshKey: number;
  aoAtualizar: () => void;
}

export default function CategoryList({ refreshKey, aoAtualizar }: ListProps) {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [aberto, setAberto] = useState<number | null>(null);
  const [novaSub, setNovaSub] = useState("");
  const [carregandoSub, setCarregandoSub] = useState(false);

  // Busca as categorias sempre que a tela abrir ou refreshKey mudar
  useEffect(() => {
    categoriaService
      .listarTodas()
      .then(setCategorias)
      .catch((err) => console.error("Erro ao listar:", err));
  }, [refreshKey]);

  // Regra de Exclusão de Categoria
  const handleDeletarCat = (categoria: Categoria) => {
    if (categoria.subcategorias && categoria.subcategorias.length > 0) {
      Alert.alert(
        "Ação Bloqueada",
        `A categoria "${categoria.nome}" possui ${categoria.subcategorias.length} subcategorias. \n\nVocê deve excluir todas as subcategorias antes de apagar a categoria principal.`,
        [{ text: "Entendido", style: "default" }]
      );
      return;
    }

    // Se estiver vazia, prossegue com a confirmação
    Alert.alert(
      "Confirmar Exclusão",
      `Deseja realmente apagar a categoria "${categoria.nome}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Sim, Apagar",
          style: "destructive",
          onPress: async () => {
            try {
              await categoriaService.excluir(categoria.id);
              aoAtualizar();
            } catch (err) {
              Alert.alert("Erro", "Servidor recusou a exclusão.");
            }
          },
        },
      ]
    );
  };

  // Função para adicionar subcategoria em categoria já existente
  const handleAddSubEmExistente = async (catId: number) => {
    if (!novaSub.trim()) return;
    setCarregandoSub(true);
    try {
      await subCategoriaService.salvar(novaSub.trim(), catId);
      setNovaSub("");
      aoAtualizar(); // Atualiza a lista para mostrar a nova sub
    } catch (err) {
      Alert.alert("Erro", "Não foi possível adicionar a subcategoria.");
    } finally {
      setCarregandoSub(false);
    }
  };

  return (
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
      <Text style={styles.label}>Categorias e Subcategorias</Text>

      {categorias.map((cat) => (
        <View key={cat.id} style={{ marginBottom: 8 }}>
          {/* Card Principal da Categoria */}
          <View style={styles.itemCategoria}>
            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={() => setAberto(aberto === cat.id ? null : cat.id)}
            >
              <Text style={styles.categoriaTexto}>{cat.nome}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleDeletarCat(cat)}>
              <Ionicons name="trash-outline" size={20} color="#ef4444" />
            </TouchableOpacity>
          </View>

          {/* Área Expandida (Subcategorias) */}
          {aberto === cat.id && (
            <View
              style={{
                padding: 15,
                backgroundColor: "#FFF",
                borderBottomLeftRadius: 8,
                borderBottomRightRadius: 8,
                borderWidth: 1,
                borderColor: "#F3F4F6",
                marginTop: -2, // Conecta visualmente com o item de cima
              }}
            >
              {cat.subcategorias &&
                cat.subcategorias.map((sub) => (
                  <View
                    key={sub.id}
                    style={{
                      flexDirection: "row",
                      marginBottom: 10,
                      alignItems: "center",
                      borderBottomWidth: 0.5,
                      borderBottomColor: "#EEE",
                      paddingBottom: 5,
                    }}
                  >
                    <Text style={{ flex: 1, color: "#666" }}>• {sub.nome}</Text>
                    <TouchableOpacity
                      onPress={() =>
                        subCategoriaService.excluir(sub.id).then(aoAtualizar)
                      }
                    >
                      <Ionicons
                        name="close-circle-outline"
                        size={18}
                        color="#fca5a5"
                      />
                    </TouchableOpacity>
                  </View>
                ))}

              {/* Input para adicionar nova sub na hora */}
              <View style={{ flexDirection: "row", marginTop: 10, gap: 8 }}>
                <TextInput
                  style={[
                    styles.input,
                    {
                      flex: 1,
                      marginBottom: 0,
                      height: 40,
                      paddingHorizontal: 10,
                    },
                  ]}
                  placeholder="Nova subcategoria..."
                  value={novaSub}
                  onChangeText={setNovaSub}
                />
                <TouchableOpacity
                  style={[styles.btnAdicionarSub, { width: 40, height: 40 }]}
                  onPress={() => handleAddSubEmExistente(cat.id)}
                  disabled={carregandoSub}
                >
                  {carregandoSub ? (
                    <ActivityIndicator size="small" color="#FFF" />
                  ) : (
                    <Ionicons name="checkmark" size={20} color="#FFF" />
                  )}
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      ))}

      {categorias.length === 0 && (
        <Text style={{ textAlign: "center", color: "#999", marginTop: 20 }}>
          Nenhuma categoria cadastrada.
        </Text>
      )}
    </ScrollView>
  );
}
