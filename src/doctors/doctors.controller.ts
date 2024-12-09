import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { DoctorDto } from './dto/doctor.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Doctors') // Agrupamos los endpoints bajo la etiqueta 'Doctors'
@Controller('doctors')
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @Get()
  @ApiOperation({
    summary: 'Obtener todos los doctores',
    description: 'Devuelve una lista de todos los doctores registrados.',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de doctores devuelta con éxito.',
    type: [DoctorDto],
  })
  async findAll(): Promise<DoctorDto[]> {
    return this.doctorsService.findAll();
  }

  @Post()
  @ApiOperation({
    summary: 'Registrar un nuevo doctor',
    description: 'Crea un nuevo doctor con los datos proporcionados.',
  })
  @ApiBody({ type: DoctorDto, description: 'Datos del nuevo doctor.' })
  @ApiResponse({
    status: 201,
    description: 'Doctor creado exitosamente.',
    type: DoctorDto,
  })
  @ApiResponse({ status: 400, description: 'Solicitud inválida.' })
  async create(@Body() doctorDto: DoctorDto): Promise<DoctorDto> {
    return this.doctorsService.create(doctorDto);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener un doctor por ID',
    description: 'Devuelve los datos de un doctor específico basado en su ID.',
  })
  @ApiParam({ name: 'id', description: 'ID único del doctor.', example: '1' })
  @ApiResponse({
    status: 200,
    description: 'Doctor encontrado.',
    type: DoctorDto,
  })
  @ApiResponse({ status: 404, description: 'Doctor no encontrado.' })
  findOne(@Param('id') id: string): Promise<DoctorDto> {
    return this.doctorsService.findDoctorById(id);
  }
}
