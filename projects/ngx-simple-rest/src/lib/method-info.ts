
export interface MethodInfo {
  name: string,
  type?: string,
  appendBody?: boolean
  headers?: Header[],
  options?: any[]
}

export interface Header {
  name: string;
  value: string;
}

export interface Option {
  name: string;
  value: any;
}