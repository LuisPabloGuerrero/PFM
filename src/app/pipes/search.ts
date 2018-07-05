import { Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'search'
})

export class SearchPipe implements PipeTransform {
public transform(value, args: string) {
    if (!value) {
        return null;
    }
    if (!args) {
        return value;
    }
    args = args.toLowerCase();
    // value trae un array de objetos
    return value.filter( (item) => {
    // item trae un objeto
        return JSON.stringify(item).toLowerCase().includes(args);
    });
}
}

// objeto | json

