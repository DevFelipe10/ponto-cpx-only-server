import { faker } from '@faker-js/faker'
import { Role } from '../../entities/roles/role.enum'

export function RoleEnumDataBuilder(): Role[] {
  return [faker.helpers.enumValue(Role)]
}
