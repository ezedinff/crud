export interface ApiRequestConfig {
  url: string;
  method: "POST" | "GET" | "PUT" | "DELETE",
  body: any;
}