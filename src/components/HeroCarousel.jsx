
import { Box, Typography, Button, Skeleton } from '@mui/material';
import { Link as RouterLink } from 'react-router';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

const imgBackdrop = (path) => `https://image.tmdb.org/t/p/original/${path}`;
const truncate = (str, n = 180) => (str?.length > n ? str.slice(0, n) + '…' : str);

export default function HeroCarousel({ data, loading }) {
  if (loading) {
    return <Skeleton variant="rectangular" height={420} sx={{ borderRadius: 2, mb: 3 }} />;
  }
  const items = data?.results ?? [];
  if (!items.length) return null;

  return (
    <Box sx={{
      borderRadius: 2, overflow: 'hidden', mb: 3,
      '--swiper-theme-color': '#40C1AD',
      '--swiper-navigation-color': '#40C1AD',
      '--swiper-pagination-color': '#40C1AD',
      '& .swiper-pagination-bullet-active': {
          backgroundColor: '#40C1AD',
        },
    }}>
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        effect="fade"
        loop
        style={{ height: 520 }}
      >
        {items.map((m) => (
          <SwiperSlide key={m.id}>
            <Box
              sx={{
                height: '100%',
                position: 'relative',
                backgroundImage: `url(${imgBackdrop(m.backdrop_path || m.poster_path)})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.65) 60%, rgba(0,0,0,0.85) 100%)',
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 24,
                  left: 24,
                  right: 24,
                  color: 'white',
                  maxWidth: 800,
                }}
              >
                <Typography variant="h4" fontWeight={700}>
                  {m.title}
                </Typography>
                <Typography variant="body1" sx={{ mt: 1, opacity: 0.9 }}>
                  {truncate(m.overview)}
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  component={RouterLink}
                  to={`/movie/${m.id}`}
                  sx={{ mt: 2, borderRadius: 2, backgroundColor: '#40C1AD'}}
                >
                  Ver detalles
                </Button>
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}
