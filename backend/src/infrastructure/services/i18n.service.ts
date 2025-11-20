import { Injectable } from "@nestjs/common";
import { I18nService as NestI18nService } from "nestjs-i18n";
import { II18nService } from "../../domain/services/i18n.service.interface";

@Injectable()
export class I18nService implements II18nService {
  constructor(private readonly i18n: NestI18nService) {}

  translate(key: string, options?: { lang?: string; args?: any }): string {
    return this.i18n.translate(key, {
      lang: options?.lang || "en",
      args: options?.args,
    });
  }
}
