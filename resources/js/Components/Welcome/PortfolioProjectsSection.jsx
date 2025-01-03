import { useState, useEffect } from "react";
import PortfolioProjectCard from "./PortfolioProjectCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faX } from "@fortawesome/free-solid-svg-icons";

const PortfolioProjectsSection = () => {
    const projects = [
        {
            title: "E-commerce Dashboard",
            description: "Dashboard completo para gerenciamento de e-commerce com análise de dados em tempo real, gestão de produtos e relatórios personalizados.",
            technologies: ["React", "Node.js", "MongoDB", "Tailwind"],
            github: "https://github.com/seu-usuario/projeto",
            link: "https://projeto.com",

            date: "2023"

        },
        {
            title: "Task Manager API",
            description: "API RESTful para gerenciamento de tarefas com autenticação JWT, permissões baseadas em função e documentação completa.",
            technologies: ["Express", "PostgreSQL", "TypeScript", "Jest"],
            github: "https://github.com/seu-usuario/projeto2",
            link: "https://api.projeto.com",

            date: "2024"

        },
        // Adicione mais projetos aqui
    ];

    // Estados
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTechs, setSelectedTechs] = useState([]);
    const [filteredProjects, setFilteredProjects] = useState(projects);

    // Extrair todas as tecnologias únicas dos projetos
    const allTechnologies = [...new Set(projects.flatMap(project => project.technologies))].sort();

    // Função para filtrar projetos
    useEffect(() => {
        const filtered = projects.filter(project => {
            const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                project.description.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesTech = selectedTechs.length === 0 ||
                selectedTechs.every(tech => project.technologies.includes(tech));

            return matchesSearch && matchesTech;
        });

        setFilteredProjects(filtered);
    }, [searchTerm, selectedTechs]);

    // Alternar seleção de tecnologia
    const toggleTech = (tech) => {
        setSelectedTechs(prev =>
            prev.includes(tech)
                ? prev.filter(t => t !== tech)
                : [...prev, tech]
        );
    };

    return (
        <section className="py-20 bg-gray-900" id="portfolio">
            <div className="container mx-auto px-4">
                {/* Cabeçalho da Seção */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Meus Projetos
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Aqui estão alguns dos projetos que desenvolvi.<br />Use os filtros abaixo para
                        encontrar projetos específicos.
                    </p>
                </div>

                {/* Barra de Pesquisa e Filtros */}
                <div className="mb-12 space-y-6">
                    {/* Campo de Busca */}
                    <div className="max-w-2xl mx-auto">
                        <div className="relative">
                            <FontAwesomeIcon icon={faMagnifyingGlass} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Buscar projetos..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
                            />
                            {searchTerm && (
                                <button
                                    onClick={() => setSearchTerm('')}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                                >
                                    <FontAwesomeIcon icon={faX} className="w-5 h-5" />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Filtros de Tecnologia */}
                    <div className="flex flex-wrap justify-center gap-2">
                        {allTechnologies.map((tech) => (
                            <button
                                key={tech}
                                onClick={() => toggleTech(tech)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedTechs.includes(tech)
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                                    }`}
                            >
                                {tech}
                            </button>
                        ))}
                    </div>

                    {/* Contador de Resultados */}
                    <div className="text-center text-gray-400">
                        {filteredProjects.length} projeto{filteredProjects.length !== 1 ? 's' : ''} encontrado{filteredProjects.length !== 1 ? 's' : ''}
                    </div>
                </div>

                {/* Grid de Projetos */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProjects.map((project, index) => (
                        <PortfolioProjectCard key={index} project={project} />
                    ))}
                </div>

                {/* Mensagem quando nenhum projeto é encontrado */}
                {filteredProjects.length === 0 && (
                    <div className="text-center text-gray-400 py-12">
                        Nenhum projeto encontrado com os critérios selecionados.
                    </div>
                )}

            </div>
        </section>
    );
};

export default PortfolioProjectsSection;