import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsModule } from './songs/songs.module';
import { AppConfig } from './config';
import { ConfigModule } from '@nestjs/config';
import { LoggerMiddleware } from './common/middleware/loggerMiddleware.middleware';
import { SongsController } from './songs/songs.controller';
import { DevConfigService } from './common/providers/DevConfigService';
import { proAppConfig, devAppConfig } from './common/config/appCofing';
import dbConfig from 'src/config/dbConfig';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    SongsModule,
    ConfigModule.forRoot({ 
      envFilePath:['.env','.env.local'],
      isGlobal:true,
      load:[AppConfig],
    }),
    TypeOrmModule.forRoot(dbConfig())
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { // Using provider, as a class
      provide:DevConfigService, 
      useClass:DevConfigService
    },
    { // Using provider, as Non service provider
      provide:'CONFIG_APP',
      useFactory:() => process.env.NODE_ENV === 'production' ? proAppConfig : devAppConfig
    }
  ],
})


export class AppModule implements NestModule{

  constructor(private dataSource:DataSource){};

  /** WAYS TO USE A MIDDLEWARE - START*/
  configure(consumer: MiddlewareConsumer) {
    /** // OPTION NO 1 TO APPLY A MIDDLEWARE to an entire base path
      consumer.apply(LoggerMiddleware).forRoutes('songs');
     */

    /** // OPTION NO 2 TO APPLY A MIDDLEWARE - specific method
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({
        path: 'songs',
        method: RequestMethod.POST
    });
    */

    /** // OPTION NO 3 TO APPLY A MIDDLEWARE - for a controller
     */
    consumer.apply(LoggerMiddleware)
      .forRoutes(SongsController);
  /** WAYS TO USE A MIDDLEWARE - END*/

  };
};

