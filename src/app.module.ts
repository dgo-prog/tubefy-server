import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import Config from 'bootstrap/js/src/util/config.js'


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env'
    })
  ],
})
export class AppModule {}