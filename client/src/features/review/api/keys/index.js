export const reviewKeys = {
    all: ['reviews'],
    reviews: (mediaType, mediaId) => [...reviewKeys.all, mediaType, mediaId],
    detail: id => [...reviewKeys.all, id],
    comments: reviewId => [
        ...reviewKeys.all,
        ...reviewKeys.detail(reviewId),
        'comments',
    ],
}
