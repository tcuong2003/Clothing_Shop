interface RequestConfig {
  headers?: Record<string, string>;
  params?: Record<string, any>;
  body?: any;
  timeout?: number;
}

interface ApiResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: Headers;
}

class ApiService {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;
  private timeout: number;

  constructor(baseURL: string = "", timeout: number = 30000) {
    this.baseURL = baseURL;
    this.timeout = timeout;
    this.defaultHeaders = {
      "Content-Type": "application/json",
    };
  }

  setAuthToken(token: string) {
    this.defaultHeaders["Authorization"] = `Bearer ${token}`;
  }

  removeAuthToken() {
    delete this.defaultHeaders["Authorization"];
  }

  private buildURL(endpoint: string, params?: Record<string, any>): string {
    const url = new URL(endpoint, this.baseURL);

    if (params) {
      Object.keys(params).forEach((key) => {
        if (params[key] !== undefined && params[key] !== null) {
          url.searchParams.append(key, params[key].toString());
        }
      });
    }

    return url.toString();
  }

  private async request<T = any>(
    method: string,
    endpoint: string,
    config: RequestConfig = {}
  ): Promise<ApiResponse<T>> {
    const { headers = {}, params, body, timeout = this.timeout } = config;

    const url = this.buildURL(endpoint, params);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        method,
        headers: {
          ...this.defaultHeaders,
          ...headers,
        },
        body: body ? JSON.stringify(body) : undefined,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      let data: T;
      const contentType = response.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        data = (await response.text()) as any;
      }

      if (!response.ok) {
        throw {
          message: "Request failed",
          status: response.status,
          statusText: response.statusText,
          data,
        };
      }

      return {
        data,
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
      };
    } catch (error: any) {
      clearTimeout(timeoutId);

      if (error.name === "AbortError") {
        throw new Error("Request timeout");
      }

      throw error;
    }
  }

  async get<T = any>(
    endpoint: string,
    config?: Omit<RequestConfig, "body">
  ): Promise<ApiResponse<T>> {
    return this.request<T>("GET", endpoint, config);
  }

  async post<T = any>(
    endpoint: string,
    body?: any,
    config?: Omit<RequestConfig, "body">
  ): Promise<ApiResponse<T>> {
    return this.request<T>("POST", endpoint, { ...config, body });
  }

  async patch<T = any>(
    endpoint: string,
    body?: any,
    config?: Omit<RequestConfig, "body">
  ): Promise<ApiResponse<T>> {
    return this.request<T>("PATCH", endpoint, { ...config, body });
  }

  async delete<T = any>(
    endpoint: string,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    return this.request<T>("DELETE", endpoint, config);
  }

  async put<T = any>(
    endpoint: string,
    body?: any,
    config?: Omit<RequestConfig, "body">
  ): Promise<ApiResponse<T>> {
    return this.request<T>("PUT", endpoint, { ...config, body });
  }
}

const apiService = new ApiService(process.env.URL_BASE || "https://dummyjson.com" );

export default apiService;