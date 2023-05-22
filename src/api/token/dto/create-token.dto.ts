import { IsNotEmpty } from "class-validator";
import { TokenTypeEnum } from "src/common/enum/token.type.enum";
import { TokenSendTypeEnum } from "src/common/enum/token.sendtype.enum";

export class CreateTokenDto {
    @IsNotEmpty({ message: 'JPN-Required!' })
    sendTo: string

    @IsNotEmpty({ message: 'JPN-Required!' })
    sendType: TokenSendTypeEnum

    @IsNotEmpty({ message: 'JPN-Required!' })
    type: TokenTypeEnum

    @IsNotEmpty({ message: 'JPN-Required!' })
    userId: number
}
