import axios from 'axios'
import { mediaKeys } from '../keys'

export const useGetMediaDetailQuery = ({ mediaType, mediaId }) => {
    const queryKey = mediaKeys.detail()

    const queryFn = async () => {
        try {
            const res = await axios.get(
                `http://localhost:3000/get-media-detail?media_type=${mediaType}&media_id=${mediaId}`,
            )

            return res.data
        } catch (err) {
            console.log('エラーが発生しました', err)
        }
    }

    return { queryKey, queryFn }
}
