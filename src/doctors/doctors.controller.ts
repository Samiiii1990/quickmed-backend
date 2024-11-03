// doctors.controller.ts
import { Controller, Get, Post, Body } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { DoctorDto } from './dto/doctor.dto';


@Controller('doctors')
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @Get()
  async findAll(): Promise<DoctorDto[]> {
    return this.doctorsService.findAll();
  }

  @Post()
  async create(@Body() doctorDto: DoctorDto): Promise<DoctorDto> {
    return this.doctorsService.create(doctorDto);
  }
}
