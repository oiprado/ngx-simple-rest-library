
export interface MethodInfo {
  name: string,
  type?: string,
  requestParams?: boolean,
  appendBody?: boolean
  headers?: Header[]
}

export interface Header {
  name: string;
  value: string;
}