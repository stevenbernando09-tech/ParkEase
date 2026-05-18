import { 
  collection, 
  doc, 
  getDocFromServer, 
  setDoc, 
  getDocs, 
  query, 
  where,
  serverTimestamp,
  Timestamp 
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';

// Helper to check connection
export async function testFirestoreConnection() {
  const path = 'test/connection';
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error("Please check your Firebase configuration.");
    }
    // We don't necessarily throw here if it's just a test, 
    // but in rule development it's good to know.
  }
}

// Marketplace Services
export async function createMarketplace(userId: string, data: { platformName: string; status: string; apiKey?: string; apiSecret?: string }) {
  const marketplaceId = crypto.randomUUID();
  const path = `marketplaces/${marketplaceId}`;
  try {
    await setDoc(doc(db, 'marketplaces', marketplaceId), {
      ...data,
      userId,
      updatedAt: serverTimestamp()
    });
    return marketplaceId;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

// Product Services
export async function getProducts(userId: string) {
  const path = 'products';
  try {
    const q = query(collection(db, 'products'), where('userId', '==', userId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
  }
}

export async function createProduct(userId: string, data: { name: string; sku: string; stock: number; price: number }) {
  const productId = crypto.randomUUID();
  const path = `products/${productId}`;
  try {
    await setDoc(doc(db, 'products', productId), {
      ...data,
      userId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return productId;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

// Parking Services
export async function getParkingLots() {
  const path = 'parkingLots';
  try {
    const snapshot = await getDocs(collection(db, 'parkingLots'));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
  }
}
