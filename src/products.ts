// Lista de produtos exportada para uso no UnihubApp
export type Product = {
  id: number;
  name: string;
  price: number;
  seller: string;
  category: string;
  rating: number;
  image: string;
  description: string;
  location: string;
  tags: string[];
};

export const products: Product[] = [
  // Alimentação
  {
    id: 1,
    name: "Brigadeiros Gourmet",
    price: 25.00,
    seller: "Ana Silva",
    category: "Alimentação",
    rating: 4.8,
    image: "🍫",
    description: "Brigadeiros artesanais com diversos sabores",
    location: "UFFS - Campus Chapecó",
    tags: ["doces", "artesanal", "festa"]
  },
  {
    id: 2,
    name: "Aulas de Inglês",
    price: 40.00,
    seller: "João Santos",
    category: "Educação",
    rating: 4.9,
    image: "📚",
    description: "Aulas particulares de inglês para iniciantes",
    location: "UFFS - Campus Chapecó",
    tags: ["idiomas", "aulas", "inglês"]
  },
  {
    id: 3,
    name: "Camisetas Personalizadas",
    price: 35.00,
    seller: "Maria Costa",
    category: "Moda",
    rating: 4.7,
    image: "👕",
    description: "Camisetas com estampas personalizadas",
    location: "UNOESC - Chapecó",
    tags: ["roupas", "personalizado", "estampa"]
  },
  {
    id: 4,
    name: "Marmitas Fitness",
    price: 15.00,
    seller: "Pedro Lima",
    category: "Alimentação",
    rating: 4.6,
    image: "🥗",
    description: "Marmitas saudáveis para estudantes",
    location: "Unochapecó",
    tags: ["comida", "saudável", "fitness"]
  },
  {
    id: 11,
    name: "Pão de Queijo Caseiro",
    price: 18.00,
    seller: "Lucas Andrade",
    category: "Alimentação",
    rating: 4.9,
    image: "🥐",
    description: "Pão de queijo artesanal, pacote com 10 unidades",
    location: "UNOESC - Chapecó",
    tags: ["pão de queijo", "caseiro", "lanche"]
  },
  {
    id: 12,
    name: "Coxinha Vegana",
    price: 8.00,
    seller: "Fernanda Souza",
    category: "Alimentação",
    rating: 4.7,
    image: "🥟",
    description: "Coxinhas veganas de jaca, porção com 6",
    location: "UFFS - Campus Chapecó",
    tags: ["vegano", "coxinha", "lanche"]
  },
  {
    id: 13,
    name: "Reforço de Matemática",
    price: 35.00,
    seller: "Paula Martins",
    category: "Educação",
    rating: 4.8,
    image: "📐",
    description: "Aulas de reforço em matemática básica e avançada",
    location: "UNOESC - Chapecó",
    tags: ["matemática", "reforço", "aulas"]
  },
  {
    id: 14,
    name: "Mentoria Acadêmica",
    price: 50.00,
    seller: "Carlos Becker",
    category: "Educação",
    rating: 4.7,
    image: "🎓",
    description: "Mentoria para TCC e projetos acadêmicos",
    location: "Unochapecó",
    tags: ["mentoria", "tcc", "projetos"]
  },
  {
    id: 15,
    name: "Bolsas Artesanais",
    price: 60.00,
    seller: "Juliana Dias",
    category: "Moda",
    rating: 4.8,
    image: "👜",
    description: "Bolsas feitas à mão com material reciclado",
    location: "UFFS - Campus Chapecó",
    tags: ["bolsa", "artesanal", "moda"]
  },
  {
    id: 16,
    name: "Bonés Estilosos",
    price: 28.00,
    seller: "Rafael Lima",
    category: "Moda",
    rating: 4.6,
    image: "🧢",
    description: "Bonés personalizados para todas as idades",
    location: "Unochapecó",
    tags: ["boné", "acessório", "moda"]
  },
  {
    id: 17,
    name: "Conserto de Celular",
    price: 80.00,
    seller: "Bruno Silva",
    category: "Serviços",
    rating: 4.9,
    image: "🔧",
    description: "Conserto e manutenção de celulares e tablets",
    location: "UNOESC - Chapecó",
    tags: ["conserto", "celular", "tecnologia"]
  },
  {
    id: 18,
    name: "Ajuste de Roupas",
    price: 25.00,
    seller: "Marina Lopes",
    category: "Serviços",
    rating: 4.7,
    image: "✂️",
    description: "Ajustes e reformas de roupas em geral",
    location: "UFFS - Campus Chapecó",
    tags: ["ajuste", "roupa", "costura"]
  },
  {
    id: 19,
    name: "Dog Walker",
    price: 20.00,
    seller: "Tiago Pires",
    category: "Serviços",
    rating: 4.8,
    image: "🐕",
    description: "Passeios diários com seu pet",
    location: "Unochapecó",
    tags: ["pet", "passeio", "serviço"]
  },
  {
    id: 20,
    name: "Aulas de Programação",
    price: 70.00,
    seller: "Gabriel Souza",
    category: "Tecnologia",
    rating: 4.9,
    image: "💻",
    description: "Aulas de lógica de programação e desenvolvimento web",
    location: "UFFS - Campus Chapecó",
    tags: ["programação", "aulas", "tecnologia"]
  },
  {
    id: 21,
    name: "Criação de Sites",
    price: 200.00,
    seller: "Larissa Farias",
    category: "Tecnologia",
    rating: 4.8,
    image: "🌐",
    description: "Desenvolvimento de sites institucionais e portfólios",
    location: "UNOESC - Chapecó",
    tags: ["site", "web", "tecnologia"]
  },
  {
    id: 22,
    name: "Suporte Técnico",
    price: 50.00,
    seller: "Eduardo Klein",
    category: "Tecnologia",
    rating: 4.7,
    image: "🖥️",
    description: "Suporte técnico para computadores e redes",
    location: "Unochapecó",
    tags: ["suporte", "computador", "tecnologia"]
  },
  {
    id: 23,
    name: "Bolo de Pote",
    price: 10.00,
    seller: "Marina Souza",
    category: "Alimentação",
    rating: 4.5,
    image: "🍰",
    description: "Bolos de pote variados, sabores chocolate e morango",
    location: "UNOESC - Chapecó",
    tags: ["bolo", "sobremesa", "lanche"]
  },
  {
    id: 24,
    name: "Suco Natural",
    price: 7.00,
    seller: "Carlos Lima",
    category: "Alimentação",
    rating: 4.4,
    image: "🥤",
    description: "Sucos naturais de frutas frescas",
    location: "Unochapecó",
    tags: ["suco", "natural", "bebida"]
  },
  {
    id: 25,
    name: "Aulas de Violão",
    price: 45.00,
    seller: "Lucas Prado",
    category: "Educação",
    rating: 4.6,
    image: "🎸",
    description: "Aulas práticas de violão para iniciantes e intermediários",
    location: "UNOESC - Chapecó",
    tags: ["música", "violão", "aulas"]
  },
  {
    id: 26,
    name: "Curso de Excel",
    price: 55.00,
    seller: "Fernanda Dias",
    category: "Educação",
    rating: 4.7,
    image: "🧮",
    description: "Curso rápido de Excel básico ao avançado",
    location: "Unochapecó",
    tags: ["excel", "curso", "planilha"]
  },
  {
    id: 27,
    name: "Pulseiras Artesanais",
    price: 12.00,
    seller: "Ana Paula",
    category: "Moda",
    rating: 4.5,
    image: "📿",
    description: "Pulseiras feitas à mão, diversas cores",
    location: "UFFS - Campus Chapecó",
    tags: ["pulseira", "artesanal", "acessório"]
  },
  {
    id: 28,
    name: "Toucas de Lã",
    price: 22.00,
    seller: "Bruno Martins",
    category: "Moda",
    rating: 4.6,
    image: "🧶",
    description: "Toucas de lã para o inverno, várias cores",
    location: "Unochapecó",
    tags: ["touca", "inverno", "moda"]
  },
  {
    id: 29,
    name: "Manutenção de Notebooks",
    price: 90.00,
    seller: "Paulo Henrique",
    category: "Serviços",
    rating: 4.8,
    image: "🛠️",
    description: "Formatação, limpeza e upgrade de notebooks",
    location: "UFFS - Campus Chapecó",
    tags: ["notebook", "manutenção", "tecnologia"]
  },
  {
    id: 30,
    name: "Fotografia Profissional",
    price: 120.00,
    seller: "Juliana Alves",
    category: "Serviços",
    rating: 4.9,
    image: "📷",
    description: "Ensaios fotográficos e eventos",
    location: "Unochapecó",
    tags: ["fotografia", "evento", "serviço"]
  },
  {
    id: 31,
    name: "Impressão 3D",
    price: 80.00,
    seller: "Ricardo Silva",
    category: "Tecnologia",
    rating: 4.7,
    image: "🖨️",
    description: "Serviço de impressão 3D para protótipos e peças",
    location: "UNOESC - Chapecó",
    tags: ["impressão", "3d", "tecnologia"]
  },
  {
    id: 32,
    name: "Aulas de Robótica",
    price: 100.00,
    seller: "Patrícia Gomes",
    category: "Tecnologia",
    rating: 4.8,
    image: "🤖",
    description: "Aulas práticas de robótica para jovens e adultos",
    location: "Unochapecó",
    tags: ["robótica", "aulas", "tecnologia"]
  }
];
