export const mediaKeys = {
    all: ['media'],
    populars: () => [...mediaKeys.all, 'popular'],
    detail: id => [...mediaKeys.all, id],
    search: query => [...mediaKeys.all, 'search', query],
}
