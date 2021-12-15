export type APITemplateResponse = {
  code: number;
  message: string;
  data: any[] | {} | null | undefined;
};

export interface APIResponse {
  code: number;
  data: any[] | null;
  message: string;
}