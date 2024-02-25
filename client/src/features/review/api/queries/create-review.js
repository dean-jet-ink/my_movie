import laravelAxios from '@/lib/axios'
import queryClient from '@/lib/query-client'
import { useMutation } from '@tanstack/react-query'
import { reviewKeys } from '../keys'

export const useCreateReview = () => {
    const mutationFn = async ({ content, rating, mediaType, mediaId }) => {
        try {
            await laravelAxios.post('api/reviews', {
                content,
                rating,
                media_type: mediaType,
                media_id: mediaId,
            })

            return { mediaType, mediaId }
        } catch (err) {
            console.log(err)
        }
    }

    const { mutate, isLoading } = useMutation({
        mutationFn,
        onSuccess: ({ mediaType, mediaId }) => {
            queryClient.invalidateQueries(
                reviewKeys.reviews(mediaType, mediaId),
            )
        },
    })

    return { mutate, isLoading }
}
