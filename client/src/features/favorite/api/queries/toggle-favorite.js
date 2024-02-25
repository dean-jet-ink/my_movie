import laravelAxios from '@/lib/axios'
import queryClient from '@/lib/query-client'
import { useMutation } from '@tanstack/react-query'
import { favoriteKeys } from '../keys'

export const useToggleFavorite = (mediaType, mediaId, userId) => {
    const mutationFn = async () => {
        try {
            await laravelAxios.post('/api/favorites', {
                media_type: mediaType,
                media_id: mediaId,
            })
        } catch (err) {
            console.log(err)
        }
    }

    return useMutation({
        mutationFn,
        onSuccess: () => {
            queryClient.invalidateQueries(
                favoriteKeys.favorite(mediaType, mediaId, userId),
            )
        },
    })
}
