import { Pipe, PipeTransform } from "@angular/core";
import { UserBaseInfo } from "../store/store.model";

@Pipe({ name: 'ufilter' })
export class UserSearchPipe implements PipeTransform {
    transform(list: UserBaseInfo[] | null, query: string): UserBaseInfo[] | null {
        if (!query || !list) {
            return list;
        }

        return list.filter(u => u.fio.includes(query) || u.doctorFio.includes(query));
    }
}