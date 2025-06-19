const { ReasonPhrases, StatusCodes } = require("http-status-codes");

/**
 * Success response with Message.
 * @returns {Json}
 */
exports.successResponse = function (res, msg) {
	const data = {
		success: true,
		statusCode: StatusCodes.CREATED,
		status: ReasonPhrases.CREATED,
		message: msg
	};
	return res.status(StatusCodes.CREATED).json(data);
};

/**
 * Success response with Pagination.
 * @returns {Json}
 */
exports.successResponseWithPagination = function (res, msg, data, totalRecords, totalPage, currentPage, pageSize) {
	const resData = {
		success: true,
		statusCode: StatusCodes.OK,
		status: ReasonPhrases.OK,
		message: msg,
		data: data,
		totalRecords: totalRecords,
		totalPage: totalPage,
		currentPage: currentPage,
		pageSize: pageSize
	};
	return res.status(StatusCodes.OK).json(resData);
};

/**
 * Success response with Data.
 * @returns {Json}
 */
exports.successResponseWithData = function (res, msg, data) {
	const resData = {
		success: true,
		statusCode: StatusCodes.OK,
		status: ReasonPhrases.OK,
		message: msg,
		data: data
	};
	return res.status(StatusCodes.OK).json(resData);
};

/**
 * Error response with Message.
 * @returns {Json}
 */
exports.ErrorResponse = function (res, msg) {
	const data = {
		success: false,
		statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
		status: ReasonPhrases.INTERNAL_SERVER_ERROR,
		message: msg,
	};
	return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(data);
};

/**
 * Error response with Message.
 * @returns {Json}
 */
exports.notFoundResponse = function (res, msg) {
	const data = {
		success: false,
		statusCode: StatusCodes.NOT_FOUND,
		status: ReasonPhrases.NOT_FOUND,
		message: msg,
	};
	return res.status(StatusCodes.NOT_FOUND).json(data);
};

/**
 * Validation Error response with Data.
 * @returns {Json}
 */
exports.validationErrorWithData = function (res, msg, data) {
	const resData = {
		success: false,
		statusCode: StatusCodes.BAD_REQUEST,
		status: ReasonPhrases.BAD_REQUEST,
		message: msg,
		data: data
	};
	return res.status(StatusCodes.BAD_REQUEST).json(resData);
};

/**
 * Authentication Error response with Message.
 * @returns {Json}
 */
exports.unauthorizedResponse = function (res, msg) {
	const data = {
		success: false,
		statusCode: StatusCodes.UNAUTHORIZED,
		status: ReasonPhrases.UNAUTHORIZED,
		message: msg,
	};
	return res.status(StatusCodes.UNAUTHORIZED).json(data);
};

/**
 * Exception Error response with Message.
 * @returns {Json}
 */
exports.expectationFailedResponse = function (res, msg) {
	const data = {
		success: false,
		statusCode: StatusCodes.EXPECTATION_FAILED,
		status: ReasonPhrases.EXPECTATION_FAILED,
		message: msg,
	};
	return res.status(StatusCodes.EXPECTATION_FAILED).json(data);
};

/**
 * Invalid request Error response with Message.
 * @returns {Json}
 */
exports.notAcceptableRequest = function (res, msg) {
	const data = {
		success: false,
		statusCode: StatusCodes.NOT_ACCEPTABLE,
		status: ReasonPhrases.NOT_ACCEPTABLE,
		message: msg,
	};
	return res.status(StatusCodes.NOT_ACCEPTABLE).json(data);
};

/**
 * Forbidden request Error response with Message.
 * @returns {Json}
 */
exports.forbiddenRequest = function (res, msg) {
	const data = {
		success: false,
		statusCode: StatusCodes.FORBIDDEN,
		status: ReasonPhrases.FORBIDDEN,
		message: msg,
	};
	return res.status(StatusCodes.FORBIDDEN).json(data);
};

/**
 * Conflict response with Message.
 * @returns {Json}
 */
exports.conflictRequest = function (res, msg) {
	const data = {
		success: false,
		statusCode: StatusCodes.CONFLICT,
		status: ReasonPhrases.CONFLICT,
		message: msg,
	};
	return res.status(StatusCodes.CONFLICT).json(data);
};

exports.validationError = function (res, msg) {
	const resData = {
		success: false,
		statusCode: StatusCodes.BAD_REQUEST,
		status: ReasonPhrases.BAD_REQUEST,
		message: msg,
	};
	return res.status(StatusCodes.BAD_REQUEST).json(resData);
};