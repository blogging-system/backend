/**
 * Module exporting all custom exceptions.
 * @module Exceptions
 */

import { BadRequestException } from "./Common/badRequestException";
import { ForbiddenException } from "./Common/forbiddenException";
import { InternalServerException } from "./Common/InternalServerException";
import { NotFoundException } from "./Common/notFoundException";
import { UnAuthorizedException } from "./Common/unAuthorizedException";
import { ValidationException } from "./Common/validationException";

/**
 * Exporting custom exception classes.
 * @type {Object}
 * @property {BadRequestException} BadRequestException - Exception class for bad request errors.
 * @property {ForbiddenException} ForbiddenException - Exception class for forbidden errors.
 * @property {InternalServerException} InternalServerException - Exception class for internal server errors.
 * @property {NotFoundException} NotFoundException - Exception class for not found errors.
 * @property {UnAuthorizedException} UnAuthorizedException - Exception class for unauthorized errors.
 * @property {ValidationException} ValidationException - Exception class for validation errors.
 */
export {
	BadRequestException,
	ForbiddenException,
	InternalServerException,
	NotFoundException,
	UnAuthorizedException,
	ValidationException,
};
