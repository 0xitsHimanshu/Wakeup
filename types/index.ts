type PingLog = {
    time: string;
    logResponse: string;
    isSuccess: boolean;
    timeTaken: number;
    respCode: number;
}

type PingTask = {
    ID: number;
    url: string;
    isActive: boolean;
    logs: PingLog[];
}

type TAxiosResponse<T = unknown> = {
    message: string;
    additional: T;
    data: T;
    error?: string;
    status: boolean;
    code: number;
    details?: string;
    
};

export type { PingTask, PingLog, TAxiosResponse, };