import { Inject, Injectable } from '@nestjs/common';
import { DevConfigService } from './common/providers/DevConfigService';

@Injectable()
export class AppService {

  constructor(
    private devConfigService:DevConfigService,
    @Inject('CONFIG_APP')  // using provider as a non service provider
    private config:{ port:string }, // using provider as a non service provider
  ){};

  getHello(): string {

    return `Hello World, i'm learning nestJs! \n${
      JSON.stringify(this.devConfigService)
    } PORT: ${this.config.port}`;
  };

};
