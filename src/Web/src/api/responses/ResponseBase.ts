import ResponseBody from "./ResponseBody";
import ResponseCore from "./ResponseCore";

export default abstract class ResponseBase<T extends ResponseBody> extends ResponseCore {
	result: T;
}
