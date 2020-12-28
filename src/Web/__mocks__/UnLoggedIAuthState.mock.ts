import * as faker from "faker";
import { IAuthState } from "../src/components/auth/store/State";

const unlogedTokenInfo: IAuthState = {
	tokenInfo: {
		token: null,
		expires: new Date,
		refreshToken: {
			created: new Date,
			expires: new Date,
			isActive: false,
			isExpired: false,
			revoked: null,
			token: faker.random.alphaNumeric(32).toString(),
		},
		payload: {
			sub: faker.random.alphaNumeric(32).toString(),
			scope: faker.random.alphaNumeric(32).toString(),
			jti: faker.random.alphaNumeric(32).toString(),
			iss: faker.random.alphaNumeric(32).toString(),
			iat: faker.random.alphaNumeric(32).toString(),
			exp: faker.random.number(),
			aud: faker.random.alphaNumeric(32).toString(),
		},
	}
}

export default unlogedTokenInfo
