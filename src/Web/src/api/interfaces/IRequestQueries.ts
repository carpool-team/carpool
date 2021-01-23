export interface IRequestQueries {
	userId?: string;
	groupId?: string;
	inviteId?: string;
	rideId?: string;
	count?: number;
	page?: number;
	owned?: boolean;
	participated?: boolean;
	past?: boolean;
	isOwner?: boolean;
	email?: string;
	startDate?: string;
	endDate?: string;
}
