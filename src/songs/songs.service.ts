import { Injectable, Scope } from '@nestjs/common';
import { CreateSongDTO } from './dto/create-song-dto';
import { InsertResult, Repository } from 'typeorm';
import { Song } from 'src/models/songs.entity';
import { InjectRepository } from '@nestjs/typeorm';

// ABOUT SCOPES
/**
 * The provider can be shared across multiple classes. The provider lifetime
 * is strictly tied to the application lifecycle. Once the application has
 * bootstrapped, all providers have been instantiated.
 */
// DEFAULT = 0, // for all app
/**
 * A new private instance of the provider is instantiated for every use
 */
// TRANSIENT = 1, // for every customer
/**
   * A new instance is instantiated for each request processing pipeline
   */
  // REQUEST = 2 // for every request

@Injectable({
  scope:Scope.DEFAULT,
})
export class SongsService {

  // local array
  private readonly songs:CreateSongDTO[] = [];
  constructor(
    @InjectRepository(Song)
    private songsRepository: Repository<Song>
  ){};

  findAll():Promise<Song[]>{

    //Errors come while fetching the data from DB
    // throw new Error('Error in DB while fetching record');

    return this.songsRepository.find();
  };

  create(song:CreateSongDTO):Promise<InsertResult>{
    // this.songs.push(song);
    return this.songsRepository.insert(song);
  };


};