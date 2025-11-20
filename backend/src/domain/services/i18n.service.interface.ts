export interface II18nService {
  translate(key: string, options?: { lang?: string; args?: any }): string;
}
