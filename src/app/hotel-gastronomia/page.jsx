function RestaurantesContent() {
  const restaurants = [
    {
      name: "ENCANTA",
      description:
        "Inspirado en la cocina del Caribe y del Golfo de México. Sabores frescos y vibrantes que te transportarán a las costas más hermosas.",
      image: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1747443822/img-encanta-1_b2odmv.webp",
      chef: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1747443821/paco-mendez_tu0atq.webp",
    },
    {
      name: "CHINO POBLANO",
      description:
        "Divertido y sofisticado abrazo culinario de estas dos culturas por el Chef Jonatan Gómez Luna, líder de una nueva generación de chefs que ha conquistado las grandes mesas del mundo.",
      image: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1747443821/img-chino_poblano-1_l2bj7k.webp",
      chef: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1747443821/jonatan-gomez_f2ddkb.webp",
    },
    {
      name: "V.I.P.Y.",
      description:
        "Gastronomía vegetal inspirada en sabores de México. Una celebración de ingredientes frescos y sostenibles.",
      image: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1747443821/img-VI_AI_PY-1_bukjd6.webp",
      chef: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1747443821/alejandro-ruiz_dawd4n.webp",
    },
    {
      name: "MERCADO SAN JUAN",
      description:
        "Homenaje a los sabores tradicionales mexicanos. Un recorrido por los mercados más emblemáticos del país.",
      image: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1747443821/img-mercado_san_juan-1_penjkt.webp",
    },
    {
      name: "CAYUCO",
      description:
        "Sabores del Caribe mexicano en un ambiente relajado. Disfruta de los tesoros culinarios de la costa.",
      image: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1747443820/img-cayuco-1_ykjbqk.webp",
    },
    {
      name: "TAH-XIDO",
      description:
        "Restaurante japonés contemporáneo del Chef Luis Arzapalo exponiendo lo mejor del arte gastronómico oriental",
      image: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1747443820/img-tahxido-1_hupre7.webp",
      chef: "https://res.cloudinary.com/dc5zbh38m/image/upload/v1747443820/luis-arzapalo-chef_pgcyc8.webp",
    },
  ];

  return (
    <div className="restaurantes">
      <section className="bares__header">
        <h1 className="bares__title">RESTAURANTES</h1>
        <p className="bares__description">
          Experiencias gastronómicas a cargo del mejor Colectivo Gastronómico del país conformado por verdaderos artistas del sabor.
        </p>
      </section>
      {restaurants.map((restaurant, index) => (
        <section
          key={index}
          className={`bares__item ${index % 2 !== 0 ? "bares__item--reverse" : ""}`}
        >
          <div className="restaurantes__info">
            <h2 className="bares__item-title">{restaurant.name}</h2>
            <p className="bares__item-description">{restaurant.description}</p>
          </div>
          <div className="restaurantes__media">
            <div className="restaurantes__image-container">
              <Image
                src={restaurant.image || "/placeholder.svg"}
                alt={`Restaurante ${restaurant.name}`}
                width={600}
                height={400}
                className="restaurantes__image"
              />
              {index === 0 && (
                <button className="restaurantes__vista360">Vista 360</button>
              )}
            </div>
            {restaurant.chef && (
              <div className="restaurantes__chef-container">
                <Image
                  src={restaurant.chef || "/placeholder.svg"}
                  alt={`Chef de ${restaurant.name}`}
                  width={150}
                  height={200}
                  className="restaurantes__chef"
                />
              </div>
            )}
          </div>
        </section>
      ))}
      <section className="xcaret__cta-section">
        <h2 className="xcaret__cta-title">VER MÁS</h2>
        <div className="xcaret__buttons">
          <Link href="/hotel-gastronomia">
            <button className="xcaret__button">Gastronomía</button>
          </Link>
          <button className="xcaret__button">Spa & Wellness</button>
        </div>
      </section>
    </div>
  );
}