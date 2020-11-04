export default abstract class ResponseCore {
	version: string;
	statusCode: number;
	message: string;
	isError: boolean;
	responseException?: any;
}
