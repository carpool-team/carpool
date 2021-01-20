import { RequestEndpoint } from "../../../../api/enum/RequestEndpoint";
import { RequestType } from "../../../../api/enum/RequestType";
import RequestCore from "../../../../api/requests/RequestCore";
import { GetReportResponse } from "./GetReportResponse";

export class GetReportRequest extends RequestCore {
	constructor(init: {
		groupId: string,
		startDate: string,
		endDate: string,
	}) {
		super({
			properties: {
				method: RequestType.Get,
				endpoint: RequestEndpoint.GET_GROUP_REPORT,
				queries: {
					groupId: init.groupId,
					startDate: init.startDate,
					endDate: init.endDate,
				}
			},
		});
	}
	async send() {
		return await super.fetch<GetReportResponse>();
	}
}
