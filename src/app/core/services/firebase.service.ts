import { Injectable, inject } from '@angular/core';
import {
  Auth,
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
} from '@angular/fire/auth';
import {
  Firestore,
  setDoc,
  doc,
  getFirestore,
  getDoc,
  addDoc,
  collection,
  collectionData,
  query,
  updateDoc,
  CollectionReference,
  where,
} from '@angular/fire/firestore';
import { UtilsService } from './utils.service';
import {
  Storage,
  getStorage,
  uploadString,
  ref,
  getDownloadURL,
  deleteObject,
} from '@angular/fire/storage';
import { User } from '@core/interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  auth = inject(Auth);
  firestore = inject(Firestore);
  utilsService = inject(UtilsService);
  storage = inject(Storage);

  getAuth() {
    return getAuth();
  }

  signIn(user: User) {
    return signInWithEmailAndPassword(getAuth(), user.email, user.password);
  }

  signUp(user: User) {
    return createUserWithEmailAndPassword(getAuth(), user.email, user.password);
  }

  updateUser(displayName: string) {
    return updateProfile(getAuth().currentUser, { displayName });
  }

  sendRecoveryEmail(email: string) {
    return sendPasswordResetEmail(getAuth(), email);
  }

  signOut() {
    getAuth().signOut();
    localStorage.removeItem('user');
    this.utilsService.routerLink('auth');
  }

  getCollectionData(path: string, conditions: any[] = []) {
    const ref: CollectionReference = collection(this.firestore, path);
    const q = query(
      ref,
      where('estado', '==', true),
      ...conditions
    );
    return collectionData(q, { idField: 'id' });
  }

  setDocument(path: string, data: any) {
    return setDoc(doc(getFirestore(), path), data);
  }

  updateDocument(path: string, data: any) {
    return updateDoc(doc(getFirestore(), path), data);
  }

  deleteteDocument(path: string) {
    const docRef = doc(getFirestore(), path);
    return updateDoc(docRef, { estado: false });
  }

  async getDocument(path: string) {
    return (await getDoc(doc(getFirestore(), path))).data();
  }

  addDocument(path: string, data: any) {
    return addDoc(collection(getFirestore(), path), data);
  }

  async uploadImage(path: string, dataUrl: string) {
    return uploadString(ref(getStorage(), path), dataUrl, 'data_url').then(
      () => {
        return getDownloadURL(ref(getStorage(), path));
      }
    );
  }

  async getFilePath(url: string) {
    return ref(getStorage(), url).fullPath;
  }

  deleteFile(path: string) {
    return deleteObject(ref(getStorage(), path));
  }
}
