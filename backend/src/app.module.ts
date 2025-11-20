import { Module } from "@nestjs/common";
import { AcceptLanguageResolver, I18nModule, QueryResolver } from "nestjs-i18n";
import * as path from "path";
import { AuthModule } from "./infrastructure/modules/auth.module";
import { UserModule } from "./infrastructure/modules/user.module";
import { TaskModule } from "./infrastructure/modules/task.module";

@Module({
  imports: [
    I18nModule.forRoot({
      fallbackLanguage: "en",
      loaderOptions: {
        path: path.join(__dirname, "/i18n/"),
        watch: true,
      },
      resolvers: [
        { use: QueryResolver, options: ["lang"] },
        AcceptLanguageResolver,
      ],
    }),
    AuthModule,
    UserModule,
    TaskModule,
  ],
})
export class AppModule {}
