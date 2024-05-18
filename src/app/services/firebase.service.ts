import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {userData} from "../data/user-data";

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private firestore: AngularFirestore) {}

  // Get a collection
  getCollection<T>(collectionName: string) {
    return this.firestore.collection<T>(collectionName);
  }

  // Get a document by ID
  getDocument<T>(collectionName: string, id: string) {
    return this.firestore.doc<T>(`${collectionName}/${id}`);
  }

  //
  // setData(collectionName: string, key: string, value: any){
  //   return this.firestore.doc().set()
  // }

  // Create a document
  createDocument<T>(collectionName: string, data: T) {
    return this.firestore.collection(collectionName).add(data);
  }

  // Update a document
  updateDocument<T>(collectionName: string, id: string, data: Partial<T>) {
    return this.firestore.doc(`${collectionName}/${id}`).update(data);
  }

  // Delete a document
  deleteDocument(collectionName: string, id: string) {
    return this.firestore.doc(`${collectionName}/${id}`).delete();
  }

  getUserData(email: any) {
    return this.firestore.collection<userData>('userData', ref => ref.where('email', '==', email).limit(1))
  }

}
