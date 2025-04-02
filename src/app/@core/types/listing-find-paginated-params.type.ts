export type ListingFindPaginatedParams = {
    pageNumber: number;
    pageSize: number;
    sort?: Sort;
    searchTerm?: string;
};

export type Sort = {
    property: string;
    direction: 'ASC' | 'DESC';
};
