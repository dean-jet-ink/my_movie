export const favoriteKeys = {
    all: ['favorites'],
    favorites: userId => [...favoriteKeys.all, userId],
    favorite: (mediaType, mediaId, userId) => [
        ...favoriteKeys.all,
        mediaType,
        mediaId,
        userId,
    ],
}
