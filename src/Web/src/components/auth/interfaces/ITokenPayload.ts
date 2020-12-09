export interface ITokenPayload {
	/** Subject (AUTH ID) */
	sub: string;
	/** Scope */
	scope: string;
	/** JWT Id */
	jti: string;
	/** Issuer */
	iss: string;
	/** Issued at */
	iat: string;
	/** Expiration time */
	exp: number;
	/** Audience */
	aud: string;
}
