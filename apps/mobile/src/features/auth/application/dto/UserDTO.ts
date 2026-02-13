// application/dto/UserDTO.ts

export interface UserDTO {
  id: string;
  name: string;
  email: string;
  phone?: string;
  token?: string;
}