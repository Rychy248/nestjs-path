import { Module } from '@nestjs/common';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';
import mockSonsService from './mock/mock-songs-service';
import { connection, Connection } from 'src/common/constants/connection';
import { ModelsModel } from 'src/models/models.module';

@Module({
  imports: [ ModelsModel ], // importing all models
  controllers: [SongsController],
  providers: [
    /** STANDARD USE OF PROVIDERS */
    SongsService, // Syntax form 1
    // { // Syntax form 2
    //   provide :SongsService,
    //   useClass:SongsService
    // },
    
    /** VALUE PROVIDERS : Useful to build sandbox envs. If this exist, the Standard one will be replaced */
    // {
    //   provide: SongsService,
    //   useValue: mockSonsService,
    // },

    /** Non Class Based Providers : Inject any object as a dependency*/
    {
      provide:'CONNECTION_DB', // it's need a token (name)
      useValue: connection
    },
    
    /** Non Class Based Providers : Inject any object as a dependency*/

  ]
})

export class SongsModule {};
