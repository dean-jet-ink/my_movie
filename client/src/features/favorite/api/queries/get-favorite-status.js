import laravelAxios from '@/lib/axios'
import { favoriteKeys } from '../keys'
import { useQuery } from '@tanstack/react-query'

export const useGetFavoriteStatus = (mediaType, mediaId, userId) => {
    const queryKey = favoriteKeys.favorite(mediaType, mediaId, userId)

    const queryFn = async () => {
        try {
            const { data } = await laravelAxios.get('/api/favorites/status', {
                params: {
                    media_type: mediaType,
                    media_id: mediaId,
                },
            })

            return data
        } catch (err) {
            console.log(err)
        }
    }

    return useQuery({
        queryKey,
        queryFn,
    })
}
