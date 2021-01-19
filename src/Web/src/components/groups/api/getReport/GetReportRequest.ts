import { RequestEndpoint } from "../../../../api/enum/RequestEndpoint";
import { RequestType } from "../../../../api/enum/RequestType";
import RequestCore from "../../../../api/requests/RequestCore";
import { GetReportResponse } from "./GetReportResponse";

export class GetReportRequest extends RequestCore {
	constructor(groupId: string) {
		super({
			properties: {
				method: RequestType.Get,
				endpoint: RequestEndpoint.GET_GROUP_REPORT,
				queries: {
					groupId,
				}
			},
		});
	}
	async send() {
		return await super.fetch<GetReportResponse>();
	}
}
