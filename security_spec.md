# Security Specification for ParkEase

## Data Invariants
1. **Ownership Integrity**: Marketplaces, Products, and Orders must belong to a valid `userId` which matches the creator's `request.auth.uid`.
2. **Parking Management**: Only the `managerId` can modify `ParkingLot` and its sub-collections (`slots`).
3. **Driver Agency**: Only the `driverId` can create or modify their own `ParkingReservation`.
4. **Relational Sync**: A `ParkingReservation` cannot be created if the `parkingLotId` and `slotId` do not exist.
5. **Terminal States**: Completed or Cancelled orders/reservations cannot be reverted to "pending" or "active".
6. **Immutable Fields**: `userId`, `managerId`, `driverId`, and `createdAt` are immutable after document creation.

## The Dirty Dozen Payloads (ID, Integrity, State)
1. **Spoofing Ownership**: Creating a product with `userId` of another user.
2. **Junk ID Poisoning**: Using a 1MB string as a `productId`.
3. **State Skip**: Updating an order status directly from `pending` to `completed` bypassing `shipped`.
4. **Member Hijack**: Non-owners attempting to list all products.
5. **Ghost Field Injection**: Adding an `isAdmin` field to a product payload during update.
6. **Self-Assigned Admin**: Attempting to create a document in a restricted `admins` collection (if it existed).
7. **Negative Stock**: Updating product stock to `-100`.
8. **Broken Timer**: Setting `updatedAt` to a future date instead of `request.time`.
9. **Slot Overwrite**: A user modifying a parking slot they don't manage.
10. **Reservation Theft**: Cancelling someone else's parking reservation.
11. **Shadow Update**: Updating a product but changing its `sku` (which should be restricted/validated).
12. **Null Bypass**: Creating a product with missing required fields.

## Test Runner Plan
We will use `vitest` and `@firebase/rules-unit-testing` (once dependencies are checked/installed) to verify these.
Since I am an AI, I will write the `DRAFT_firestore.rules` and verify them manually against these principles first.
