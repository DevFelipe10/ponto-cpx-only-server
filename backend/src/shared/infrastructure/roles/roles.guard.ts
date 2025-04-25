import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { ROLES_KEY } from '../../domain/entities/roles/roles.decorator'
import { Role } from '../../domain/entities/roles/role.enum'
import { UserAuth } from 'src/shared/domain/entities/auth/user.auth'
import { UserTokenResponseDto } from 'src/shared/domain/entities/auth/dto/user-token-reponse.dto.auth'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest()
    const user = request.user as UserTokenResponseDto

    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    // Obter o nome do controlador e do método que está sendo acessado
    const controller = context.getClass().name
    const handler = context.getHandler().name

    // Permitir acesso apenas ao método signIn do AuthController
    if (controller === 'AuthController' && handler === 'signIn') {
      return true
    }

    if (!user) {
      throw new ForbiddenException('Usuário não autenticado')
    }

    // Bypass para o grupo Admin
    if (user.role === Role.ADMIN) {
      return true
    }

    if (!requiredRoles) {
      throw new ForbiddenException('Acesso negado: permissão não definida')
    }

    if (requiredRoles.some(role => user.role === role)) {
      return true
    }

    throw new ForbiddenException('Acesso negado')
  }
}
