import { IsNotEmpty } from "class-validator";
import { TokenTypeEnum } from "src/common/enum/token.type.enum";
import { TokenSendTypeEnum } from "src/common/enum/token.sendtype.enum";

export class CreateTokenDto {
    @IsNotEmpty()
    sendTo: string

    @IsNotEmpty()
    sendType: TokenSendTypeEnum

    @IsNotEmpty()
    type: TokenTypeEnum

    @IsNotEmpty()
    userId: number
}
