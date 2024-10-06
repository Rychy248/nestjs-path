


import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Song } from "./songs.entity";
import { Playlist } from "./playlist.entity";

@Module({
  imports: [TypeOrmModule.forFeature([
    Song, Playlist
  ])],
  exports:[TypeOrmModule]
})
export class ModelsModel{}