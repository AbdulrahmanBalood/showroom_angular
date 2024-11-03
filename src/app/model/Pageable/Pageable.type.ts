export type Pageable<T> = {
    content: Array<T>;
    pageable: any;
    totalPages: number;
    totalElements: number;
    last: boolean;
    first: boolean;
    size: number;
    number: number;
    sort: any;
}