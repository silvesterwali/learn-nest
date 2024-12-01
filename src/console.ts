import { BootstrapConsole } from 'nestjs-console';
import { SeedModule } from './seed/seed.module';

const bootstrap = new BootstrapConsole({
  module: SeedModule,
  useDecorators: true,
});
bootstrap.init().then(async (app) => {
  try {
    await app.init();
    await bootstrap.boot();
    await app.close();
  } catch (e) {
    console.error(e);
    await app.close();
    process.exit(1);
  }
});
