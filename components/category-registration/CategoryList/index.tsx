import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  ActivityIndicator,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../styles";
import {
  categoriaService,
  subCategoriaService,
  Categoria,
  Subcategoria,
} from "../../../services/categoriaService";
import { colors, typography, spacing, components, utils } from "../../../utils/designSystem";

interface ListProps {
  refreshKey: number;
  aoAtualizar: () => void;
}

export default function CategoryList({ refreshKey, aoAtualizar }: ListProps) {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [aberto, setAberto] = useState<number | null>(null);
  const [novaSub, setNovaSub] = useState("");
  const [carregandoSub, setCarregandoSub] = useState(false);
  
  // Estados para edição
  const [editandoCategoria, setEditandoCategoria] = useState<number | null>(null);
  const [editandoSubcategoria, setEditandoSubcategoria] = useState<number | null>(null);
  const [nomeEditCategoria, setNomeEditCategoria] = useState("");
  const [nomeEditSubcategoria, setNomeEditSubcategoria] = useState("");
  const [carregandoEdit, setCarregandoEdit] = useState(false);

  // Busca as categorias sempre que a tela abrir ou refreshKey mudar
  useEffect(() => {
    // Reset do estado de abertura quando recarregar
    setAberto(null);
    categoriaService
      .listarTodas()
      .then(setCategorias)
      .catch((err) => console.error("Erro ao listar:", err));
  }, [refreshKey]);

  // Função para iniciar edição de categoria
  const iniciarEdicaoCategoria = (categoria: Categoria) => {
    setEditandoCategoria(categoria.id);
    setNomeEditCategoria(categoria.nome);
  };

  // Função para salvar edição de categoria
  const salvarEdicaoCategoria = async (id: number) => {
    if (!nomeEditCategoria.trim()) {
      Alert.alert("Erro", "Nome da categoria não pode estar vazio.");
      return;
    }

    setCarregandoEdit(true);
    try {
      await categoriaService.editar(id, nomeEditCategoria.trim(), true);
      setEditandoCategoria(null);
      setNomeEditCategoria("");
      aoAtualizar();
      Alert.alert("Sucesso", "Categoria atualizada com sucesso!");
    } catch (err) {
      Alert.alert("Erro", "Não foi possível atualizar a categoria.");
    } finally {
      setCarregandoEdit(false);
    }
  };

  // Função para cancelar edição de categoria
  const cancelarEdicaoCategoria = () => {
    setEditandoCategoria(null);
    setNomeEditCategoria("");
  };

  // Função para iniciar edição de subcategoria
  const iniciarEdicaoSubcategoria = (subcategoria: Subcategoria) => {
    setEditandoSubcategoria(subcategoria.id);
    setNomeEditSubcategoria(subcategoria.nome);
  };

  // Função para salvar edição de subcategoria
  const salvarEdicaoSubcategoria = async (id: number, categoriaId: number) => {
    if (!nomeEditSubcategoria.trim()) {
      Alert.alert("Erro", "Nome da subcategoria não pode estar vazio.");
      return;
    }

    setCarregandoEdit(true);
    try {
      await subCategoriaService.editar(id, nomeEditSubcategoria.trim(), categoriaId, true);
      setEditandoSubcategoria(null);
      setNomeEditSubcategoria("");
      aoAtualizar();
      Alert.alert("Sucesso", "Subcategoria atualizada com sucesso!");
    } catch (err) {
      Alert.alert("Erro", "Não foi possível atualizar a subcategoria.");
    } finally {
      setCarregandoEdit(false);
    }
  };

  // Função para cancelar edição de subcategoria
  const cancelarEdicaoSubcategoria = () => {
    setEditandoSubcategoria(null);
    setNomeEditSubcategoria("");
  };

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
      <Text style={[typography.styles.label, { marginBottom: spacing.md }]}>
        Categorias e Subcategorias
      </Text>

      {categorias.map((cat) => (
        <View key={cat.id} style={{ marginBottom: spacing.sm }}>
          {/* Card Principal da Categoria */}
          <View style={[components.card, components.cardSmall, { marginBottom: 2 }]}>
            {editandoCategoria === cat.id ? (
              // Modo de edição da categoria
              <View style={[components.row, { gap: spacing.sm }]}>
                <TextInput
                  style={[components.input, { flex: 1, minHeight: 40 }]}
                  value={nomeEditCategoria}
                  onChangeText={setNomeEditCategoria}
                  placeholder="Nome da categoria"
                  autoFocus
                />
                <TouchableOpacity
                  style={[components.buttonSmall, { backgroundColor: colors.success, paddingHorizontal: spacing.md }]}
                  onPress={() => salvarEdicaoCategoria(cat.id)}
                  disabled={carregandoEdit}
                >
                  {carregandoEdit ? (
                    <ActivityIndicator size="small" color={colors.white} />
                  ) : (
                    <Ionicons name="checkmark" size={16} color={colors.white} />
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  style={[components.buttonSmall, { backgroundColor: colors.gray400, paddingHorizontal: spacing.md }]}
                  onPress={cancelarEdicaoCategoria}
                >
                  <Ionicons name="close" size={16} color={colors.white} />
                </TouchableOpacity>
              </View>
            ) : (
              // Modo de visualização da categoria
              <View style={components.row}>
                <TouchableOpacity
                  style={{ flex: 1 }}
                  onPress={() => setAberto(aberto === cat.id ? null : cat.id)}
                >
                  <Text style={[typography.styles.body, { color: colors.gray800 }]}>
                    {cat.nome}
                  </Text>
                  <Text style={[typography.styles.caption, { color: colors.gray500, marginTop: 2 }]}>
                    {cat.subcategorias?.length || 0} subcategorias
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{ padding: spacing.sm }}
                  onPress={() => iniciarEdicaoCategoria(cat)}
                >
                  <Ionicons name="pencil-outline" size={18} color={colors.primary} />
                </TouchableOpacity>

                <TouchableOpacity
                  style={{ padding: spacing.sm }}
                  onPress={() => handleDeletarCat(cat)}
                >
                  <Ionicons name="trash-outline" size={18} color={colors.error} />
                </TouchableOpacity>

                <TouchableOpacity
                  style={{ padding: spacing.sm }}
                  onPress={() => setAberto(aberto === cat.id ? null : cat.id)}
                >
                  <Ionicons 
                    name={aberto === cat.id ? "chevron-up" : "chevron-down"} 
                    size={18} 
                    color={colors.gray500} 
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* Área Expandida (Subcategorias) */}
          {aberto === cat.id && (
            <View
              style={[
                components.card,
                {
                  marginTop: -2,
                  borderTopLeftRadius: 0,
                  borderTopRightRadius: 0,
                  backgroundColor: colors.gray50,
                }
              ]}
            >
              {cat.subcategorias &&
                cat.subcategorias.map((sub) => (
                  <View
                    key={sub.id}
                    style={{
                      marginBottom: spacing.md,
                      paddingBottom: spacing.sm,
                      borderBottomWidth: 0.5,
                      borderBottomColor: colors.gray200,
                    }}
                  >
                    {editandoSubcategoria === sub.id ? (
                      // Modo de edição da subcategoria
                      <View style={[components.row, { gap: spacing.sm }]}>
                        <TextInput
                          style={[components.input, { flex: 1, minHeight: 36 }]}
                          value={nomeEditSubcategoria}
                          onChangeText={setNomeEditSubcategoria}
                          placeholder="Nome da subcategoria"
                          autoFocus
                        />
                        <TouchableOpacity
                          style={[components.buttonSmall, { backgroundColor: colors.success, paddingHorizontal: spacing.sm }]}
                          onPress={() => salvarEdicaoSubcategoria(sub.id, cat.id)}
                          disabled={carregandoEdit}
                        >
                          {carregandoEdit ? (
                            <ActivityIndicator size="small" color={colors.white} />
                          ) : (
                            <Ionicons name="checkmark" size={14} color={colors.white} />
                          )}
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={[components.buttonSmall, { backgroundColor: colors.gray400, paddingHorizontal: spacing.sm }]}
                          onPress={cancelarEdicaoSubcategoria}
                        >
                          <Ionicons name="close" size={14} color={colors.white} />
                        </TouchableOpacity>
                      </View>
                    ) : (
                      // Modo de visualização da subcategoria
                      <View style={components.row}>
                        <Text style={[typography.styles.bodySmall, { flex: 1, color: colors.gray700 }]}>
                          • {sub.nome}
                        </Text>
                        <TouchableOpacity
                          style={{ padding: spacing.xs }}
                          onPress={() => iniciarEdicaoSubcategoria(sub)}
                        >
                          <Ionicons name="pencil-outline" size={16} color={colors.primary} />
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={{ padding: spacing.xs }}
                          onPress={() =>
                            subCategoriaService.excluir(sub.id).then(aoAtualizar)
                          }
                        >
                          <Ionicons name="close-circle-outline" size={16} color={colors.error} />
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                ))}

              {/* Input para adicionar nova sub na hora */}
              <View style={[components.row, { marginTop: spacing.md, gap: spacing.sm }]}>
                <TextInput
                  style={[components.input, { flex: 1, minHeight: 40 }]}
                  placeholder="Nova subcategoria..."
                  value={novaSub}
                  onChangeText={setNovaSub}
                />
                <TouchableOpacity
                  style={[components.buttonSmall, components.buttonPrimary, { paddingHorizontal: spacing.md }]}
                  onPress={() => handleAddSubEmExistente(cat.id)}
                  disabled={carregandoSub}
                >
                  {carregandoSub ? (
                    <ActivityIndicator size="small" color={colors.white} />
                  ) : (
                    <Ionicons name="add" size={18} color={colors.white} />
                  )}
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      ))}

      {categorias.length === 0 && (
        <View style={[components.card, utils.flex.center, { padding: spacing['3xl'] }]}>
          <Ionicons name="folder-outline" size={48} color={colors.gray400} />
          <Text style={[typography.styles.body, { color: colors.gray500, marginTop: spacing.md, textAlign: 'center' }]}>
            Nenhuma categoria cadastrada.
          </Text>
          <Text style={[typography.styles.caption, { color: colors.gray400, marginTop: spacing.xs, textAlign: 'center' }]}>
            Use o formulário acima para criar sua primeira categoria.
          </Text>
        </View>
      )}
    </ScrollView>
  );
}
