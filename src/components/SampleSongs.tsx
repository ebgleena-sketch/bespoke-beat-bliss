import { Play, Pause } from "lucide-react";
import { useState, useRef } from "react";

const sampleSongs = [
  {
    title: "Swing Like Thunder",
    description: "Walk-up song example",
    src: "/audio/Swing_Like_Thunder.mp3"
  },
  {
    title: "The Other Side of Forty",
    description: "Birthday song example",
    src: "/audio/The_Other_Side_of_Forty.mp3"
  },
  {
    title: "Lost in the Maze",
    description: "Personal song example",
    src: "/audio/Lost_in_the_Maze_1.mp3"
  }
];

const SampleSongs = () => {
  const [playing, setPlaying] = useState<number | null>(null);
  const audioRefs = useRef<(HTMLAudioElement | null)[]>([]);

  const togglePlay = (index: number) => {
    // Stop all other audio
    audioRefs.current.forEach((audio, i) => {
      if (audio && i !== index) {
        audio.pause();
        audio.currentTime = 0;
      }
    });

    const audio = audioRefs.current[index];
    if (audio) {
      if (playing === index) {
        audio.pause();
        setPlaying(null);
      } else {
        audio.play();
        setPlaying(index);
      }
    }
  };

  const handleEnded = () => {
    setPlaying(null);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Sample Songs
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Listen to examples of our custom songs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {sampleSongs.map((song, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all"
            >
              <audio
                ref={(el) => (audioRefs.current[index] = el)}
                src={song.src}
                onEnded={handleEnded}
              />
              <div className="flex flex-col items-center gap-4">
                <button
                  onClick={() => togglePlay(index)}
                  className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/90 transition-colors shadow-lg"
                >
                  {playing === index ? (
                    <Pause className="w-8 h-8 text-background" />
                  ) : (
                    <Play className="w-8 h-8 text-background ml-1" />
                  )}
                </button>
                <div className="text-center">
                  <h3 className="text-lg font-bold text-white">{song.title}</h3>
                  <p className="text-sm text-gray-300">{song.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SampleSongs;
