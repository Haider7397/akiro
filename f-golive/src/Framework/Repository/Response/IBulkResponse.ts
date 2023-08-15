export interface IBulkResponse<T> {
  resources: Array<T>
  count: number
}
