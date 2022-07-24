import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'yn' })
export class YesNoPipe implements PipeTransform {
    transform(value: boolean | null | undefined, defaultValue?: boolean | null): string {
        value = value ?? defaultValue ?? null;
        if (value === null || value === undefined) {
            return 'не опредленно';
        }
        return value ? 'да' : 'нет';
    }
}