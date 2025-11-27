// src/services/linkService.js
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  onSnapshot
} from "firebase/firestore";
import { db } from "@/firebase";

/**
 * Adiciona um novo link ao Firestore
 * @param {string} userId - ID do usuário
 * @param {Object} linkData - Dados do link
 * @returns {Promise} Promessa com o ID do documento criado
 */
export const addLink = async (userId, linkData) => {
  try {
    const docRef = await addDoc(
      collection(db, "users", userId, "links"),
      {
        ...linkData,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    );
    return docRef.id;
  } catch (error) {
    throw new Error(`Erro ao adicionar link: ${error.message}`);
  }
};

/**
 * Obtém todos os links de um usuário
 * @param {string} userId - ID do usuário
 * @returns {Promise} Promessa com array de links
 */
export const getUserLinks = async (userId) => {
  try {
    const linksRef = collection(db, "users", userId, "links");
    const q = query(linksRef, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    throw new Error(`Erro ao buscar links: ${error.message}`);
  }
};

/**
 * Observa links em tempo real
 * @param {string} userId - ID do usuário
 * @param {Function} callback - Função chamada quando dados mudam
 * @returns {Function} Função para desinscrever do listener
 */
export const onUserLinksChanged = (userId, callback) => {
  try {
    const linksRef = collection(db, "users", userId, "links");
    const q = query(linksRef, orderBy("createdAt", "desc"));

    return onSnapshot(q, (querySnapshot) => {
      const links = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      callback(links);
    });
  } catch (error) {
    throw new Error(`Erro ao observar links: ${error.message}`);
  }
};

/**
 * Obtém um link específico
 * @param {string} userId - ID do usuário
 * @param {string} linkId - ID do link
 * @returns {Promise} Promessa com dados do link
 */
export const getLink = async (userId, linkId) => {
  try {
    const docRef = doc(db, "users", userId, "links", linkId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      };
    } else {
      throw new Error("Link não encontrado");
    }
  } catch (error) {
    throw new Error(`Erro ao buscar link: ${error.message}`);
  }
};

/**
 * Atualiza um link existente
 * @param {string} userId - ID do usuário
 * @param {string} linkId - ID do link
 * @param {Object} updateData - Dados a atualizar
 * @returns {Promise} Promessa que resolve quando atualização é concluída
 */
export const updateLink = async (userId, linkId, updateData) => {
  try {
    const docRef = doc(db, "users", userId, "links", linkId);
    await updateDoc(docRef, {
      ...updateData,
      updatedAt: new Date()
    });
  } catch (error) {
    throw new Error(`Erro ao atualizar link: ${error.message}`);
  }
};

/**
 * Deleta um link
 * @param {string} userId - ID do usuário
 * @param {string} linkId - ID do link
 * @returns {Promise} Promessa que resolve quando deleção é concluída
 */
export const deleteLink = async (userId, linkId) => {
  try {
    const docRef = doc(db, "users", userId, "links", linkId);
    await deleteDoc(docRef);
  } catch (error) {
    throw new Error(`Erro ao deletar link: ${error.message}`);
  }
};

/**
 * Obtém links filtrados por categoria
 * @param {string} userId - ID do usuário
 * @param {string} category - Categoria para filtrar
 * @returns {Promise} Promessa com array de links da categoria
 */
export const getLinksByCategory = async (userId, category) => {
  try {
    const linksRef = collection(db, "users", userId, "links");
    const q = query(
      linksRef,
      where("category", "==", category),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    throw new Error(`Erro ao buscar links por categoria: ${error.message}`);
  }
};

/**
 * Obtém todas as categorias únicas do usuário
 * @param {string} userId - ID do usuário
 * @returns {Promise} Promessa com array de categorias
 */
export const getUserCategories = async (userId) => {
  try {
    const links = await getUserLinks(userId);
    const categories = [...new Set(links.map((link) => link.category))];
    return categories.filter((cat) => cat); // Remove undefined
  } catch (error) {
    throw new Error(`Erro ao buscar categorias: ${error.message}`);
  }
};

/**
 * Incrementa o contador de cliques de um link
 * @param {string} userId - ID do usuário
 * @param {string} linkId - ID do link
 * @returns {Promise} Promessa que resolve quando atualização é concluída
 */
export const incrementClickCount = async (userId, linkId) => {
  try {
    const docRef = doc(db, "users", userId, "links", linkId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const currentCount = docSnap.data().clickCount || 0;
      await updateDoc(docRef, {
        clickCount: currentCount + 1,
        lastClickedAt: new Date()
      });
    }
  } catch (error) {
    throw new Error(`Erro ao incrementar cliques: ${error.message}`);
  }
};

/**
 * Compartilha um link com outro usuário
 * @param {string} ownerId - ID do proprietário do link
 * @param {string} linkId - ID do link
 * @param {string} sharedWithEmail - Email do usuário com quem compartilhar
 * @returns {Promise} Promessa que resolve quando compartilhamento é concluído
 */
export const shareLink = async (ownerId, linkId, sharedWithEmail) => {
  try {
    const docRef = doc(db, "users", ownerId, "links", linkId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const sharedWith = docSnap.data().sharedWith || [];
      if (!sharedWith.includes(sharedWithEmail)) {
        sharedWith.push(sharedWithEmail);
        await updateDoc(docRef, {
          sharedWith: sharedWith,
          sharedAt: new Date()
        });
      }
    }
  } catch (error) {
    throw new Error(`Erro ao compartilhar link: ${error.message}`);
  }
};

/**
 * Remove compartilhamento de um link
 * @param {string} ownerId - ID do proprietário do link
 * @param {string} linkId - ID do link
 * @param {string} email - Email do usuário a remover
 * @returns {Promise} Promessa que resolve quando remoção é concluída
 */
export const unshareLink = async (ownerId, linkId, email) => {
  try {
    const docRef = doc(db, "users", ownerId, "links", linkId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const sharedWith = (docSnap.data().sharedWith || []).filter((e) => e !== email);
      await updateDoc(docRef, {
        sharedWith: sharedWith
      });
    }
  } catch (error) {
    throw new Error(`Erro ao remover compartilhamento: ${error.message}`);
  }
};