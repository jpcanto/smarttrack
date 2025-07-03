import {
  PipeTransform,
  BadRequestException,
  ArgumentMetadata,
} from '@nestjs/common';
import { Types } from 'mongoose';

export class IdValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!value || typeof value !== 'string' || !Types.ObjectId.isValid(value)) {
      throw new BadRequestException(
        `The ${metadata.data} parameter must be a valid id`,
      );
    }
    return value;
  }
}
