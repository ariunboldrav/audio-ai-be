import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FileAnswersService } from './file_answers.service';
import { CreateFileAnswerDto } from './dto/create-file_answer.dto';
import { UpdateFileAnswerDto } from './dto/update-file_answer.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CampaignService } from '../campaign/campaign.service';

@Controller('file-answers')
export class FileAnswersController {
  constructor(
    private readonly fileAnswersService: FileAnswersService,
    private readonly campaignService: CampaignService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post(':id')
  async create(
    @Body() createFileAnswerDto: CreateFileAnswerDto,
    @Request() req,
    @Param('id') id: number,
  ) {
    const campaign = await this.campaignService.findOne(id);
    console.log(campaign);
    // TODO Check User
    createFileAnswerDto.campaign = campaign;
    if (!campaign.fileAnswer) {
      const fileAnswer = await this.fileAnswersService.create(createFileAnswerDto);
      throw new HttpException(fileAnswer, HttpStatus.OK);
    } else {
      const content = await this.fileAnswersService.update(
        +campaign.fileAnswer.id,
        createFileAnswerDto,
      );
      throw new HttpException(content, HttpStatus.OK);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.fileAnswersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Request() req, @Param('id') id: number) {
    const campaign = await this.campaignService.findOne(id);
    if (campaign) {
      throw new HttpException(campaign.fileAnswer, HttpStatus.OK);
    } else {
      throw new HttpException(
        { message: 'Мэдээлэл олдсонгүй' },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Request() req,
    @Body() updateFileAnswerDto: UpdateFileAnswerDto,
  ) {
    return this.fileAnswersService.update(+id, updateFileAnswerDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.fileAnswersService.remove(+id);
  }
}
