export interface FaceRecognitionInterface<T> {
  detectFace(imageBase64: string): Promise<T>
  addFace(userId: string, imageUrl: string): Promise<T>
  searchFace(faceId: string): Promise<T>
  setUserId(userId: string, faceId: string): Promise<T>
}
