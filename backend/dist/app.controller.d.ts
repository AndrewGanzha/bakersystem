import { AppService } from "./app.service";
export declare class AppController {
    private appSerivce;
    constructor(appSerivce: AppService);
    getUsers(): {
        id: number;
        name: string;
    }[];
}
