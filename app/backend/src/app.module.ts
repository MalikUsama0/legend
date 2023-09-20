import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RouterModule } from '@nestjs/core';
import { UserModule } from './user/user.module';
@Module({
  imports: [
    UserModule,
    RouterModule.register([{path:"user",module:UserModule}])// we can define endpoint of whole module through routerModule but its not recommended way to define end points of controllers
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
