import { NestApplication, NestFactory } from "@nestjs/core";
import { configureCors } from "@src/shared/helpers";
import { appConfig } from "@src/shared/config";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app: NestApplication = await NestFactory.create(AppModule);

  configureCors(app);

  await app.listen(appConfig.server.port);
}

bootstrap();
const test = "sdfsd";
