import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Playlist } from 'src/models/playlist.entity';
import { Song } from 'src/models/songs.entity';

export const dbConfig = ():TypeOrmModuleOptions => ({
  type: process.env.BD_TYPE as 'postgres' | 'mysql',
  host: `${process.env.BD_HOST}`,
  port: parseInt(process.env.BD_PORT, 10),
  username: `${process.env.BD_USERNAME}`,
  password: `${process.env.BD_PASSWORD}`,
  database: `${process.env.BD_DATABASE}`,
  // entities: process.env.NODE_ENV === 'development'
  //   ? ['src/models/*.entity.ts']
  //   : ['dist/models/*.entity.js'],
  entities: [Playlist, Song] , // reference bullCreating all the entities from the main repository
  synchronize: process.env.NODE_ENV === 'development',
  logging: process.env.NODE_ENV === 'development',
});

export default dbConfig;
