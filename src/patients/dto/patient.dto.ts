import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString } from 'class-validator';  

export class PatientDto {  
  @IsNotEmpty()  
  @IsString()  
  firstName: string;  

  @IsNotEmpty()  
  @IsString()  
  lastName: string;  

  @IsNotEmpty()  
  birthDate: Date;  

  @IsOptional()  
  @IsPhoneNumber(null)  
  phone?: string;  

  @IsNotEmpty()  
  @IsEmail()  
  email: string;  
}