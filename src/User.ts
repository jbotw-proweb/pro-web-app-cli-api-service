import { IResponse } from "pro-web-common/dist/js/interfaces/IResponse"
import { Response } from "pro-web-common/dist/js/Response"
import { Base } from "./base"



export class User extends Base {
    baseUrl: string
    constructor(baseUrl: string = "") {
        super()
        this.baseUrl = baseUrl
    }
    async checkUsernameUnique(username: string) {
        const result = await this.get<IResponse<boolean>>(`${this.baseUrl}/api/user/unique/${username}`)
        const resp = new Response<boolean>()
        resp.Data = result.data.Data
        resp.Message = result.data.Message
        resp.IsError = result.data.IsError
        return resp

    }
    async requestLogin(username: string) {
        return this.get(`${this.baseUrl}/api/request-session/${username}`) as unknown as Promise<IResponse<string>>
    }
    async login(username: string, challenge: string) {
        return this.post(`${this.baseUrl}/api/login/${username}`, {username, password: challenge}) as unknown as Promise<IResponse<boolean>>
    }
    async createUser(username: string, publicKey: string) {
        return this.post(`${this.baseUrl}/api/user/`, {username, publicKey}) as unknown as Promise<IResponse<number>>
    }
}