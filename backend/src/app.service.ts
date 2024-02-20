import {Injectable} from "@nestjs/common";

@Injectable()
export class AppService {
    getTransports() {
        return [{id: 1, name: 'Фрунзенская'}]
    }
}