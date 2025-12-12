import {ErrorResponseType } from "@/lib/error"
import {SuccessResponeType } from "@/lib/success"

export type ServerActionsReturnType<T = unknown> = 
| SuccessResponeType<T>
| ErrorResponseType;
