import { Command, Console } from 'nestjs-console';
import { SeedService } from './seed.service';

@Console()
export class SeedCommand {
  constructor(private readonly seedService: SeedService) {}

  @Command({
    command: 'seed',
    description: 'Seed the database',
  })
  async seed() {
    await this.seedService.seed();
    console.log('Database seeded successfully');
  }
}
