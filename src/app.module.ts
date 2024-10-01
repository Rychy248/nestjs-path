import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsModule } from './songs/songs.module';
import { AppConfig } from '../config';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    SongsModule,
    ConfigModule.forRoot({ 
      envFilePath:['.env','.env.local'],
      isGlobal:true,
      load:[AppConfig],
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})


export class AppModule {}

