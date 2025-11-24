"use client"

import { useState } from "react"
import { TrendingUp, Search, ChevronRight, ArrowUpRight, ArrowDownRight, BarChart3, Clock, Users, Flame, Trophy, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Market {
  id: string
  title: string
  category: string
  price: number
  volume: string
  traders: number
  endsAt: string
  trending?: boolean
  change: number
  image: string
  yesPercentage: number
  noPercentage: number
}

interface TrendingMarket {
  id: string
  title: string
  category: string
  volume: string
  change: number
  traders: number
  image: string
  yesPercentage: number
  noPercentage: number
  rank: number
}

const generateMarkets = (): Market[] => {
  const baseMarkets = [
    {
      title: "Bitcoin acima de $100,000 até o final de 2024?",
      category: "Cripto",
      image: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=400&h=300&fit=crop"
    },
    {
      title: "Eleições EUA 2024: Democratas vencem?",
      category: "Política",
      image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=400&h=300&fit=crop"
    },
    {
      title: "Taxa de juros Fed acima de 5% em março?",
      category: "Economia",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=300&fit=crop"
    },
    {
      title: "OpenAI lança GPT-5 em 2024?",
      category: "Tecnologia",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop"
    },
    {
      title: "S&P 500 acima de 5000 pontos até junho?",
      category: "Mercados",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=300&fit=crop"
    },
    {
      title: "Brasil vence Copa América 2024?",
      category: "Esportes",
      image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400&h=300&fit=crop"
    },
    {
      title: "Tesla atinge $300 por ação?",
      category: "Mercados",
      image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400&h=300&fit=crop"
    },
    {
      title: "Inflação EUA abaixo de 2%?",
      category: "Economia",
      image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&h=300&fit=crop"
    },
    {
      title: "Apple lança iPhone dobrável?",
      category: "Tecnologia",
      image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=400&h=300&fit=crop"
    },
    {
      title: "Ethereum acima de $5,000?",
      category: "Cripto",
      image: "https://images.unsplash.com/photo-1622630998477-20aa696ecb05?w=400&h=300&fit=crop"
    }
  ]

  const markets: Market[] = []
  for (let i = 0; i < 40; i++) {
    const base = baseMarkets[i % baseMarkets.length]
    const yesPercentage = Math.floor(Math.random() * 80) + 10
    const noPercentage = 100 - yesPercentage
    
    markets.push({
      id: `${i + 1}`,
      title: base.title,
      category: base.category,
      price: Math.floor(Math.random() * 80000) + 20000,
      volume: `₲${(Math.random() * 15 + 1).toFixed(1)}.000.000.000`,
      traders: Math.floor(Math.random() * 20000) + 5000,
      endsAt: `${Math.floor(Math.random() * 28) + 1} ${['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'][Math.floor(Math.random() * 12)]} 2024`,
      trending: Math.random() > 0.7,
      change: (Math.random() * 10 - 3),
      image: base.image,
      yesPercentage,
      noPercentage
    })
  }
  
  return markets
}

const generateTrendingMarkets = (): TrendingMarket[] => {
  const trendingData = [
    {
      title: "Bitcoin acima de $100,000 até o final de 2024?",
      category: "Cripto",
      image: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800&h=500&fit=crop"
    },
    {
      title: "Eleições EUA 2024: Democratas vencem a presidência?",
      category: "Política",
      image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&h=500&fit=crop"
    },
    {
      title: "OpenAI lança GPT-5 ainda em 2024?",
      category: "Tecnologia",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=500&fit=crop"
    },
    {
      title: "S&P 500 acima de 5000 pontos até junho de 2024?",
      category: "Mercados",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=500&fit=crop"
    },
    {
      title: "Brasil vence a Copa América 2024?",
      category: "Esportes",
      image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&h=500&fit=crop"
    },
    {
      title: "Tesla atinge $300 por ação até o final do ano?",
      category: "Mercados",
      image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&h=500&fit=crop"
    },
    {
      title: "Ethereum acima de $5,000 em 2024?",
      category: "Cripto",
      image: "https://images.unsplash.com/photo-1622630998477-20aa696ecb05?w=800&h=500&fit=crop"
    },
    {
      title: "Apple lança iPhone dobrável em 2024?",
      category: "Tecnologia",
      image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&h=500&fit=crop"
    },
    {
      title: "Taxa de juros Fed acima de 5% em março de 2024?",
      category: "Economia",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=500&fit=crop"
    },
    {
      title: "Inflação EUA abaixo de 2% até o final de 2024?",
      category: "Economia",
      image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&h=500&fit=crop"
    }
  ]

  return trendingData.map((item, i) => ({
    id: `trending-${i + 1}`,
    rank: i + 1,
    title: item.title,
    category: item.category,
    volume: `₲${(Math.random() * 25 + 5).toFixed(1)}.000.000.000`,
    change: Math.random() * 30 + 5,
    traders: Math.floor(Math.random() * 30000) + 10000,
    image: item.image,
    yesPercentage: Math.floor(Math.random() * 80) + 10,
    noPercentage: 0
  })).map(market => ({
    ...market,
    noPercentage: 100 - market.yesPercentage
  }))
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [trendingPeriod, setTrendingPeriod] = useState("day")
  const [currentTrendingIndex, setCurrentTrendingIndex] = useState(0)
  const [markets] = useState(generateMarkets())
  const [trendingMarkets] = useState(generateTrendingMarkets())

  const categories = ["all", "Política", "Cripto", "Economia", "Tecnologia", "Esportes", "Mercados"]

  const filteredMarkets = markets.filter(market => {
    const matchesSearch = market.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || market.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  // Navigation functions for trending carousel
  const goToNextTrending = () => {
    setCurrentTrendingIndex((prev) => 
      prev === trendingMarkets.length - 1 ? 0 : prev + 1
    )
  }

  const goToPrevTrending = () => {
    setCurrentTrendingIndex((prev) => 
      prev === 0 ? trendingMarkets.length - 1 : prev - 1
    )
  }

  const currentTrending = trendingMarkets[currentTrendingIndex]

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <header className="border-b border-[#1a1a1a] bg-[#0f0f0f]/80 backdrop-blur-xl sticky top-0 z-50 shadow-[0_0_30px_rgba(59,130,246,0.15)]">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-[#3b82f6] via-[#60a5fa] to-[#3b82f6] bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(59,130,246,0.6)]">
                Kalshi Clone
              </h1>
              <nav className="hidden md:flex items-center gap-6">
                <a href="#" className="text-sm font-medium text-gray-300 hover:text-[#3b82f6] transition-all duration-300 hover:drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]">Mercados</a>
                <a href="#" className="text-sm font-medium text-gray-300 hover:text-[#3b82f6] transition-all duration-300 hover:drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]">Portfólio</a>
                <a href="#" className="text-sm font-medium text-gray-300 hover:text-[#3b82f6] transition-all duration-300 hover:drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]">Atividade</a>
                <a href="#" className="text-sm font-medium text-gray-300 hover:text-[#3b82f6] transition-all duration-300 hover:drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]">Sobre</a>
              </nav>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" className="rounded-full text-gray-300 hover:text-[#3b82f6] hover:bg-[#3b82f6]/10 border border-transparent hover:border-[#3b82f6]/30">
                Entrar
              </Button>
              <Button size="sm" className="rounded-full bg-gradient-to-r from-[#3b82f6] to-[#60a5fa] text-white font-semibold hover:shadow-[0_0_25px_rgba(59,130,246,0.7)] transition-all duration-300 hover:scale-105">
                Criar Conta
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 md:py-16 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#3b82f6]/5 via-transparent to-transparent pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center space-y-6 relative">
          <Badge className="bg-[#3b82f6]/10 text-[#3b82f6] border border-[#3b82f6]/30 shadow-[0_0_20px_rgba(59,130,246,0.4)]">
            <TrendingUp className="w-3 h-3 mr-1" />
            Mercado de Previsão Regulamentado
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white drop-shadow-[0_0_30px_rgba(59,130,246,0.4)]">
            Negocie o <span className="bg-gradient-to-r from-[#3b82f6] via-[#60a5fa] to-[#8b5cf6] bg-clip-text text-transparent">Futuro</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Invista em eventos futuros. Ganhe dinheiro com suas previsões sobre política, economia, tecnologia e muito mais.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button size="lg" className="rounded-full bg-gradient-to-r from-[#3b82f6] to-[#60a5fa] text-white font-semibold hover:shadow-[0_0_35px_rgba(59,130,246,0.7)] transition-all duration-300 hover:scale-105">
              Começar a Negociar
            </Button>
            <Button size="lg" variant="outline" className="rounded-full border-[#3b82f6]/30 text-[#3b82f6] hover:bg-[#3b82f6]/10 hover:border-[#3b82f6] hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] transition-all duration-300">
              Ver Como Funciona
            </Button>
          </div>
        </div>
      </section>

      {/* Top Trending Section - Large Card Carousel */}
      <section className="container mx-auto px-4 pb-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-[#3b82f6] to-[#60a5fa] rounded-xl shadow-[0_0_20px_rgba(59,130,246,0.4)]">
                <Flame className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Top Trending</h3>
                <p className="text-sm text-gray-400">Mercados mais populares</p>
              </div>
            </div>
            
            <Tabs value={trendingPeriod} onValueChange={setTrendingPeriod} className="w-auto">
              <TabsList className="bg-[#2a2a2a] border border-[#3a3a3a] h-auto p-1 rounded-xl">
                <TabsTrigger 
                  value="day"
                  className="rounded-lg data-[state=active]:bg-[#3b82f6] data-[state=active]:text-white data-[state=active]:shadow-[0_0_15px_rgba(59,130,246,0.5)] text-gray-400 hover:text-gray-200 transition-all px-4 py-2"
                >
                  Dia
                </TabsTrigger>
                <TabsTrigger 
                  value="week"
                  className="rounded-lg data-[state=active]:bg-[#3b82f6] data-[state=active]:text-white data-[state=active]:shadow-[0_0_15px_rgba(59,130,246,0.5)] text-gray-400 hover:text-gray-200 transition-all px-4 py-2"
                >
                  Semana
                </TabsTrigger>
                <TabsTrigger 
                  value="month"
                  className="rounded-lg data-[state=active]:bg-[#3b82f6] data-[state=active]:text-white data-[state=active]:shadow-[0_0_15px_rgba(59,130,246,0.5)] text-gray-400 hover:text-gray-200 transition-all px-4 py-2"
                >
                  Mês
                </TabsTrigger>
                <TabsTrigger 
                  value="year"
                  className="rounded-lg data-[state=active]:bg-[#3b82f6] data-[state=active]:text-white data-[state=active]:shadow-[0_0_15px_rgba(59,130,246,0.5)] text-gray-400 hover:text-gray-200 transition-all px-4 py-2"
                >
                  Ano
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Large Card Carousel */}
          <div className="relative group">
            {/* Navigation Arrows */}
            <button
              onClick={goToPrevTrending}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-[#1a1a1a]/95 hover:bg-[#2a2a2a] border border-[#3a3a3a] hover:border-[#3b82f6]/50 rounded-full p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-xl hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] hover:scale-110"
            >
              <ChevronLeft className="w-6 h-6 text-gray-300 hover:text-[#3b82f6]" />
            </button>

            <button
              onClick={goToNextTrending}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-[#1a1a1a]/95 hover:bg-[#2a2a2a] border border-[#3a3a3a] hover:border-[#3b82f6]/50 rounded-full p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-xl hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] hover:scale-110"
            >
              <ChevronRight className="w-6 h-6 text-gray-300 hover:text-[#3b82f6]" />
            </button>

            {/* Large Card */}
            <Card className="overflow-hidden bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a] shadow-[0_0_50px_rgba(59,130,246,0.2)] rounded-3xl transition-all duration-500">
              {/* Image Section */}
              <div className="relative h-[400px] overflow-hidden">
                <img 
                  src={currentTrending.image} 
                  alt={currentTrending.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
                
                {/* Rank Badge */}
                <div className="absolute top-6 left-6">
                  {currentTrending.rank <= 3 ? (
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-2xl shadow-2xl ${
                      currentTrending.rank === 1 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-yellow-900' :
                      currentTrending.rank === 2 ? 'bg-gradient-to-br from-gray-300 to-gray-500 text-gray-900' :
                      'bg-gradient-to-br from-orange-400 to-orange-600 text-orange-900'
                    }`}>
                      {currentTrending.rank}
                    </div>
                  ) : (
                    <Badge variant="secondary" className="text-xl bg-black/80 backdrop-blur-sm text-white border-[#3a3a3a] rounded-2xl px-4 py-2">
                      #{currentTrending.rank}
                    </Badge>
                  )}
                </div>

                {/* Category and Change */}
                <div className="absolute top-6 right-6 flex flex-col gap-2 items-end">
                  <Badge variant="secondary" className="text-sm bg-black/80 backdrop-blur-sm text-white border-[#3a3a3a] rounded-full px-4 py-1">
                    {currentTrending.category}
                  </Badge>
                  <div className="flex items-center gap-1 text-sm font-medium px-3 py-1 rounded-full backdrop-blur-sm bg-[#10b981]/90 text-white shadow-lg">
                    <ArrowUpRight className="w-4 h-4" />
                    +{currentTrending.change.toFixed(1)}%
                  </div>
                </div>

                {/* Title at Bottom */}
                <div className="absolute bottom-6 left-6 right-6">
                  <h4 className="text-3xl md:text-4xl font-bold text-white drop-shadow-[0_0_20px_rgba(0,0,0,0.8)]">
                    {currentTrending.title}
                  </h4>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-8 space-y-6">
                {/* Stats Row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-[#2a2a2a]/50 rounded-xl p-4 border border-[#3a3a3a]">
                    <div className="text-xs text-gray-500 mb-1">Volume</div>
                    <div className="text-lg font-bold text-white">{currentTrending.volume}</div>
                  </div>
                  <div className="bg-[#2a2a2a]/50 rounded-xl p-4 border border-[#3a3a3a]">
                    <div className="text-xs text-gray-500 mb-1">Traders</div>
                    <div className="text-lg font-bold text-white">{(currentTrending.traders / 1000).toFixed(1)}k</div>
                  </div>
                  <div className="bg-[#2a2a2a]/50 rounded-xl p-4 border border-[#3a3a3a]">
                    <div className="text-xs text-gray-500 mb-1">Variação</div>
                    <div className="text-lg font-bold text-[#10b981]">+{currentTrending.change.toFixed(1)}%</div>
                  </div>
                  <div className="bg-[#2a2a2a]/50 rounded-xl p-4 border border-[#3a3a3a]">
                    <div className="text-xs text-gray-500 mb-1">Ranking</div>
                    <div className="text-lg font-bold text-[#3b82f6]">#{currentTrending.rank}</div>
                  </div>
                </div>

                {/* Trading Options */}
                <div className="grid md:grid-cols-2 gap-4">
                  {/* YES Option */}
                  <div className="bg-[#2a2a2a]/50 rounded-2xl p-6 border border-[#3a3a3a] hover:border-[#10b981]/50 transition-all">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-full bg-[#10b981]" />
                        <span className="text-lg font-semibold text-gray-300">SIM</span>
                      </div>
                      <span className="text-3xl font-bold text-[#10b981]">{currentTrending.yesPercentage}%</span>
                    </div>
                    <Button className="w-full h-12 rounded-xl bg-[#10b981] text-white text-base font-semibold hover:bg-[#059669] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] transition-all">
                      Comprar SIM
                    </Button>
                  </div>

                  {/* NO Option */}
                  <div className="bg-[#2a2a2a]/50 rounded-2xl p-6 border border-[#3a3a3a] hover:border-[#ef4444]/50 transition-all">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-full bg-[#ef4444]" />
                        <span className="text-lg font-semibold text-gray-300">NÃO</span>
                      </div>
                      <span className="text-3xl font-bold text-[#ef4444]">{currentTrending.noPercentage}%</span>
                    </div>
                    <Button className="w-full h-12 rounded-xl bg-[#ef4444] text-white text-base font-semibold hover:bg-[#dc2626] hover:shadow-[0_0_25px_rgba(239,68,68,0.5)] transition-all">
                      Comprar NÃO
                    </Button>
                  </div>
                </div>

                {/* Pagination Dots */}
                <div className="flex items-center justify-center gap-2 pt-4">
                  {trendingMarkets.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTrendingIndex(index)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        index === currentTrendingIndex 
                          ? 'w-8 bg-[#3b82f6] shadow-[0_0_10px_rgba(59,130,246,0.6)]' 
                          : 'w-2 bg-[#3a3a3a] hover:bg-[#4a4a4a]'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="container mx-auto px-4 pb-6">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-[#3b82f6] transition-colors" />
            <Input
              placeholder="Buscar mercados..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 bg-[#1a1a1a] border-[#2a2a2a] text-white placeholder:text-gray-500 focus:border-[#3b82f6] focus:ring-[#3b82f6]/20 focus:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all rounded-full"
            />
          </div>
          
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
            <TabsList className="w-full justify-start overflow-x-auto bg-[#1a1a1a] border border-[#2a2a2a] h-auto p-1 rounded-full">
              {categories.map((cat) => (
                <TabsTrigger 
                  key={cat} 
                  value={cat}
                  className="rounded-full data-[state=active]:bg-[#3b82f6]/20 data-[state=active]:text-[#3b82f6] data-[state=active]:shadow-[0_0_15px_rgba(59,130,246,0.4)] text-gray-400 hover:text-gray-200 transition-all"
                >
                  {cat === "all" ? "Todos" : cat}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </section>

      {/* Markets Grid - 4 columns x 10 rows */}
      <section className="container mx-auto px-4 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-white">Mercados Ativos</h3>
            <Button variant="ghost" size="sm" className="rounded-full text-gray-400 hover:text-[#3b82f6] hover:bg-[#3b82f6]/10">
              Ver Todos
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>

          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredMarkets.map((market) => (
              <Card key={market.id} className="overflow-hidden bg-[#1a1a1a] border-[#2a2a2a] hover:border-[#3b82f6]/50 hover:shadow-[0_0_35px_rgba(59,130,246,0.2)] transition-all duration-300 group cursor-pointer rounded-2xl">
                {/* Image */}
                <div className="relative h-32 overflow-hidden">
                  <img 
                    src={market.image} 
                    alt={market.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-[#1a1a1a]/50 to-transparent" />
                  
                  {/* Badges on image */}
                  <div className="absolute top-2 left-2 flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs bg-black/60 backdrop-blur-sm text-white border-[#3a3a3a] rounded-full px-2 py-0.5">
                      {market.category}
                    </Badge>
                    {market.trending && (
                      <Badge className="bg-[#3b82f6]/80 backdrop-blur-sm text-white border border-[#3b82f6]/30 text-xs shadow-[0_0_15px_rgba(59,130,246,0.4)] rounded-full px-2 py-0.5">
                        <TrendingUp className="w-3 h-3" />
                      </Badge>
                    )}
                  </div>

                  {/* Change indicator */}
                  <div className={`absolute top-2 right-2 flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full backdrop-blur-sm ${market.change > 0 ? 'bg-[#10b981]/80 text-white' : 'bg-[#ef4444]/80 text-white'}`}>
                    {market.change > 0 ? (
                      <ArrowUpRight className="w-3 h-3" />
                    ) : (
                      <ArrowDownRight className="w-3 h-3" />
                    )}
                    {Math.abs(market.change).toFixed(1)}%
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  {/* Title */}
                  <h4 className="font-semibold text-sm text-white group-hover:text-[#3b82f6] transition-colors line-clamp-2 min-h-[2.5rem]">
                    {market.title}
                  </h4>

                  {/* Percentage Options - Inspired by image */}
                  <div className="space-y-2">
                    {/* YES Option */}
                    <div className="flex items-center justify-between bg-[#2a2a2a]/50 rounded-xl p-2 border border-[#3a3a3a] hover:border-[#10b981]/30 transition-colors">
                      <div className="flex items-center gap-2 flex-1">
                        <div className="w-2 h-2 rounded-full bg-[#10b981]" />
                        <span className="text-xs text-gray-300">SIM</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-[#10b981]">{market.yesPercentage}%</span>
                        <Button size="sm" className="h-6 px-3 rounded-full bg-[#10b981] text-white text-xs font-semibold hover:bg-[#059669] hover:shadow-[0_0_15px_rgba(16,185,129,0.5)] transition-all">
                          Comprar
                        </Button>
                      </div>
                    </div>

                    {/* NO Option */}
                    <div className="flex items-center justify-between bg-[#2a2a2a]/50 rounded-xl p-2 border border-[#3a3a3a] hover:border-[#ef4444]/30 transition-colors">
                      <div className="flex items-center gap-2 flex-1">
                        <div className="w-2 h-2 rounded-full bg-[#ef4444]" />
                        <span className="text-xs text-gray-300">NÃO</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-[#ef4444]">{market.noPercentage}%</span>
                        <Button size="sm" className="h-6 px-3 rounded-full bg-[#ef4444] text-white text-xs font-semibold hover:bg-[#dc2626] hover:shadow-[0_0_15px_rgba(239,68,68,0.5)] transition-all">
                          Vender
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Price Display */}
                  <div className="bg-[#2a2a2a]/30 rounded-xl p-2 border border-[#3a3a3a]">
                    <div className="text-xs text-gray-500 mb-0.5">Preço</div>
                    <div className="text-lg font-bold text-[#3b82f6] drop-shadow-[0_0_10px_rgba(59,130,246,0.4)]">
                      ₲{market.price.toLocaleString()}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-[#2a2a2a]">
                    <div className="flex items-center gap-1 hover:text-[#3b82f6] transition-colors">
                      <Users className="w-3 h-3" />
                      <span>{(market.traders / 1000).toFixed(1)}k</span>
                    </div>
                    <div className="flex items-center gap-1 hover:text-[#3b82f6] transition-colors">
                      <Clock className="w-3 h-3" />
                      <span>{market.endsAt}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {filteredMarkets.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">Nenhum mercado encontrado.</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#1a1a1a] bg-[#0f0f0f] mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h5 className="font-semibold mb-4 text-white">Produto</h5>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-[#3b82f6] transition-colors">Mercados</a></li>
                <li><a href="#" className="hover:text-[#3b82f6] transition-colors">Como Funciona</a></li>
                <li><a href="#" className="hover:text-[#3b82f6] transition-colors">Preços</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4 text-white">Empresa</h5>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-[#3b82f6] transition-colors">Sobre</a></li>
                <li><a href="#" className="hover:text-[#3b82f6] transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-[#3b82f6] transition-colors">Carreiras</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4 text-white">Recursos</h5>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-[#3b82f6] transition-colors">Documentação</a></li>
                <li><a href="#" className="hover:text-[#3b82f6] transition-colors">API</a></li>
                <li><a href="#" className="hover:text-[#3b82f6] transition-colors">Suporte</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4 text-white">Legal</h5>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-[#3b82f6] transition-colors">Termos</a></li>
                <li><a href="#" className="hover:text-[#3b82f6] transition-colors">Privacidade</a></li>
                <li><a href="#" className="hover:text-[#3b82f6] transition-colors">Regulamentação</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[#1a1a1a] mt-8 pt-8 text-center text-sm text-gray-500">
            <p>© 2024 Kalshi Clone. Mercado de previsão para fins educacionais.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
