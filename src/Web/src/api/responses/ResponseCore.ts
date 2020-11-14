export default abstract class ResponseCore {
	version: string;
	status: number;
	message: string;
	isError: boolean;
	responseException?: any;
	title: string;
}
