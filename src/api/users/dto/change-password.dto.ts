import { IsNotEmpty, IsString, Length, MinLength } from "class-validator";
import { DeviceTypeEnum } from "src/common/enum/device.type.enum";
import { TokenSendTypeEnum } from "src/common/enum/token.sendtype.enum";

export class ChangePasswordDto {
    @IsNotEmpty({message: 'Одоогийн нууц үгээ оруулана уу'})
    currentPass: string

    @IsNotEmpty({message: 'Шинэ нууц үгээ оруулана уу'})
    newPass: string

    hash: string
}
