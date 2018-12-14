import { Injectable } from '@angular/core';

export enum StatusCode {

    Continue = 100,

    SwitchingProtocols = 101,

    OK = 200,

    Created = 201,

    Accepted = 202,

    NonAuthoritativeInformation = 203,

    NoContent = 204,

    ResetContent = 205,

    PartialContent = 206,

    Ambiguous = 300,

    MultipleChoices = 300,

    Moved = 301,

    MovedPermanently = 301,

    Found = 302,

    Redirect = 302,

    RedirectMethod = 303,

    SeeOther = 303,

    NotModified = 304,

    UseProxy = 305,

    Unused = 306,

    RedirectKeepVerb = 307,

    TemporaryRedirect = 307,

    BadRequest = 400,

    Unauthorized = 401,

    PaymentRequired = 402,

    Forbidden = 403,

    NotFound = 404,

    MethodNotAllowed = 405,

    NotAcceptable = 406,

    ProxyAuthenticationRequired = 407,

    RequestTimeout = 408,

    Conflict = 409,

    Gone = 410,

    LengthRequired = 411,

    PreconditionFailed = 412,

    RequestEntityTooLarge = 413,

    RequestUriTooLong = 414,

    UnsupportedMediaType = 415,

    RequestedRangeNotSatisfiable = 416,

    ExpectationFailed = 417,

    UpgradeRequired = 426,

    InternalServerError = 500,

    NotImplemented = 501,

    BadGateway = 502,

    ServiceUnavailable = 503,

    GatewayTimeout = 504,

    HttpVersionNotSupported = 505
}

export class ErrorResponse {
    public error: string;
    public isOk: boolean;
    public statusCode: StatusCode;
    public code: number;

    public Ok(statusCode: StatusCode = 200): ErrorResponse {
        this.isOk = true;
        this.error = '';
        this.statusCode = statusCode;
        this.code = statusCode;
        return this;
    }
    public Error(statusCode: StatusCode, error: string): ErrorResponse {
        this.isOk = false;
        this.error = error;
        this.statusCode = statusCode;
        this.code = statusCode;
        return this;
    }
}

@Injectable()
export class ErrorService{

    public login(errorCode: string): ErrorResponse {
        var r = new ErrorResponse();
        switch (errorCode) {
            // Forbidden
            case '403':
                r = r.Error(StatusCode.Forbidden, 'Você foi temporariamente suspenso'); return r;
            // User not found
            case '404':
                r = r.Error(StatusCode.NotFound, 'Usuário não encontrado'); return r;
            // Wrong password
            case '406':
                r = r.Error(StatusCode.NotAcceptable, 'Email ou senha inválidos'); return r;

            default:
                r = r.Error(StatusCode.InternalServerError, 'Ocorreu um erro interno, tente novamente'); return r;
        }
    }

    public register(errorCode: string): ErrorResponse {
        var r = new ErrorResponse();
        switch (errorCode) {
            case '400':
                r = r.Error(StatusCode.BadRequest, 'Há erros nos dados fornecidos'); return r;

            case '409':
                r = r.Error(StatusCode.Conflict, 'Email já cadastrado'); return r;


            default:
                r = r.Error(StatusCode.InternalServerError, 'Ocorreu um erro interno, tente novamente'); return r;
        }
    }

    public createPatient(errorCode: string): ErrorResponse {
        var r = new ErrorResponse();
        switch (errorCode) {
            case '400':
                r = r.Error(StatusCode.BadRequest, 'Há erros nos dados fornecidos'); return r;

            default:
                r = r.Error(StatusCode.InternalServerError, 'Ocorreu um erro interno, tente novamente'); return r;
        }
    }

    public seeAnswers(errorCode: string): ErrorResponse {
        var r = new ErrorResponse();
        switch (errorCode) {
            case '404':
                r = r.Error(StatusCode.BadRequest, 'O usuário ainda não respondeu nenhuma pesquisa'); return r;

            default:
                r = r.Error(StatusCode.InternalServerError, 'Ocorreu um erro interno, tente novamente'); return r;
        }
    }

    public saveAnswers(errorCode: string): ErrorResponse {
        var r = new ErrorResponse();
        switch (errorCode) {
            case '400':
                r = r.Error(StatusCode.BadRequest, 'Há erros nos dados fornecidos'); return r;

            case '404':
                r = r.Error(StatusCode.BadRequest, 'Questionário não encontrado. O link pode estar incorreto...'); return r;

            case '409':
                r = r.Error(StatusCode.BadRequest, 'Questionário já respondido. É preciso criar um novo para responder novamente.'); return r;
            default:
                r = r.Error(StatusCode.InternalServerError, 'Ocorreu um erro interno, tente novamente'); return r;
        }
    }
}
