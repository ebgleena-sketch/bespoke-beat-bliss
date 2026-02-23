import baseballImage from "@/assets/baseball-athlete.jpg";
import weddingImage from "@/assets/wedding-ceremony.jpg";
import birthdayImage from "@/assets/birthday-celebration.jpg";

const occasions = [
  {
    title: "Sports Walk-Up Songs",
    description: "Make your entrance unforgettable with a custom track that gets the crowd pumped",
    image: baseballImage,
  },
  {
    title: "Wedding Moments",
    description: "Walk down the aisle to a song written just for your special day",
    image: weddingImage,
  },
  {
    title: "Birthday Celebrations",
    description: "Celebrate another year with a personalized song they'll never forget",
    image: birthdayImage,
  },
];

const Occasions = () => {
  return (
    <section id="occasions" className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-background mb-4">
            Perfect for Every Occasion
          </h2>
          <p className="text-xl text-background/90 max-w-2xl mx-auto">
            Custom songs that make your moments truly memorable
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {occasions.map((occasion, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl shadow-soft hover:shadow-glow transition-smooth"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={occasion.image}
                  alt={occasion.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-smooth"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end p-6">
                <div className="text-white">
                  <h3 className="text-2xl font-bold mb-2">{occasion.title}</h3>
                  <p className="text-white/90 text-sm">{occasion.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Occasions;
