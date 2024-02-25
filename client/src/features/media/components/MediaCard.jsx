import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Typography,
} from '@mui/material'
import Link from 'next/link'

function MediaCard({ media, mediaType }) {
    const posterPath = media.poster_path
        ? `https://image.tmdb.org/t/p/original${media.poster_path}`
        : 'media_poster_img/no_img.png'

    return (
        <Card>
            <CardActionArea>
                <Link href={`detail/${mediaType}/${media.id}`}>
                    <CardMedia
                        component="img"
                        image={posterPath}
                        sx={{
                            aspectRatio: '2/3',
                        }}
                        alt={media.title || media.name}
                    />
                    <CardContent>
                        <Typography variant="body2">
                            {mediaType === 'movie'
                                ? `公開日: ${media.release_date}`
                                : `初回放送日: ${media.first_air_date}`}
                        </Typography>
                    </CardContent>
                </Link>
            </CardActionArea>
        </Card>
    )
}

export default MediaCard
