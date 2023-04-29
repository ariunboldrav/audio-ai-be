import { IsNotEmpty } from "class-validator";
import { TokenTypeEnum } from "src/common/enum/token.type.enum";
import { TokenSendTypeEnum } from "src/common/enum/token.sendtype.enum";

export class VerifyTokenDto {
    @IsNotEmpty()
    token: string
    @IsNotEmpty()
    sendTo: string
    sendType: TokenSendTypeEnum
    type: TokenTypeEnum
    hash: string
    newPassword: string
    confirmPass: string
}
