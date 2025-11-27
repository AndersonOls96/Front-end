import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import { auth } from "@/firebase";

/**
 * Registra um novo usuário
 * @param {string} email - Email do usuário
 * @param {string} password - Senha do usuário
 * @returns {Promise} Promessa com dados do usuário
 */
export const registerUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * Faz login de um usuário existente
 * @param {string} email - Email do usuário
 * @param {string} password - Senha do usuário
 * @returns {Promise} Promessa com dados do usuário
 */
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * Faz logout do usuário
 * @returns {Promise} Promessa que resolve quando logout é concluído
 */
export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * Observa mudanças no estado de autenticação
 * @param {Function} callback - Função chamada quando o estado muda
 * @returns {Function} Função para desinscrever do listener
 */
export const onAuthStateChangedListener = (callback) => {
  return onAuthStateChanged(auth, callback);
};

/**
 * Obtém o usuário atualmente autenticado
 * @returns {Object} Objeto do usuário ou null
 */
export const getCurrentUser = () => {
  return auth.currentUser;
};