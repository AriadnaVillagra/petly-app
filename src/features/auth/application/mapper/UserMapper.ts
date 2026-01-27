import { User } from '../../domain/entities/User';
import { UserDTO } from '../dto/UserDTO';

export class UserMapper {
  static toDTO(user: User): UserDTO {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
    };
  }
}
