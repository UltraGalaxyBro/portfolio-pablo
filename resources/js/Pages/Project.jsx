import { useState } from "react";
import { Head } from "@inertiajs/react";
import PortfolioLayout from "@/Layouts/PortfolioLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight, faCalendar, faUpRightFromSquare, faX } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const ImageGallery = ({ images }) => {
    const [currentImage, setCurrentImage] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const nextImage = () => setCurrentImage((prev) => (prev + 1) % images.length);
    const prevImage = () => setCurrentImage((prev) => (prev - 1 + images.length) % images.length);

    return (
        <>
            {/* Grid de miniaturas */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className="relative aspect-video cursor-pointer overflow-hidden rounded-lg bg-gray-800"
                        onClick={() => {
                            setCurrentImage(index);
                            setIsModalOpen(true);
                        }}
                    >
                        <img
                            src={image.url}
                            alt={image.caption}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                ))}
            </div>

            {/* Modal de visualização */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
                    <button
                        onClick={() => setIsModalOpen(false)}
                        className="absolute top-4 right-4 text-white/70 hover:text-white"
                    >
                        <FontAwesomeIcon icon={faX} className="w-8 h-8" />
                    </button>

                    <button
                        onClick={prevImage}
                        className="absolute left-4 text-white/70 hover:text-white"
                    >
                        <FontAwesomeIcon icon={faAngleLeft} />
                    </button>

                    <img
                        src={images[currentImage].url}
                        alt={images[currentImage].caption}
                        className="max-w-[90vw] max-h-[90vh] object-contain"
                    />

                    <button
                        onClick={nextImage}
                        className="absolute right-4 text-white/70 hover:text-white"
                    >
                        <FontAwesomeIcon icon={faAngleRight} />
                    </button>

                    <p className="absolute bottom-4 text-white/90 text-center w-full">
                        {images[currentImage].caption}
                    </p>
                </div>
            )}
        </>
    );
};

export default function Project({ auth, project }) {
    const projectData = {
        title: "Nome do Projeto",
        description: "Descrição detalhada do projeto...",
        longDescription: `
      Descrição mais longa e detalhada do projeto, incluindo desafios, 
      soluções e aprendizados...
    `,
        technologies: ["React", "Laravel", "Tailwind", "PostgreSQL"],
        github: "https://github.com/seu-usuario/projeto",
        live: "https://projeto.com",
        images: [
            { url: "https://upload.wikimedia.org/wikipedia/en/0/0f/Jujutsu_Kaisen_S2_Vol.1.png", caption: "Gojo" },
            { url: "https://images8.alphacoders.com/137/thumb-1920-1378701.png", caption: "Momo" },
            { url: "https://primepop.com.br/wp-content/uploads/2024/09/portada_sousou-no-frieren-37-1024x576.jpg", caption: "Frieren" },
        ],
        metrics: {
            date: "2024",
        }
    };

    return (
        <PortfolioLayout auth={auth}>
            <Head title={`Projeto - ${projectData.title}`} />

            <div className="relative min-h-screen pt-40 bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Cabeçalho do Projeto */}
                    <div className="mb-12">
                        <h1 className="text-4xl font-bold text-white mb-4">
                            {projectData.title}
                        </h1>

                        <p className="text-gray-300 text-lg mb-6">
                            {projectData.description}
                        </p>

                        <div className="flex flex-wrap items-center gap-6 mb-8">
                            <a
                                href={projectData.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-gray-300 hover:text-white"
                            >
                                <FontAwesomeIcon icon={faGithub} className="w-5 h-5" />
                                Código Fonte
                            </a>

                            <a
                                href={projectData.live}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-gray-300 hover:text-white"
                            >
                                <FontAwesomeIcon icon={faUpRightFromSquare} className="w-5 h-5" />
                                Ver Projeto
                            </a>

                            <div className="flex items-center gap-2 text-gray-400">
                                <FontAwesomeIcon icon={faCalendar} className="w-5 h-5" />
                                {projectData.metrics.date}
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-8">
                            {projectData.technologies.map((tech) => (
                                <span
                                    key={tech}
                                    className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Galeria de Imagens */}
                    <ImageGallery images={projectData.images} />

                    {/* Descrição Detalhada */}
                    <div className="prose prose-invert max-w-none">

                        <div className="text-gray-300 leading-relaxed">
                            {projectData.longDescription}
                        </div>
                    </div>
                </div>
            </div>
        </PortfolioLayout>
    );
}