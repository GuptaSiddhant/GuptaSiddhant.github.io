import {
  deleteObject,
  getBlob,
  getDownloadURL,
  getMetadata,
  ref,
  updateMetadata,
  uploadBytes,
  uploadBytesResumable,
  type FullMetadata,
  type StorageReference,
  type UploadMetadata,
  type UploadResult,
  type UploadTask,
} from "firebase/storage"

import { storageInstance } from "./firebase"
import { logToFirebase } from "./analytics"

function getRef(path: string): StorageReference {
  return ref(storageInstance, path)
}

export async function getFileURLWithPath(path: string): Promise<string> {
  return tryCatch(path, () => getDownloadURL(getRef(path)))
}

export async function getFileMetadataWithPath(
  path: string,
): Promise<FullMetadata> {
  return tryCatch(path, () => getMetadata(getRef(path)))
}

export async function setFileMetadataWithPath(
  path: string,
  metadata: Partial<FullMetadata>,
): Promise<any> {
  return tryCatch(path, () => updateMetadata(getRef(path), metadata))
}

export async function getFileBlobWithPath(
  path: string,
  maxBytes?: number,
): Promise<Blob> {
  return tryCatch(path, () => getBlob(getRef(path), maxBytes))
}

export async function deleteFileWithPath(path: string): Promise<void> {
  return tryCatch(path, () => deleteObject(getRef(path)))
}

export async function uploadFileWithPath(
  path: string,
  data: File | Blob,
  metadata?: Partial<UploadMetadata>,
): Promise<UploadResult> {
  return await uploadBytes(getRef(path), data, metadata)
}

export function uploadFileResumableWithPath(
  path: string,
  data: File | Blob,
  metadata?: Partial<UploadMetadata>,
): UploadTask {
  const uploadTask = uploadBytesResumable(getRef(path), data, metadata)
  uploadTask.catch((error) => handleStorageErrors(error, path))

  return uploadTask
}

// Browser only
export async function downloadFileWithPath(path: string): Promise<void> {
  const blob = await getFileBlobWithPath(path)
  const metadata = await getFileMetadataWithPath(path)

  const link = document.createElement("a")
  link.href = URL.createObjectURL(blob)
  link.download = metadata.name
  link.click()
}

async function tryCatch<T>(
  path: string,
  callback: () => T | Promise<T>,
): Promise<T> {
  try {
    return await callback()
  } catch (error: any) {
    handleStorageErrors(error, path)
  }
}

function handleStorageErrors(error: any, path: string): never {
  switch (error.code) {
    case "storage/object-not-found":
      logStorageEvent({ path, message: "File doesn't exist" })
      break
    case "storage/unauthorized":
      logStorageEvent({
        path,
        message: "User doesn't have permission to access the object",
      })
      break
    case "storage/canceled":
      logStorageEvent({
        path,
        message: "User canceled the upload",
      })
      break
    case "storage/unknown":
    default:
      logStorageEvent({
        path,
        message: "Unknown error occurred",
      })
      break
  }

  throw new Error(error.code)
}

function logStorageEvent(eventParams: { path: string; message?: string }) {
  logToFirebase("storage_event", { ...eventParams, type: "error" })
}
