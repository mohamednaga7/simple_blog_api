import {RequestUserDTO} from "../../shared/dtos/RequestUserDTO";

export interface TokenPayloadDTO {
    token: string,
    user: RequestUserDTO,
}