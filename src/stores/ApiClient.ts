import axios, { AxiosRequestConfig } from "axios";

const DEFAULT_API_VERSION = "v1";

class ApiClient {
  private apiVersion: string;
  private resource: string;
  private defaultHeaders: Record<string, string> = {};

  constructor(
    resource: string,
    options: { apiVersion?: string; headers?: Record<string, string> } = {}
  ) {
    this.apiVersion = `/api/${options.apiVersion || DEFAULT_API_VERSION}`;
    this.resource = resource;
    this.defaultHeaders = options.headers || {};
    // For now lets hard code 'api_access_token: bj2GSWhRH6rktMSQfUtV7Sg4'
  }

  private get url() {
    // return `${this.apiVersion}/${this.resource}`;
    return "https://api.npoint.io/c0a39d00b2e850b4bee9";
  }

  setDefaultHeaders(headers: Record<string, string>) {
    this.defaultHeaders = { ...this.defaultHeaders, ...headers };
  }

  private createConfig(
    customHeaders?: Record<string, string>
  ): AxiosRequestConfig {
    return {
      headers: {
        ...this.defaultHeaders,
        ...customHeaders,
      },
    };
  }

  get(customHeaders?: Record<string, string>) {
    return axios.get(this.url, this.createConfig(customHeaders));
  }

  show(id: number, customHeaders?: Record<string, string>) {
    return axios.get(`${this.url}/${id}`, this.createConfig(customHeaders));
  }

  create(data: any, customHeaders?: Record<string, string>) {
    return axios.post(this.url, data, this.createConfig(customHeaders));
  }

  update(id: number, data: any, customHeaders?: Record<string, string>) {
    return axios.patch(
      `${this.url}/${id}`,
      data,
      this.createConfig(customHeaders)
    );
  }

  delete(id: number, customHeaders?: Record<string, string>) {
    return axios.delete(`${this.url}/${id}`, this.createConfig(customHeaders));
  }
}

export default ApiClient;
