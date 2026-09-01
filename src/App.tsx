import React, { useState, useEffect, useRef } from 'react';
import { 
  ShoppingCart, 
  Trash2, 
  Plus, 
  Minus, 
  Star, 
  Instagram, 
  MessageCircle, 
  MapPin, 
  Phone, 
  Clock, 
  Sparkles, 
  Trophy, 
  Send,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Flame,
  CheckCircle2,
  Navigation,
  Car,
  Bike,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Store,
  Compass,
  Check
} from 'lucide-react';
import { MethodAccordion } from './components/MethodAccordion';

interface CategoryItem {
  id: string;
  name: string;
  price: number;
}

interface CategoryGroup {
  id: string;
  title: string;
  icon: string;
  items: CategoryItem[];
}

const CATEGORIES_DATA: CategoryGroup[] = [
  {
    id: 'padaria',
    title: '1. Panificadora & Padaria',
    icon: '🥖',
    items: [
      { id: 'pad-1', name: 'Pão Francês (Kg)', price: 15.00 },
      { id: 'pad-2', name: 'Pão Integral (Un)', price: 9.00 },
      { id: 'pad-3', name: 'Pão de Forma', price: 8.50 },
      { id: 'pad-4', name: 'Pão de Alho', price: 12.90 },
      { id: 'pad-5', name: 'Bolo Caseiro', price: 18.00 },
      { id: 'pad-6', name: 'Sonho Doce/Requeijão', price: 6.00 },
      { id: 'pad-7', name: 'Rosquinha de Leite', price: 7.50 },
      { id: 'pad-8', name: 'Pão de Queijo (500g)', price: 18.00 }
    ]
  },
  {
    id: 'churrasco',
    title: '2. Seção de Churrasco & Carnes',
    icon: '🥩',
    items: [
      { id: 'chu-1', name: 'Carne Bovina Picanha (Kg)', price: 69.90 },
      { id: 'chu-2', name: 'Alcatra Bovina (Kg)', price: 42.00 },
      { id: 'chu-3', name: 'Linguiça Toscana (Kg)', price: 24.90 },
      { id: 'chu-4', name: 'Coração de Frango (500g)', price: 19.00 },
      { id: 'chu-5', name: 'Carvão Vegetal (Pacote 3Kg)', price: 15.00 },
      { id: 'chu-6', name: 'Espetos Variados (Kit)', price: 22.00 },
      { id: 'chu-7', name: 'Queijo Coalho p/ Grelhar (Peça)', price: 18.50 }
    ]
  },
  {
    id: 'bebidas',
    title: '3. Seção de Bebidas Geladas',
    icon: '🍺',
    items: [
      { id: 'beb-1', name: 'Cerveja Heineken Long Neck', price: 8.50 },
      { id: 'beb-2', name: 'Cerveja Corona Extra Long Neck', price: 8.90 },
      { id: 'beb-3', name: 'Cerveja Lata 350ml (Pack com 6)', price: 32.00 },
      { id: 'beb-4', name: 'Refrigerante Coca-Cola 2L', price: 11.00 },
      { id: 'beb-5', name: 'Refrigerante Guaraná 2L', price: 9.50 },
      { id: 'beb-6', name: 'Água Mineral 500ml', price: 3.00 },
      { id: 'beb-7', name: 'Água de Coco Gelada 500ml', price: 6.00 }
    ]
  },
  {
    id: 'energeticos',
    title: '4. Seção de Energéticos',
    icon: '⚡',
    items: [
      { id: 'ene-1', name: 'Energético Monster Energy 473ml', price: 12.50 },
      { id: 'ene-2', name: 'Energético Red Bull 250ml', price: 11.00 },
      { id: 'ene-3', name: 'Energético Red Bull 355ml', price: 14.00 },
      { id: 'ene-4', name: 'Energético Baly 2L', price: 13.00 },
      { id: 'ene-5', name: 'Gatorade Isotônico 500ml', price: 7.50 }
    ]
  },
  {
    id: 'acai',
    title: '5. Seção de Açaí & Sobremesas',
    icon: '🍨',
    items: [
      { id: 'aca-1', name: 'Açaí da Hora Pote 1L', price: 28.00 },
      { id: 'aca-2', name: 'Açaí da Hora Pote 500ml', price: 16.00 },
      { id: 'aca-3', name: 'Sorvete Família 1.5L', price: 24.00 },
      { id: 'aca-4', name: 'Banoffee Copo', price: 12.00 },
      { id: 'aca-5', name: 'Açaí com Granola Copo', price: 10.00 },
      { id: 'aca-6', name: 'Picolé Frutas Tropicais', price: 5.00 }
    ]
  },
  {
    id: 'frios',
    title: '6. Frios & Laticínios',
    icon: '🧀',
    items: [
      { id: 'fri-1', name: 'Queijo Mussarela Fatiado (200g)', price: 14.00 },
      { id: 'fri-2', name: 'Presunto Fatiado (200g)', price: 10.00 },
      { id: 'fri-3', name: 'Manteiga da Terra', price: 16.00 },
      { id: 'fri-4', name: 'Requeijão Cremoso', price: 9.50 },
      { id: 'fri-5', name: 'Leite Integral 1L', price: 5.20 },
      { id: 'fri-6', name: 'Iogurte Natural 170g', price: 4.50 }
    ]
  },
  {
    id: 'mercearia',
    title: '7. Mercearia & Despensa',
    icon: '🥫',
    items: [
      { id: 'mer-1', name: 'Arroz Tipo 1 (1Kg)', price: 6.50 },
      { id: 'mer-2', name: 'Feijão Carioca (1Kg)', price: 8.00 },
      { id: 'mer-3', name: 'Café Tradicional Pó (250g)', price: 9.80 },
      { id: 'mer-4', name: 'Açúcar Cristal (1Kg)', price: 5.00 },
      { id: 'mer-5', name: 'Óleo de Soja 900ml', price: 7.50 },
      { id: 'mer-6', name: 'Macarrão Espaguete 500g', price: 4.80 }
    ]
  },
  {
    id: 'snacks',
    title: '8. Salgadinhos, Snacks & Doces',
    icon: '🍿',
    items: [
      { id: 'sna-1', name: 'Batata Frita Pacote', price: 8.00 },
      { id: 'sna-2', name: 'Salgadinho Doritos', price: 7.50 },
      { id: 'sna-3', name: 'Mix de Castanhas', price: 15.00 },
      { id: 'sna-4', name: 'Biscoito Recheado', price: 5.20 },
      { id: 'sna-5', name: 'Chocolate Barra', price: 6.50 },
      { id: 'sna-6', name: 'Amendoim Salgado', price: 5.00 }
    ]
  },
  {
    id: 'hortifruti',
    title: '9. Hortifruti, Ovos & Cafeteria',
    icon: '🍅',
    items: [
      { id: 'hor-1', name: 'Banana Prata (Kg)', price: 6.00 },
      { id: 'hor-2', name: 'Tomate Salada (Kg)', price: 7.50 },
      { id: 'hor-3', name: 'Ovos Brancos (Dúzia)', price: 10.00 },
      { id: 'hor-4', name: 'Café Expresso da Casa', price: 5.99 },
      { id: 'hor-5', name: 'Limão Taiti (Kg)', price: 6.50 },
      { id: 'hor-6', name: 'Maçã Nacional (Kg)', price: 8.90 }
    ]
  },
  {
    id: 'limpeza',
    title: '10. Limpeza & Higiene Pessoal',
    icon: '🧼',
    items: [
      { id: 'lim-1', name: 'Papel Higiênico (4 Rolos)', price: 7.50 },
      { id: 'lim-2', name: 'Detergente Líquido 500ml', price: 3.00 },
      { id: 'lim-3', name: 'Água Sanitária 1L', price: 4.50 },
      { id: 'lim-4', name: 'Inseticida SBP', price: 16.50 },
      { id: 'lim-5', name: 'Sabonete em Barra', price: 3.50 },
      { id: 'lim-6', name: 'Protetor Solar FPS 50', price: 38.00 }
    ]
  }
];

const REVIEWS_DATA = [
  { id: '1', author: 'Mariana Silva', stars: 5, comment: 'Padaria excelente na Praia do Francês! Pão sempre quentinho e atendimento nota 10.' },
  { id: '2', author: 'Carlos Eduardo', stars: 5, comment: 'Maravilhoso encontrar um mercado completo assim. O açaí e as bebidas geladas são ótimos!' },
  { id: '3', author: 'Ana Paula', stars: 4, comment: 'Muito prático pedir as coisas por delivery. Produtos fresquinhos e entrega rápida.' },
  { id: '4', author: 'Roberto Mendes', stars: 5, comment: 'Ótima localização, preço justo e funcionários super educados. Recomendo muito!' },
  { id: '5', author: 'Juliana Costa', stars: 5, comment: 'O atendimento pelo WhatsApp é maravilhoso e a entrega na pousada foi super rápida!' }
];

const INSTA_POSTS = [
  { id: '1', img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400', caption: 'Pães artesanais quentinhos saindo do forno!' },
  { id: '2', img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400', caption: 'Água de coco e bebidas geladas para curtir a praia.' },
  { id: '3', img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400', caption: 'Tudo pronto para o churrasco no Francês.' },
  { id: '4', img: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400', caption: 'Sobremesas e açaí da hora todos os dias.' },
  { id: '5', img: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=400', caption: 'Hortifrúti e produtos frescos com qualidade garantida.' }
];

const QUIZ_QUESTIONS = [
  {
    pergunta: "O que você acha da nossa variedade de pães, carnes de churrasco e bebidas geladas?",
    opcoes: [
      { texto: "Poderia ter mais opções...", feedback: "Opa! Estamos sempre renovando o estoque com os melhores produtos da Praia do Francês. Vamos para a última pergunta!" },
      { texto: "Excelente! É o mercado mais completo da região.", feedback: "Com certeza! Trabalhamos diariamente para ter tudo do bom e do melhor para você." }
    ]
  },
  {
    pergunta: "Como você avalia a agilidade do nosso atendimento e delivery?",
    opcoes: [
      { texto: "Demora um pouco para entregar...", feedback: "Ops, pegadinha! Nossa equipe de entregas voa para chegar rapidinho na sua casa ou pousada." },
      { texto: "Muito rápido e eficiente!", feedback: "Excelente! Agilidade e acolhimento são nossos maiores compromissos." }
    ]
  }
];

const FAQ_ITEMS = [
  {
    id: 1,
    pergunta: "1. Qual é o horário de funcionamento do Empório da Praia?",
    resposta: "Funcionamos de segunda a sábado das 7h às 19:30h e aos domingos das 7h às 18:30h."
  },
  {
    id: 2,
    pergunta: "2. Vocês entregam delivery em toda a Praia do Francês?",
    resposta: "Sim! Entregamos em toda a extensão da Praia do Francês, incluindo pousadas, hotéis, condomínios e residências."
  },
  {
    id: 3,
    pergunta: "3. Como faço para fazer um pedido pelo WhatsApp?",
    resposta: "Você pode utilizar a opção \"Cesta por Cliques\" no site para montar seu pedido automaticamente ou, se preferir, digitar sua lista completa no campo de \"Formulário Escrito\" e enviar para o nosso número."
  },
  {
    id: 4,
    pergunta: "4. O pão da padaria é fresquinho?",
    resposta: "Com certeza! Temos fornadas de pão francês saindo várias vezes ao dia, além de bolos, salgados e doces frescos."
  },
  {
    id: 5,
    pergunta: "5. As bebidas estão bem geladas?",
    resposta: "Sim! Nossa seção de bebidas é preparada para garantir cervejas, refrigerantes, água e energéticos no ponto ideal para você curtir a praia."
  },
  {
    id: 6,
    pergunta: "6. Posso encomendar itens para churrasco?",
    resposta: "Sim! Temos carnes nobres, linguiças, carvão, espetos e tudo o que você precisa para um bom churrasco. Aceitamos encomendas para quantidades maiores."
  },
  {
    id: 7,
    pergunta: "7. Quais são as formas de pagamento aceitas no delivery?",
    resposta: "Aceitamos Pix, cartões de crédito/débito (na entrega) e dinheiro."
  },
  {
    id: 8,
    pergunta: "8. Vocês vendem açaí e produtos congelados?",
    resposta: "Sim, temos potes de Açaí da Hora, sorvetes, gelo e diversas opções de pratos congelados."
  },
  {
    id: 9,
    pergunta: "9. Tem produtos de limpeza e higiene caso eu precise?",
    resposta: "Sim, nosso mercado é completo. Temos desde itens de higiene pessoal (sabonete, shampoo) até produtos de limpeza para casa."
  },
  {
    id: 10,
    pergunta: "10. Como posso avaliar o atendimento ou tirar dúvidas?",
    resposta: "Você pode deixar sua avaliação no nosso carrossel do Google aqui no site ou entrar em contato direto pelo nosso WhatsApp: (82) 99402-1854."
  }
];

export default function App() {
  // Cesta de compras
  const [cesta, setCesta] = useState<{ id: string; name: string; price: number; quantity: number }[]>([]);
  const [textoFormulario, setTextoFormulario] = useState('');
  const [enderecoEntrega, setEnderecoEntrega] = useState('');

  // Quiz state
  const [currentQuizIdx, setCurrentQuizIdx] = useState(0);
  const [quizFeedback, setQuizFeedback] = useState<string | null>(null);
  const [quizFinished, setQuizFinished] = useState(false);

  // FAQ Accordion State (open question ID or null)
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Carousel refs for drag and auto scroll
  const reviewsRef = useRef<HTMLDivElement>(null);
  const instaRef = useRef<HTMLDivElement>(null);

  const toggleFaq = (id: number) => {
    setOpenFaq(prev => prev === id ? null : id);
  };

  // Add Item to basket
  const adicionarItem = (name: string, price: number) => {
    setCesta(prev => {
      const idx = prev.findIndex(item => item.name === name);
      if (idx !== -1) {
        const updated = [...prev];
        updated[idx].quantity += 1;
        return updated;
      }
      return [...prev, { id: `${name}-${Date.now()}`, name, price, quantity: 1 }];
    });
  };

  const alterarQuantidade = (name: string, delta: number) => {
    setCesta(prev => {
      return prev.map(item => {
        if (item.name === name) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean) as { id: string; name: string; price: number; quantity: number }[];
    });
  };

  const totalCesta = cesta.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const totalItensCount = cesta.reduce((acc, item) => acc + item.quantity, 0);

  // WhatsApp Enviar Cesta
  const enviarWhatsAppCesta = () => {
    if (cesta.length === 0) {
      alert("Por favor, adicione itens à sua cesta antes de enviar!");
      return;
    }
    let mensagem = `🛒 *Novo Pedido - Empório da Praia Mercado*\n\n`;
    cesta.forEach(item => {
      mensagem += `• ${item.quantity}x ${item.name} - R$ ${(item.price * item.quantity).toFixed(2)}\n`;
    });
    mensagem += `\n*Total Estimado:* R$ ${totalCesta.toFixed(2)}`;
    if (enderecoEntrega) {
      mensagem += `\n*Endereço / Pousada:* ${enderecoEntrega}`;
    } else {
      mensagem += `\n*Endereço de Entrega:* `;
    }

    const encoded = encodeURIComponent(mensagem);
    window.open(`https://api.whatsapp.com/send?phone=5582994021854&text=${encoded}`, '_blank');
  };

  // WhatsApp Enviar Texto Livre
  const enviarWhatsAppTexto = () => {
    if (!textoFormulario.trim()) {
      alert("Por favor, escreva os itens do seu pedido no campo de texto!");
      return;
    }
    let mensagem = `📝 *Pedido Escrito - Empório da Praia Mercado*\n\n${textoFormulario.trim()}`;
    if (enderecoEntrega) {
      mensagem += `\n\n*Endereço / Pousada:* ${enderecoEntrega}`;
    } else {
      mensagem += `\n\n*Endereço de Entrega:* `;
    }
    const encoded = encodeURIComponent(mensagem);
    window.open(`https://api.whatsapp.com/send?phone=5582994021854&text=${encoded}`, '_blank');
  };

  // WhatsApp Iniciar Pedido Simples
  const enviarWhatsAppSimples = () => {
    const mensagem = encodeURIComponent("Olá! Gostaria de fazer um pedido delivery no Empório da Praia!");
    window.open(`https://api.whatsapp.com/send?phone=5582994021854&text=${mensagem}`, '_blank');
  };

  // Quiz responder
  const handleResponderQuiz = (feedback: string) => {
    setQuizFeedback(feedback);
    setTimeout(() => {
      if (currentQuizIdx + 1 < QUIZ_QUESTIONS.length) {
        setCurrentQuizIdx(prev => prev + 1);
        setQuizFeedback(null);
      } else {
        setQuizFinished(true);
      }
    }, 2800);
  };

  // Auto-scroll Carousels
  useEffect(() => {
    const setupAutoScroll = (ref: React.RefObject<HTMLDivElement>) => {
      const el = ref.current;
      if (!el) return;
      const interval = setInterval(() => {
        if (!el.matches(':hover')) {
          el.scrollBy({ left: 300, behavior: 'smooth' });
          if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 10) {
            el.scrollTo({ left: 0, behavior: 'smooth' });
          }
        }
      }, 4000);
      return interval;
    };

    const int1 = setupAutoScroll(reviewsRef);
    const int2 = setupAutoScroll(instaRef);

    return () => {
      clearInterval(int1);
      clearInterval(int2);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#f7f9fa] text-[#333] font-sans selection:bg-[#f39c12] selection:text-white">
      
      {/* HEADER COMPACTO & FAIXA DE INFORMAÇÕES ANDANDO (STICKY) */}
      <div className="sticky top-0 z-50 shadow-lg">
        {/* NAVBAR COMPACTA ESTILO SITE TRADICIONAL */}
        <header className="bg-[#1a1a1a]/95 backdrop-blur-md text-white border-b border-slate-800 px-3 sm:px-6 py-2.5">
          <div className="max-w-[1300px] mx-auto flex items-center justify-between gap-3">
            
            {/* Logo e Nome da Marca (Compacto) */}
            <a href="#hero" className="flex items-center gap-2.5 group flex-shrink-0">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#f39c12] shadow-sm bg-white group-hover:scale-105 transition-transform">
                <img 
                  src="https://res.cloudinary.com/vje6jqtb/image/upload/v1788219297/WhatsApp_Image_2026-08-31_at_8.29.22_PM.jpg" 
                  alt="Empório da Praia Mercado Logo" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="leading-tight">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-sm sm:text-base text-white tracking-tight group-hover:text-[#f39c12] transition-colors">
                    Empório da Praia
                  </span>
                  <span className="bg-[#f39c12] text-slate-950 text-[10px] font-black px-1.5 py-0.5 rounded uppercase">
                    Mercado
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
                  Praia do Francês, AL
                </p>
              </div>
            </a>

            {/* Menu de Navegação Horizontal */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-xs font-semibold text-slate-300">
              <a href="#hero" className="hover:text-[#f39c12] hover:bg-white/5 px-2.5 py-1.5 rounded-md transition-colors">Início</a>
              <a href="#delivery-info" className="hover:text-[#f39c12] hover:bg-white/5 px-2.5 py-1.5 rounded-md transition-colors">Delivery</a>
              <a href="#delivery" className="hover:text-[#f39c12] hover:bg-white/5 px-2.5 py-1.5 rounded-md transition-colors">Produtos</a>
              <a href="#minigame" className="hover:text-[#f39c12] hover:bg-white/5 px-2.5 py-1.5 rounded-md transition-colors">Quiz</a>
              <a href="#localizacao" className="hover:text-[#f39c12] hover:bg-white/5 px-2.5 py-1.5 rounded-md transition-colors">Como Chegar</a>
              <a href="#faq" className="hover:text-[#f39c12] hover:bg-white/5 px-2.5 py-1.5 rounded-md transition-colors">FAQ</a>
              <a href="#avaliacoes" className="hover:text-[#f39c12] hover:bg-white/5 px-2.5 py-1.5 rounded-md transition-colors">Google</a>
              <a href="#instagram" className="hover:text-[#f39c12] hover:bg-white/5 px-2.5 py-1.5 rounded-md transition-colors">Instagram</a>
            </nav>

            {/* Ações Rápidas (Cesta + WhatsApp) */}
            <div className="flex items-center gap-2">
              <a
                href="#painel-pedidos"
                className={`flex items-center gap-1.5 text-xs font-bold py-1.5 px-3 rounded-full transition-all border ${
                  totalItensCount > 0 
                    ? 'bg-[#f39c12] text-slate-950 border-[#f39c12] shadow-sm animate-pulse' 
                    : 'bg-white/10 hover:bg-white/20 text-slate-200 border-white/10'
                }`}
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>Cesta ({totalItensCount})</span>
                {totalItensCount > 0 && (
                  <span className="hidden sm:inline font-extrabold">• R$ {totalCesta.toFixed(2)}</span>
                )}
              </a>

              <button
                onClick={enviarWhatsAppSimples}
                className="bg-[#25D366] hover:bg-[#1ebe57] text-white font-bold text-xs py-1.5 px-3 rounded-full shadow transition-all flex items-center gap-1 cursor-pointer flex-shrink-0"
                title="Falar no WhatsApp"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">WhatsApp</span>
              </button>
            </div>

          </div>

          {/* Menu Mobile Rolável Horizontalmente */}
          <div className="lg:hidden flex items-center gap-2 overflow-x-auto no-scrollbar pt-2 mt-1 border-t border-white/10 text-[11px] font-semibold text-slate-300">
            <a href="#hero" className="whitespace-nowrap px-2 py-0.5 hover:text-[#f39c12]">Início</a>
            <a href="#delivery-info" className="whitespace-nowrap px-2 py-0.5 hover:text-[#f39c12]">Delivery</a>
            <a href="#delivery" className="whitespace-nowrap px-2 py-0.5 hover:text-[#f39c12]">Produtos</a>
            <a href="#minigame" className="whitespace-nowrap px-2 py-0.5 hover:text-[#f39c12]">Quiz</a>
            <a href="#localizacao" className="whitespace-nowrap px-2 py-0.5 hover:text-[#f39c12]">Como Chegar</a>
            <a href="#faq" className="whitespace-nowrap px-2 py-0.5 hover:text-[#f39c12]">FAQ</a>
            <a href="#avaliacoes" className="whitespace-nowrap px-2 py-0.5 hover:text-[#f39c12]">Google</a>
            <a href="#instagram" className="whitespace-nowrap px-2 py-0.5 hover:text-[#f39c12]">Instagram</a>
            <a href="#contato" className="whitespace-nowrap px-2 py-0.5 hover:text-[#f39c12]">Contato</a>
          </div>
        </header>

        {/* FAIXA COM INFORMAÇÕES ANDANDO (MARQUEE TICKER CONTÍNUO) */}
        <div className="bg-gradient-to-r from-[#f39c12] via-[#f1a72d] to-[#e67e22] text-slate-950 font-extrabold text-xs sm:text-[13px] py-1.5 overflow-hidden border-b border-amber-600 shadow-sm select-none relative">
          <div className="animate-marquee flex items-center gap-6 whitespace-nowrap">
            {/* Bloco 1 */}
            <span className="flex items-center gap-2">🥖 Pão Francês quentinho saindo a toda hora</span>
            <span className="opacity-40 font-normal">•</span>
            <span className="flex items-center gap-2">🛵 Delivery Rápido em toda a Praia do Francês (Casa, Pousada ou Areia)</span>
            <span className="opacity-40 font-normal">•</span>
            <span className="flex items-center gap-2">🥩 Carnes Nobres, Carvão e Espetos para Churrasco</span>
            <span className="opacity-40 font-normal">•</span>
            <span className="flex items-center gap-2">🍺 Cervejas Ultra Geladas & Bebidas</span>
            <span className="opacity-40 font-normal">•</span>
            <span className="flex items-center gap-2">⚡ Energéticos & Açaí da Hora</span>
            <span className="opacity-40 font-normal">•</span>
            <span className="flex items-center gap-2">⏰ Seg a Sáb: 7h às 19:30h | Dom: 7h às 18:30h</span>
            <span className="opacity-40 font-normal">•</span>
            <span className="flex items-center gap-2">📍 Rua São Pedro Pescador, 270</span>
            <span className="opacity-40 font-normal">•</span>
            <span className="flex items-center gap-2">📞 WhatsApp: (82) 99402-1854</span>
            <span className="opacity-40 font-normal">•</span>

            {/* Bloco 2 (Duplicado para loop perfeito sem falhas) */}
            <span className="flex items-center gap-2">🥖 Pão Francês quentinho saindo a toda hora</span>
            <span className="opacity-40 font-normal">•</span>
            <span className="flex items-center gap-2">🛵 Delivery Rápido em toda a Praia do Francês (Casa, Pousada ou Areia)</span>
            <span className="opacity-40 font-normal">•</span>
            <span className="flex items-center gap-2">🥩 Carnes Nobres, Carvão e Espetos para Churrasco</span>
            <span className="opacity-40 font-normal">•</span>
            <span className="flex items-center gap-2">🍺 Cervejas Ultra Geladas & Bebidas</span>
            <span className="opacity-40 font-normal">•</span>
            <span className="flex items-center gap-2">⚡ Energéticos & Açaí da Hora</span>
            <span className="opacity-40 font-normal">•</span>
            <span className="flex items-center gap-2">⏰ Seg a Sáb: 7h às 19:30h | Dom: 7h às 18:30h</span>
            <span className="opacity-40 font-normal">•</span>
            <span className="flex items-center gap-2">📍 Rua São Pedro Pescador, 270</span>
            <span className="opacity-40 font-normal">•</span>
            <span className="flex items-center gap-2">📞 WhatsApp: (82) 99402-1854</span>
            <span className="opacity-40 font-normal">•</span>
          </div>
        </div>
      </div>

      {/* HERO COM VÍDEO */}
      <section id="hero" className="py-8 px-4 max-w-[1200px] mx-auto">
        <div className="bg-[#111] text-white rounded-2xl text-center p-6 sm:p-10 shadow-2xl border-2 border-[#f39c12]/40">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#f39c12] mb-3">
            Bem-vindo ao Empório da Praia
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto mb-6">
            O mercado mais completo da Praia do Francês. Assista ao vídeo e conheça nosso espaço!
          </p>
          
          <div className="max-w-[800px] mx-auto rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.5)] bg-black border-4 border-slate-800">
            <video 
              autoPlay 
              muted 
              loop 
              playsInline
              controls
              className="w-full h-[320px] sm:h-[420px] object-cover"
              poster="https://res.cloudinary.com/vje6jqtb/image/upload/v1788219297/WhatsApp_Image_2026-08-31_at_8.29.22_PM.jpg"
            >
              <source src="https://res.cloudinary.com/vje6jqtb/video/upload/v1788219315/WhatsApp_Video_2026-08-31_at_6.00.24_PM.mp4" type="video/mp4" />
              Seu navegador não suporta vídeos.
            </video>
          </div>
        </div>
      </section>

      {/* NOVO BLOCO 1: DELIVERY RÁPIDO NA PRAIA DO FRANCÊS */}
      <section id="delivery-info" className="py-8 px-4 max-w-[1200px] mx-auto">
        <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] text-white rounded-2xl p-6 sm:p-10 shadow-2xl border-2 border-[#f39c12] relative overflow-hidden">
          <div className="absolute -right-12 -top-12 w-64 h-64 bg-[#f39c12]/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-[#f39c12] text-slate-950 text-xs sm:text-sm font-black px-4 py-1.5 rounded-full uppercase tracking-wider mb-4 shadow-md">
              <Bike className="w-4 h-4" /> Delivery Rápido na Praia do Francês
            </div>
            
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-4">
              Receba Suas Compras Onde Estiver!
            </h2>
            
            <p className="text-slate-300 text-base sm:text-lg mb-6 leading-relaxed">
              Esqueceu alguma coisa na praia, está curtindo a piscina ou não quer sair do conforto da sua casa/hotel? Nós levamos tudo até você.
            </p>

            {/* Como Funciona Box */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-5 sm:p-6 mb-8 text-left">
              <h3 className="text-[#f39c12] font-bold text-base sm:text-lg mb-2 flex items-center gap-2">
                <Compass className="w-5 h-5" /> Como Funciona:
              </h3>
              <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
                Navegue pelas nossas categorias, monte sua cesta com os produtos que precisa (temos padaria, bebidas geladas, carnes para churrasco, itens de praia e muito mais) e envie o pedido diretamente para o nosso WhatsApp. Nossa equipe entrega rapidinho na sua porta, pousada ou na areia!
              </p>
            </div>

            {/* Botões de Ação */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="#delivery"
                className="w-full sm:w-auto bg-[#f39c12] hover:bg-[#d68109] text-slate-950 font-black text-sm sm:text-base py-3.5 px-6 rounded-full shadow-lg transform hover:scale-105 transition-all flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>🛒 Montar Cesta por Cliques</span>
              </a>
              <a
                href="#painel-pedidos"
                className="w-full sm:w-auto bg-[#25D366] hover:bg-[#1ebe57] text-white font-bold text-sm sm:text-base py-3.5 px-6 rounded-full shadow-lg transform hover:scale-105 transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                <span>📝 Enviar Lista Escrita no WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO MINI-GAME DE SATISFAÇÃO (COM PEGADINHA) */}
      <section id="minigame" className="py-8 px-4 max-w-[1200px] mx-auto">
        <div className="bg-[#fff3e0] border-2 border-[#f39c12] rounded-2xl p-6 sm:p-8 text-center shadow-[0_4px_15px_rgba(0,0,0,0.05)]">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">
            🎮 Quiz de Satisfação do Empório
          </h2>
          <p className="text-slate-700 text-sm sm:text-base mb-6">
            Responda rápido e ajude a otimizar nossos serviços!
          </p>

          <div className="max-w-[600px] mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.1)] border border-orange-200">
            {!quizFinished ? (
              <>
                <h3 className="text-lg font-bold text-slate-800 mb-4">
                  {QUIZ_QUESTIONS[currentQuizIdx].pergunta}
                </h3>

                <div className="flex flex-col gap-3">
                  {QUIZ_QUESTIONS[currentQuizIdx].opcoes.map((opcao, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleResponderQuiz(opcao.feedback)}
                      className="bg-[#fdfdfd] border-2 border-slate-200 hover:bg-[#f39c12] hover:text-white hover:border-[#f39c12] p-3.5 rounded-lg cursor-pointer text-sm sm:text-base font-semibold transition-colors duration-200 text-slate-800"
                    >
                      {opcao.texto}
                    </button>
                  ))}
                </div>

                {quizFeedback && (
                  <div className="mt-4 font-bold min-h-[24px] text-[#d35400] text-sm animate-pulse">
                    {quizFeedback}
                  </div>
                )}
              </>
            ) : (
              <div className="animate-in fade-in zoom-in duration-300 py-2">
                <div className="w-12 h-12 bg-[#27ae60] text-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <Trophy className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[#27ae60] mb-2">
                  🎉 Parabéns, você concluiu o Quiz!
                </h3>
                <p className="text-slate-600 text-sm mb-5 leading-relaxed">
                  Sua opinião é fundamental. Deixe sua avaliação oficial no Google para ajudar nosso mercado a ir ainda mais longe!
                </p>
                <a 
                  href="#avaliacoes" 
                  className="inline-block bg-[#4285F4] hover:bg-[#357ae8] text-white font-bold text-sm py-3 px-6 rounded-full shadow-[0_4px_10px_rgba(66,133,244,0.3)] transition-colors"
                >
                  ⭐ Avaliar no Google Agora
                </a>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SEÇÃO DE SETORES / ACORDEÃO VISUAL */}
      <section className="py-4">
        <MethodAccordion />
      </section>

      {/* SEÇÃO DE DELIVERY E LISTA GIGANTE EM 10 CATEGORIAS COM EMOJIS */}
      <section id="delivery" className="py-8 px-4 max-w-[1200px] mx-auto">
        <div className="bg-white rounded-2xl shadow-[0_4px_15px_rgba(0,0,0,0.05)] p-6 sm:p-10 border border-slate-200">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-center text-slate-900 mb-2">
            🛒 Delivery & Lista de Compras Completa
          </h2>
          <p className="text-center text-slate-600 text-sm sm:text-base max-w-2xl mx-auto mb-8">
            Explore as 10 categorias abaixo, escolha os produtos ou use o formulário escrito para mandar direto para o nosso WhatsApp!
          </p>

          {/* Grid de 10 Categorias */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {CATEGORIES_DATA.map(cat => (
              <div key={cat.id} className="bg-[#fafbfc] border border-[#e1e4e8] rounded-xl p-5 shadow-[0_2px_5px_rgba(0,0,0,0.02)] flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-[#24292e] border-b-2 border-[#f39c12] pb-2 mb-3 flex items-center gap-1.5">
                    <span>{cat.title}</span>
                  </h3>
                  <div className="max-h-[260px] overflow-y-auto pr-1 space-y-1 scrollbar-thin">
                    {cat.items.map(item => (
                      <div key={item.id} className="flex justify-between items-center py-1.5 border-b border-dashed border-slate-200 text-xs sm:text-sm">
                        <span className="text-slate-800 pr-2">{item.name} - R$ {item.price.toFixed(2)}</span>
                        <button 
                          onClick={() => adicionarItem(item.name, item.price)}
                          className="bg-[#27ae60] hover:bg-[#219653] text-white font-bold px-2.5 py-1 rounded text-xs transition-colors shadow-sm flex-shrink-0 cursor-pointer"
                          title={`Adicionar ${item.name}`}
                        >
                          +
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* FORMULÁRIO E CESTA DE COMPRAS INTEGRADOS AO WHATSAPP */}
          <div id="painel-pedidos" className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#f1f4f6] p-6 rounded-xl border border-[#d1d8dd]">
            
            {/* Opção A: Cesta por Cliques */}
            <div className="bg-white p-5 rounded-lg border border-slate-200 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-slate-800 text-base mb-3 flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-[#f39c12]" />
                  <span>Opção A: Enviar Cesta por Cliques</span>
                </h3>
                
                <ul className="max-h-[180px] overflow-y-auto bg-slate-50 p-3 rounded-md border border-slate-200 mb-4 space-y-2">
                  {cesta.length === 0 ? (
                    <li className="text-xs text-slate-500 italic py-4 text-center">
                      Sua cesta está vazia. Clique nos botões [+] nas categorias acima!
                    </li>
                  ) : (
                    cesta.map(item => (
                      <li key={item.id} className="flex justify-between items-center text-xs sm:text-sm border-b border-slate-200 pb-1.5">
                        <span className="font-medium text-slate-800">{item.quantity}x {item.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-[#f39c12]">R$ {(item.price * item.quantity).toFixed(2)}</span>
                          <div className="flex items-center gap-1 bg-slate-200 rounded px-1">
                            <button onClick={() => alterarQuantidade(item.name, -1)} className="px-1 text-slate-600 hover:text-slate-900 font-bold">-</button>
                            <span className="text-xs">{item.quantity}</span>
                            <button onClick={() => alterarQuantidade(item.name, 1)} className="px-1 text-slate-600 hover:text-slate-900 font-bold">+</button>
                          </div>
                        </div>
                      </li>
                    ))
                  )}
                </ul>

                <p className="text-sm font-bold text-slate-900 mb-3">
                  Total Estimado: <span className="text-[#f39c12] text-lg">R$ {totalCesta.toFixed(2)}</span>
                </p>
              </div>

              <button 
                onClick={enviarWhatsAppCesta}
                className="bg-[#25D366] hover:bg-[#1ebe57] text-white py-3 px-5 rounded-full font-bold text-sm sm:text-base w-full shadow-[0_4px_10px_rgba(37,211,102,0.3)] transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Enviar Cesta por Cliques via WhatsApp 🚀</span>
              </button>
            </div>

            {/* Opção B: Formulário Escrito */}
            <div className="bg-white p-5 rounded-lg border border-slate-200 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-slate-800 text-base mb-2 flex items-center gap-2">
                  <Send className="w-5 h-5 text-[#f39c12]" />
                  <span>Opção B: Formulário Escrito (Livre)</span>
                </h3>
                <p className="text-xs text-slate-500 mb-2">
                  Escreva sua lista de compras livremente abaixo:
                </p>
                <textarea 
                  value={textoFormulario}
                  onChange={e => setTextoFormulario(e.target.value)}
                  placeholder="Ex: Preciso de 2 cervejas Heineken geladas, 1 carvão e 1 pacote de pão francês quentinho..."
                  className="w-full h-[120px] p-3 border border-slate-300 rounded-md resize-none mb-3 text-sm focus:outline-none focus:border-[#f39c12]"
                />
              </div>

              <button 
                onClick={enviarWhatsAppTexto}
                className="bg-[#25D366] hover:bg-[#1ebe57] text-white py-3 px-5 rounded-full font-bold text-sm sm:text-base w-full shadow-[0_4px_10px_rgba(37,211,102,0.3)] transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Enviar Pedido Escrito via WhatsApp 📝</span>
              </button>
            </div>

          </div>

          {/* Campo extra de Endereço de Entrega */}
          <div className="mt-4 bg-white p-4 rounded-xl border border-slate-200 max-w-xl mx-auto text-center">
            <label className="block text-xs font-bold text-slate-700 mb-1">
              📍 Endereço / Pousada na Praia do Francês (Opcional):
            </label>
            <input 
              type="text"
              value={enderecoEntrega}
              onChange={e => setEnderecoEntrega(e.target.value)}
              placeholder="Ex: Pousada dos Corais / Rua São Pedro Pescador, 123"
              className="w-full p-2.5 text-xs sm:text-sm border border-slate-300 rounded-lg text-center focus:outline-none focus:border-[#f39c12]"
            />
          </div>

        </div>
      </section>

      {/* NOVO BLOCO 2: LOCALIZAÇÃO E COMO CHEGAR */}
      <section id="localizacao" className="py-8 px-4 max-w-[1200px] mx-auto">
        <div className="bg-white rounded-2xl shadow-[0_4px_15px_rgba(0,0,0,0.05)] p-6 sm:p-10 border border-slate-200">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <div className="inline-flex items-center gap-2 bg-[#f39c12] text-slate-950 text-xs sm:text-sm font-black px-4 py-1.5 rounded-full uppercase tracking-wider mb-3 shadow-md">
              <MapPin className="w-4 h-4" /> Localização e Como Chegar
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mb-3">
              Venha nos Visitar!
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              Estamos situados no coração da Praia do Francês, prontos para atender você, sua família e os turistas com praticidade e rapidez.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-[#fafbfc] border border-slate-200 rounded-xl p-6 sm:p-8">
            {/* Informações de Endereço & Ações */}
            <div className="space-y-6">
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-[#f39c12] flex-shrink-0 mt-0.5">
                    <Store className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-base">Endereço:</h4>
                    <p className="text-slate-700 text-sm sm:text-base font-medium mt-0.5">
                      Rua São Pedro Pescador, 270 - Praia do Francês, Marechal Deodoro - AL, 57160-000
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-2 border-t border-slate-100">
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-[#f39c12] flex-shrink-0 mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Horário de Funcionamento:</h4>
                    <p className="text-slate-600 text-xs sm:text-sm">
                      Seg a Sáb: 07h às 19:30h | Domingo: 07h às 18:30h
                    </p>
                  </div>
                </div>
              </div>

              {/* Botões de Ação */}
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=Rua+S%C3%A3o+Pedro+Pescador,+270+-+Praia+do+Franc%C3%AAs,+Marechal+Deodoro+-+AL,+57160-000"
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 bg-[#1a1a1a] hover:bg-[#333] text-white font-bold py-3.5 px-5 rounded-xl text-center text-sm sm:text-base shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Car className="w-5 h-5 text-[#f39c12]" />
                  <span>🚗 Como Chegar</span>
                </a>
                <button
                  onClick={enviarWhatsAppSimples}
                  className="flex-1 bg-[#25D366] hover:bg-[#1ebe57] text-white font-bold py-3.5 px-5 rounded-xl text-center text-sm sm:text-base shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Bike className="w-5 h-5" />
                  <span>🛵 Pedir Lista Delivery</span>
                </button>
              </div>
            </div>

            {/* Mapa Interativo / Embed */}
            <div className="w-full h-[280px] sm:h-[320px] rounded-xl overflow-hidden shadow-md border-2 border-slate-200 relative bg-slate-100">
              <iframe
                title="Mapa Empório da Praia Mercado"
                src="https://maps.google.com/maps?q=Rua%20S%C3%A3o%20Pedro%20Pescador,%20270,%20Praia%20do%20Franc%C3%AAs,%20Marechal%20Deodoro%20-%20AL&t=&z=16&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* NOVO BLOCO 3: PERGUNTAS FREQUENTES (FAQ) */}
      <section id="faq" className="py-8 px-4 max-w-[1200px] mx-auto">
        <div className="bg-white rounded-2xl shadow-[0_4px_15px_rgba(0,0,0,0.05)] p-6 sm:p-10 border border-slate-200">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <div className="inline-flex items-center gap-2 bg-[#f39c12] text-slate-950 text-xs sm:text-sm font-black px-4 py-1.5 rounded-full uppercase tracking-wider mb-3 shadow-md">
              <HelpCircle className="w-4 h-4" /> Dúvidas Frequentes
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mb-2">
              ❓ Perguntas Frequentes (FAQ)
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Tire todas as suas dúvidas sobre nossos produtos, funcionamento e entregas na Praia do Francês.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {FAQ_ITEMS.map(faq => {
              const isOpen = openFaq === faq.id;
              return (
                <div 
                  key={faq.id}
                  className={`border rounded-xl transition-all duration-200 ${
                    isOpen ? 'border-[#f39c12] bg-[#fffaf0] shadow-sm' : 'border-slate-200 bg-[#fafbfc] hover:border-slate-300'
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full p-4 sm:p-5 text-left font-bold text-slate-900 text-sm sm:text-base flex justify-between items-center gap-3 cursor-pointer"
                  >
                    <span>{faq.pergunta}</span>
                    <span className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-transform ${
                      isOpen ? 'bg-[#f39c12] text-white rotate-180' : 'bg-slate-200 text-slate-600'
                    }`}>
                      <ChevronDown className="w-4 h-4" />
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 pt-1 text-slate-700 text-xs sm:text-sm leading-relaxed border-t border-orange-100/60 animate-in fade-in duration-200">
                      <p className="flex items-start gap-2">
                        <span className="text-[#27ae60] font-bold">R:</span>
                        <span>{faq.resposta}</span>
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Dúvida extra */}
          <div className="text-center mt-8 pt-6 border-t border-slate-100">
            <p className="text-xs sm:text-sm text-slate-600 mb-3">Ainda tem alguma dúvida ou precisa de um produto específico?</p>
            <button
              onClick={enviarWhatsAppSimples}
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe57] text-white font-bold text-xs sm:text-sm py-2.5 px-5 rounded-full shadow transition-colors cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Falar Diretamente pelo WhatsApp</span>
            </button>
          </div>
        </div>
      </section>

      {/* SEÇÃO GOOGLE REVIEWS (LADO A LADO, ARRASTÁVEL, AUTO-SCROLL) */}
      <section id="avaliacoes" className="py-8 px-4 max-w-[1200px] mx-auto">
        <div className="bg-white rounded-2xl shadow-[0_4px_15px_rgba(0,0,0,0.05)] p-6 sm:p-10 border border-slate-200">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-slate-900 mb-6">
            ⭐ O que nossos clientes dizem no Google (4,5 de Avaliação)
          </h2>
          
          <div 
            ref={reviewsRef}
            className="flex gap-5 overflow-x-auto scroll-smooth py-3 no-scrollbar cursor-grab active:cursor-grabbing select-none"
          >
            {REVIEWS_DATA.map(rev => (
              <div 
                key={rev.id} 
                className="min-w-[280px] sm:min-w-[300px] max-w-[300px] bg-[#fff8eb] border border-[#f39c12] rounded-lg p-5 flex-shrink-0 shadow-[0_2px_5px_rgba(0,0,0,0.05)]"
              >
                <h4 className="font-bold text-slate-900 text-sm mb-1">{rev.author}</h4>
                <div className="text-[#f39c12] text-sm mb-2 font-bold">
                  {'★'.repeat(rev.stars)}{'☆'.repeat(5 - rev.stars)}
                </div>
                <p className="text-slate-700 text-xs sm:text-sm italic leading-relaxed">
                  "{rev.comment}"
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-6">
            <a 
              href="https://maps.google.com/?q=Emporio+da+Praia+Mercado+Praia+do+Frances" 
              target="_blank" 
              rel="noreferrer"
              className="inline-block bg-[#4285F4] hover:bg-[#357ae8] text-white font-bold text-sm py-3 px-6 rounded-full shadow-[0_4px_10px_rgba(66,133,244,0.3)] transition-colors"
            >
              ✍️ Avaliar no Google Agora
            </a>
          </div>
        </div>
      </section>

      {/* SEÇÃO INSTAGRAM */}
      <section id="instagram" className="py-8 px-4 max-w-[1200px] mx-auto">
        <div className="bg-[#111] text-white rounded-2xl p-6 sm:p-10 shadow-xl border border-slate-800">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-white mb-6">
            📸 Siga nosso Instagram (@emporiodapraia.mercado)
          </h2>
          
          <div 
            ref={instaRef}
            className="flex gap-4 overflow-x-auto scroll-smooth py-3 no-scrollbar cursor-grab active:cursor-grabbing select-none"
          >
            {INSTA_POSTS.map(post => (
              <div 
                key={post.id} 
                className="min-w-[240px] max-w-[240px] h-[240px] bg-[#222] rounded-lg overflow-hidden flex-shrink-0 relative group shadow-md"
              >
                <img 
                  src={post.img} 
                  alt={post.caption} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                  <span className="text-[11px] text-white font-medium leading-tight">{post.caption}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-6">
            <a 
              href="https://instagram.com/emporiodapraia.mercado" 
              target="_blank" 
              rel="noreferrer"
              className="inline-block bg-gradient-to-r from-[#f09433] via-[#dc2743] to-[#bc1888] text-white font-bold text-sm py-3 px-6 rounded-full shadow-[0_4px_10px_rgba(220,39,67,0.3)] hover:opacity-90 transition-opacity"
            >
              ❤️ Seguir no Instagram
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contato" className="bg-[#1a1a1a] text-[#aaa] text-center py-8 px-4 border-t-4 border-[#f39c12] mt-10 text-xs sm:text-sm">
        <div className="max-w-4xl mx-auto space-y-2">
          <p className="text-slate-300">
            📍 <strong>Endereço:</strong> Rua São Pedro Pescador, 270 - Praia do Francês, Mal. Deodoro - AL, 57160-000
          </p>
          <p className="text-slate-300">
            📞 <strong>WhatsApp / Telefone:</strong> (82) 99402-1854
          </p>
          <p className="text-slate-300">
            ⏰ <strong>Horário:</strong> Seg a Sáb das 7h às 19:30h | Domingo das 7h às 18:30h
          </p>
          <p className="pt-4 text-slate-500 border-t border-slate-800">
            © {new Date().getFullYear()} Empório da Praia Mercado - Todos os direitos reservados.
          </p>
        </div>
      </footer>

    </div>
  );
}
