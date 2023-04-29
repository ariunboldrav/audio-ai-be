import { IsNotEmpty, IsString, Length, MinLength } from "class-validator";
import { DeviceTypeEnum } from "src/common/enum/device.type.enum";
import { TokenSendTypeEnum } from "src/common/enum/token.sendtype.enum";

export class ForgotPasswordDto {
    @IsNotEmpty({message: 'Та гар утасны дугаараа оруулана уу!'})
    @IsNotEmpty({message: 'Та өөрийн нэрээ оруулана уу!'})
    sendTo: string

    sendType: TokenSendTypeEnum
}
