export default function VideoBanner() {
  return (
    <div className="relative w-full h-[400px] overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
        poster="https://your-fallback-image.jpg"
      >
        <source
          // src="https://videos.pexels.com/video-files/8387487/8387487-uhd_2732_1440_25fps.mp4"
          src="https://videos.pexels.com/video-files/8386980/8386980-sd_960_506_25fps.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Play icon in the center */}
      {/* <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-white/70 rounded-full p-4">
          <svg
            className="w-10 h-10 text-gray-800"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M6 4l10 6-10 6V4z" />
          </svg>
        </div>
      </div> */}
    </div>
  );
}
