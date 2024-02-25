import laravelAxios from '@/lib/axios'
import { favoriteKeys } from '../keys'
import { useQuery } from '@tanstack/react-query'

export const useGetFavorites = userId => {
    const queryKey = favoriteKeys.favorites(userId)

    const queryFn = async () => {
        try {
            const { data } = await laravelAxios.get(`/api/favorites`)
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
