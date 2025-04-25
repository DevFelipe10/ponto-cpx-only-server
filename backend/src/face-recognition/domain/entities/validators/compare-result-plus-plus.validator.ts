// import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator'
// import {
//   CompareResultPlusPlusProps,
//   thresholdsPlusPlus,
// } from '../face-plus-plus/compare-result-plus-plus.entity'
// import { ClassValidatorFields } from 'src/shared/domain/validators/class-validator-fields'

// export class ComparePlusPlusRules {
//   @MaxLength(255)
//   @IsString()
//   @IsNotEmpty()
//   thresholds: thresholdsPlusPlus

//   @MaxLength(255)
//   @IsNumber()
//   @IsNotEmpty()
//   time_user: number

//   constructor({ thresholds, time_user }: CompareResultPlusPlusProps) {
//     Object.assign(this, { thresholds, time_user })
//   }
// }

// export class CompareResultPlusPlusValidator extends ClassValidatorFields<ComparePlusPlusRules> {
//   validate(data: CompareResultPlusPlusProps): boolean {
//     return super.validate(
//       new ComparePlusPlusRules(data ?? ({} as CompareResultPlusPlusProps)),
//     )
//   }
// }

// export class CompareResultPlusPlusValidatorFactory {
//   static create(): CompareResultPlusPlusValidator {
//     return new CompareResultPlusPlusValidator()
//   }
// }
