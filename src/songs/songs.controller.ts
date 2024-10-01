import { Controller, Get, Put, Delete, Post} from '@nestjs/common';
import { SongsService } from './songs.service';

@Controller('songs')
export class SongsController {

  constructor(private songsService:SongsService){

  };

  @Get()
  findAll(){
    const songs = this.songsService.findAll();
    return {
      msg:'Find all songs :)',
      songs
    };
  };

  @Get(':id')
  findOne(){
    return 'Find a specific id song';
  };

  @Post()
  Create(){
    const songs = this.songsService.create({name:'someSong'});
    return {
      msg:'New song was created',
      songs
    };
  }

  @Put(':id')
  Update(){
    return 'Update a specific id song';
  };

  @Delete(':id')
  Delete(){
    return 'Delete a specific id song';
  };


};