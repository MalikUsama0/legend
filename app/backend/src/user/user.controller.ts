import { Controller, Get, Post, Body, Patch, Param, Delete, Query,ParseIntPipe,HttpStatus,UsePipes,DefaultValuePipe , ParseArrayPipe} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ParseDatePipe } from './date-transform.pipe';
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

 @Post("/date")
 setDate(@Body("timestamp" ,ParseDatePipe) unixtime:number){
         console.log(unixtime,"unixtime")
         return unixtime
 }

  @Post()
  @UsePipes(ParseIntPipe) // we can also apply parseInt transformation through this way . this transformation will apply on all i mean : @Param("id"), @Query("increment") etc
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
  return "get all users from pratice"
  }

  @Get(':id')
  findOne(@Param('id', new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE})) id: string) {  // we can define pipes like this 
    
    return this.userService.findOne(+id);
  }
   @Get('search')
   searchUser(@Query('list', new ParseArrayPipe({items:Number})) list: any){ // ParseArrayPipe convert 1,2,3,4 into array of  numbers

   }
  @Patch(':id')
  update(@Param('id', new DefaultValuePipe(67)) id: string, @Body() updateUserDto: UpdateUserDto) { // in here we can set default value through DefaultValuePipe. if data not come from request
    return this.userService.update(+id, updateUserDto); 
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
