import { 
  collection, 
  doc, 
  getDocFromServer, 
  getDoc,
  setDoc, 
  getDocs, 
  query, 
  where,
  deleteDoc,
  serverTimestamp,
  updateDoc
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';

// Helper to check connection
export async function testFirestoreConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error("Please check your Firebase configuration.");
    }
  }
}

// Map React slot status ("Tersedia" / "Terisi") to Firestore rules ['empty', 'occupied', 'reserved', 'maintenance']
export function mapStatusToFirestore(status: "Tersedia" | "Terisi"): "empty" | "occupied" {
  return status === "Tersedia" ? "empty" : "occupied";
}

export function mapStatusToReact(status: string): "Tersedia" | "Terisi" {
  return status === "empty" ? "Tersedia" : "Terisi";
}

// Product Services
export async function getProducts(userId: string) {
  const path = 'products';
  try {
    const q = query(collection(db, 'products'), where('userId', '==', userId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name || '',
        sku: data.sku || '',
        stock: Number(data.stock) || 0,
        price: Number(data.price) || 0,
        createdAt: typeof data.createdAt === 'string' ? data.createdAt : new Date().toISOString().split('T')[0]
      };
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
    return [];
  }
}

export async function createProduct(userId: string, data: { id: string; name: string; sku: string; stock: number; price: number }) {
  const path = `products/${data.id}`;
  try {
    await setDoc(doc(db, 'products', data.id), {
      name: data.name,
      sku: data.sku,
      stock: Number(data.stock),
      price: Number(data.price),
      userId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return data.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

export async function deleteProductFromDb(productId: string) {
  const path = `products/${productId}`;
  try {
    await deleteDoc(doc(db, 'products', productId));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

// Parking Lot & Slots Services
// To make parking lots fully multi-tenant, we register a central parking lot per-user, e.g., "main-lot-"+userId
export async function ensureParkingLotExists(userId: string, lotId: string, lotName: string) {
  const path = `parkingLots/${lotId}`;
  try {
    const lotRef = doc(db, 'parkingLots', lotId);
    const snap = await getDoc(lotRef);
    if (!snap.exists()) {
      await setDoc(lotRef, {
        managerId: userId,
        name: lotName,
        totalSlots: 8,
        availableSlots: 8,
        createdAt: serverTimestamp()
      });
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

export async function getParkingSlots(lotId: string) {
  const path = `parkingLots/${lotId}/slots`;
  try {
    const snapshot = await getDocs(collection(db, 'parkingLots', lotId, 'slots'));
    if (snapshot.empty) return [];
    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.slotNumber || doc.id,
        area: data.area || 'Utara',
        status: mapStatusToReact(data.status),
        type: (data.type || 'Mobil') as "Mobil" | "Motor"
      };
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
    return [];
  }
}

export async function createOrUpdateParkingSlot(lotId: string, slot: { id: string; name: string; area: string; status: "Tersedia" | "Terisi"; type: "Mobil" | "Motor" }) {
  const path = `parkingLots/${lotId}/slots/${slot.id}`;
  try {
    await setDoc(doc(db, 'parkingLots', lotId, 'slots', slot.id), {
      parkingLotId: lotId,
      slotNumber: slot.name,
      area: slot.area,
      status: mapStatusToFirestore(slot.status),
      type: slot.type,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function updateParkingSlotStatus(lotId: string, slotId: string, status: "Tersedia" | "Terisi") {
  const path = `parkingLots/${lotId}/slots/${slotId}`;
  try {
    await updateDoc(doc(db, 'parkingLots', lotId, 'slots', slotId), {
      status: mapStatusToFirestore(status),
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}
