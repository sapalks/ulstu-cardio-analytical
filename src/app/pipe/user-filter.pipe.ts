import { Pipe, PipeTransform } from "@angular/core";
import { UserBaseInfo } from "../store/store.model";

@Pipe({ name: 'ufilter' })
export class UserSearchPipe implements PipeTransform {
    transform(list: UserBaseInfo[] | null, query: string): UserBaseInfo[] | null {
        if (!query || !list) {
            return list;
        }

        const q = query.trim().toLowerCase()

        return list.filter(u => u.fio.toLowerCase().includes(q) || u.doctorFio.toLowerCase().includes(q));
    }
}