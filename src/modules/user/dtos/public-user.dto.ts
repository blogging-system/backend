import { Expose, Transform } from "class-transformer";

export class PublicUserDto {
  @Expose()
  @Transform(({ key, obj }) => obj[key])
  _id: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  userName: string;

  @Expose()
  email: string;

  @Expose()
  roles: string;

  @Expose()
  isVerified: boolean;

  @Expose()
  verifiedAt: Date;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
