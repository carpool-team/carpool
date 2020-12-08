export interface IRefreshToken {
	created: Date;
	expires: Date;
	isActive: boolean;
	isExpired: false;
	revoked: any;
	token: string;
}
