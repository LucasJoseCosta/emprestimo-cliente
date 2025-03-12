export type ListingFindPaginatedParams = {
    pageNumber: number;
    pageSize: number;
    sort?: Sort;
};

export type Sort = {
    property: string;
    direction: 'ASC' | 'DESC';
};
