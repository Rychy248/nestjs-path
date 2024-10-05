import { Controller, Get, Put, Delete, Post, Body, HttpException, HttpStatus, Param, ParseIntPipe, Injectable, Inject} from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDTO } from './dto/create-song-dto';
import { Connection } from 'src/common/constants/connection';

@Controller('songs')
export class SongsController {

  constructor(
    private songsService: SongsService,
    @Inject('CONNECTION_DB') // provider as no-class-based. Setting the defined key/token
    private connection: Connection, // provider as no-class-based. Defining the var for injection
  ){
    console.log(`This is the connection: ${JSON.stringify(this.connection)}`); // provider as no-class-based. Using the var.
  };

  @Get()
  findAll(){
    try{
      const songs = this.songsService.findAll();
      return {
        msg:'Find all songs :)',
        songs
      };
    }catch(e){
      throw new HttpException(
        'Data Base no responding',
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause:e,
        },
      );
    };
  };

  @Get(':id')
  findOne( 
    @Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id:number
  ){
    return `Searching for the specific Id song: ${id}`;
  };

  @Post()
  Create(@Body() createSongDTO:CreateSongDTO){
    const songs = this.songsService.create(createSongDTO);
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