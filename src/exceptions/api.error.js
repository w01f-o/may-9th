export class ApiError extends Error {
	status;
	errors;

	constructor(status, message, errors) {
		super(message);
		this.status = status;
		if (errors) {
			this.errors = errors;
		}
	}

	static BadRequest(message, errors) {
		return new ApiError(400, message, errors);
	}

	static NotFound(message) {
		return new ApiError(404, message);
	}

	static Unauthorized() {
		return new ApiError(401, 'Unauthorized');
	}
}