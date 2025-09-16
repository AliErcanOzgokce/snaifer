"use client";

import type React from "react";
import { useState } from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { ArrowLeft, Copy, ExternalLink, Share2, Download } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Shield,
  Users,
  TrendingUp,
  Code,
  CheckCircle,
  XCircle,
  BarChart3,
  Activity,
  BrainCircuit,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Components
import { Shell, ShellHeader, ShellContent } from "@/components/shell";
import { RiskGauge } from "@/components/risk-gauge";
import { CategoryBars } from "@/components/category-bars";
import { TradingViewChart } from "@/components/tradingview-chart";

// LLM Logoları
import claudeLogo from "@/assets/claude.png";
import openaiLogo from "@/assets/openai.png";
import geminiLogo from "@/assets/gemini.webp";
import grokLogo from "@/assets/grok.png";
import deepseekLogo from "@/assets/deepseek.png";

interface AnalysisResult {
  category: string;
  icon: React.ReactNode;
  score: number;
  maxScore: number;
  criteria: {
    name: string;
    passed: boolean;
    description: string;
    weight: number;
    source?: string;
  }[];
}

interface LLMScore {
  name: string;
  score: number;
  logo: string | StaticImageData;
  color: string;
  comment: string;
  confidence: number;
}

export default function Component() {
  const [tokenAddress] = useState("27G8MtK7VtTcCHkpASjSDdkWWYfoqT6ggEuKidVJidD4");
  const [tokenName] = useState("Solana Token");
  const [tokenSymbol] = useState("SOL");
  const [blockchain] = useState("Solana");
  const [tokenLogo] = useState(
    "https://assets.coingecko.com/coins/images/4128/standard/solana.png?1696504756"
  );

  // Real API Response Mock Data
  const apiResponse = {
    sessionId: "1344aa05-9b5b-4c58-9bab-c4bb7e919d6a",
    tokenId: "27G8MtK7VtTcCHkpASjSDdkWWYfoqT6ggEuKidVJidD4",
    averageScore: 14,
    scores: {
      marketScore: 0,
      securityScore: 20,
      liquidityScore: 0,
      communityScore: 0,
      technicalScore: 50,
      overallScore: 14
    },
    details: [
      { tokenAiScoreDetailTypeId: 1, score: 0, passed: false },
      { tokenAiScoreDetailTypeId: 2, score: 70, passed: true },
      { tokenAiScoreDetailTypeId: 3, score: 80, passed: true },
      { tokenAiScoreDetailTypeId: 4, score: 0, passed: false },
      { tokenAiScoreDetailTypeId: 5, score: 0, passed: false },
      { tokenAiScoreDetailTypeId: 6, score: 0, passed: false },
      { tokenAiScoreDetailTypeId: 7, score: 0, passed: false },
      { tokenAiScoreDetailTypeId: 8, score: 0, passed: false },
      { tokenAiScoreDetailTypeId: 9, score: 0, passed: false }
    ]
  };

  const overallScore = apiResponse.averageScore;

  // Category Data for Bars
  const categoryData = [
    {
      name: "Güvenlik",
      score: apiResponse.scores.securityScore,
      color: "#EF4444",
      description: "Kontrat güvenliği, audit durumu ve güvenlik geçmişi",
      weight: 25
    },
    {
      name: "Likidite", 
      score: apiResponse.scores.liquidityScore,
      color: "#8B5CF6",
      description: "Borsa listeleri, likidite havuzu derinliği ve slippage riski",
      weight: 20
    },
    {
      name: "Topluluk",
      score: apiResponse.scores.communityScore,
      color: "#3B82F6",
      description: "Aktif kullanıcılar, sosyal medya etkileşimi ve geliştirici katılımı",
      weight: 20
    },
    {
      name: "Pazar",
      score: apiResponse.scores.marketScore,
      color: "#10B981",
      description: "Fiyat trendi, işlem hacmi ve piyasa kapitalizasyonu",
      weight: 20
    },
    {
      name: "Teknik",
      score: apiResponse.scores.technicalScore,
      color: "#F59E0B",
      description: "Kontrat kalitesi, açık kaynak durumu ve deploy riskleri",
      weight: 15
    }
  ];

  // LLM Risk Scores
  const llmScores: LLMScore[] = [
    {
      name: "Gemini",
      score: apiResponse.averageScore,
      logo: geminiLogo,
      color: "#4285F4",
      comment: "Düşük risk skoru: Güvenlik açısından iyi ancak piyasa ve topluluk metrikleri zayıf.",
      confidence: 85
    },
    {
      name: "Claude",
      score: Math.max(0, apiResponse.averageScore - 5),
      logo: claudeLogo,
      color: "#7963FF",
      comment: "Teknik altyapı mevcut ancak likidite ve topluluk desteği eksik.",
      confidence: 78
    },
    {
      name: "GPT-4",
      score: Math.max(0, apiResponse.averageScore - 3),
      logo: openaiLogo,
      color: "#10A37F",
      comment: "Kod güvenliği orta seviyede, piyasa performansı düşük.",
      confidence: 82
    },
    {
      name: "Grok",
      score: Math.max(0, apiResponse.averageScore - 8),
      logo: grokLogo,
      color: "#FF0000",
      comment: "Yüksek risk: Piyasa ve topluluk metrikleri kritik seviyede.",
      confidence: 91
    },
    {
      name: "DeepSeek",
      score: Math.max(0, apiResponse.averageScore - 2),
      logo: deepseekLogo,
      color: "#4A56E2",
      comment: "Teknik skor yüksek ancak genel risk değerlendirmesi düşük.",
      confidence: 76
    },
  ];

  // Score history data
  const scoreHistory = [
    { date: "1 Haf", score: 68 },
    { date: "2 Haf", score: 71 },
    { date: "3 Haf", score: 69 },
    { date: "4 Haf", score: 73 },
    { date: "Bu Haf", score: 73 },
  ];

  // Analysis Results
  const analysisResults: AnalysisResult[] = [
    {
      category: "Güvenlik Analizi",
      icon: <Shield className="w-5 h-5" />,
      score: apiResponse.scores.securityScore,
      maxScore: 100,
      criteria: [
        {
          name: "Audit Raporu",
          passed: apiResponse.details[0].passed,
          description: "Üçüncü taraf güvenlik denetimi ve yayınlanan sonuçlar",
          weight: 3,
          source: "https://audit.example.com"
        },
        {
          name: "Açık Kaynak",
          passed: apiResponse.details[1].passed,
          description: "Kontrat kodu kamuya açık ve doğrulanabilir",
          weight: 3,
          source: "https://github.com/example"
        },
        {
          name: "Güvenlik Geçmişi",
          passed: apiResponse.details[2].passed,
          description: "Bilinen güvenlik sorunları, geçmiş exploit'ler veya yamalar",
          weight: 4,
          source: "https://security.example.com"
        },
      ],
    },
    {
      category: "Topluluk Desteği",
      icon: <Users className="w-5 h-5" />,
      score: apiResponse.scores.communityScore,
      maxScore: 100,
      criteria: [
        {
          name: "Aktif Kullanıcılar",
          passed: apiResponse.details[3].passed,
          description: "Aktif holder sayısı ve günlük işlem aktivitesi",
          weight: 3,
          source: "https://explorer.example.com"
        },
        {
          name: "Sosyal Medya Etkileşimi",
          passed: apiResponse.details[4].passed,
          description: "Twitter, Discord, Telegram vb. topluluk aktivitesi",
          weight: 4,
          source: "https://twitter.com/example"
        },
        {
          name: "Geliştirici Katılımı",
          passed: apiResponse.details[5].passed,
          description: "Repository'lerdeki katkıda bulunan sayısı ve güncelleme sıklığı",
          weight: 3,
          source: "https://github.com/example"
        },
      ],
    },
    {
      category: "Likidite Gücü",
      icon: <TrendingUp className="w-5 h-5" />,
      score: apiResponse.scores.liquidityScore,
      maxScore: 100,
      criteria: [
        {
          name: "Borsa Listeleri",
          passed: apiResponse.details[6].passed,
          description: "Token'ı listeleyen merkezi ve merkezi olmayan borsa sayısı",
          weight: 3,
          source: "https://coinmarketcap.com"
        },
        {
          name: "Likidite Havuzu Derinliği",
          passed: apiResponse.details[7].passed,
          description: "Likidite havuzlarının boyutu ve istikrarı",
          weight: 4,
          source: "https://dexscreener.com"
        },
        {
          name: "Slippage Riski",
          passed: apiResponse.details[8].passed,
          description: "Orta boyutlu işlemleri yüksek fiyat etkisi olmadan gerçekleştirme yeteneği",
          weight: 3,
          source: "https://1inch.io"
        },
      ],
    },
  ];

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-destructive";
  };


  return (
    <div className="min-h-screen bg-background relative">
      <Shell showGradient={true} className="mt-25">
        {/* Header */}
        <ShellHeader>
            <div className="flex items-center justify-between">
            {/* Breadcrumb */}
            <div className="flex items-center space-x-2">
              <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300 group">
                <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform duration-300" />
                <span>Ana Sayfa</span>
              </Link>
              <span className="text-muted-foreground">/</span>
              <span className="text-muted-foreground">Tarama</span>
              <span className="text-muted-foreground">/</span>
              <span className="text-foreground font-medium">{tokenSymbol}</span>
            </div>
            
            {/* Actions */}
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" className="hover:bg-accent/50">
                <Share2 className="w-4 h-4 mr-2" />
                Paylaş
              </Button>
              <Button variant="ghost" size="sm" className="hover:bg-accent/50">
                <Download className="w-4 h-4 mr-2" />
                Rapor İndir
              </Button>
            </div>
          </div>
        </ShellHeader>

        <ShellContent className="pt-0">
          {/* Hero Section */}
          <div className="mb-8 md:mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-center">
              {/* Left: Token Info */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3 md:space-x-4">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-glass backdrop-blur-sm border border-border/20 flex items-center justify-center overflow-hidden">
                <Image
                      src={tokenLogo}
                  alt={`${tokenName} logo`}
                      className="rounded-2xl"
                      width={48}
                      height={48}
                  priority
                  unoptimized={tokenLogo.startsWith("http")}
                />
                  </div>
                  <div>
                    <h1 className="text-lg md:text-h2 text-foreground">{tokenName}</h1>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge className="bg-primary/10 text-primary border-primary/20">
                        {blockchain}
                      </Badge>
                      <Badge className="bg-success/10 text-success border-success/20">
                        Doğrulandı
                      </Badge>
                </div>
              </div>
                </div>
                
                {/* Contract Address */}
                <div className="bg-glass/50 backdrop-blur-sm border border-border/20 rounded-xl p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-foreground mb-1">Kontrat Adresi</p>
                      <p className="text-sm font-mono text-foreground truncate">
                        {tokenAddress}
                      </p>
                    </div>
                    <div className="flex items-center space-x-1 ml-3">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-accent/50">
                        <Copy className="w-3 h-3" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-accent/50">
                        <ExternalLink className="w-3 h-3" />
                      </Button>
                </div>
                </div>
                </div>
              </div>

              {/* Center: Risk Score */}
              <div className="flex justify-center order-first lg:order-none">
                <RiskGauge score={overallScore} size="lg" />
              </div>

              {/* Right: Quick Stats */}
              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-2">En Kritik Sorun</p>
                  <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3">
                    <p className="text-sm text-destructive font-medium">
                      Piyasa ve topluluk metrikleri kritik seviyede
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">Güvenlik</p>
                    <p className={`text-base md:text-lg font-bold ${getScoreColor(apiResponse.scores.securityScore)}`}>
                      {apiResponse.scores.securityScore}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">Teknik</p>
                    <p className={`text-base md:text-lg font-bold ${getScoreColor(apiResponse.scores.technicalScore)}`}>
                      {apiResponse.scores.technicalScore}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-8">
            {/* Risk Breakdown */}
            <Card className="bg-glass/90 backdrop-blur-md border border-border/30 shadow-lg shadow-black/20">
              <CardContent className="p-6">
                <CategoryBars data={categoryData} />
          </CardContent>
        </Card>

            {/* Tabs Section */}
            <Tabs defaultValue="security" className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 bg-glass/50 backdrop-blur-sm border border-border/20 rounded-xl h-10 md:h-12">
                <TabsTrigger value="security" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary rounded-lg text-xs md:text-sm">
                  <Shield className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                  <span className="hidden sm:inline">Güvenlik</span>
                  <span className="sm:hidden">Güven</span>
                </TabsTrigger>
                <TabsTrigger value="liquidity" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary rounded-lg text-xs md:text-sm">
                  <TrendingUp className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                  <span className="hidden sm:inline">Likidite</span>
                  <span className="sm:hidden">Likid</span>
                </TabsTrigger>
                <TabsTrigger value="market" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary rounded-lg text-xs md:text-sm">
                  <BarChart3 className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                  Pazar
                </TabsTrigger>
                <TabsTrigger value="community" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary rounded-lg text-xs md:text-sm">
                  <Users className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                  <span className="hidden sm:inline">Topluluk</span>
                  <span className="sm:hidden">Toplum</span>
                </TabsTrigger>
                <TabsTrigger value="technical" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary rounded-lg text-xs md:text-sm">
                  <Code className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                  <span className="hidden sm:inline">Teknik</span>
                  <span className="sm:hidden">Tek</span>
                </TabsTrigger>
              </TabsList>

              {/* Security Tab */}
              <TabsContent value="security" className="mt-6">
                <Card className="bg-glass/90 backdrop-blur-md border border-border/30 shadow-lg shadow-black/20">
            <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Shield className="w-5 h-5 text-primary" />
                      <span>Güvenlik Analizi</span>
              </CardTitle>
            </CardHeader>
                  <CardContent className="space-y-4">
                    {analysisResults[0].criteria.map((criterion, index) => (
                      <div
                        key={index}
                        className="flex items-start space-x-3 p-4 rounded-lg bg-glass/30 backdrop-blur-sm border border-border/10 hover:bg-glass/50 hover:border-border/20 transition-all duration-300"
                      >
                        <div className="flex-shrink-0 mt-0.5">
                          {criterion.passed ? (
                            <CheckCircle className="w-5 h-5 text-success" />
                          ) : (
                            <XCircle className="w-5 h-5 text-destructive" />
                          )}
                  </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="text-sm font-semibold text-foreground">{criterion.name}</h4>
                            <div className="flex items-center space-x-2">
                              <Badge className="bg-accent/50 text-foreground border-border/20 text-xs">
                                {criterion.weight}pt
                  </Badge>
                              {criterion.source && (
                                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                  <ExternalLink className="w-3 h-3" />
                                </Button>
                              )}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {criterion.description}
                  </p>
                </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Other tabs content would go here */}
              <TabsContent value="liquidity" className="mt-6">
                <Card className="bg-glass/90 backdrop-blur-md border border-border/30 shadow-lg shadow-black/20">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <TrendingUp className="w-5 h-5 text-primary" />
                      <span>Likidite & DEX Aggregator</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      {/* DEX Aggregator Interface */}
                      <div className="bg-glass/50 backdrop-blur-sm border border-border/20 rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-6">
                          <h4 className="text-lg font-semibold text-foreground">En İyi Fiyat Bulucu</h4>
                          <Badge className="bg-success/10 text-success border-success/20">
                            Aktif
                          </Badge>
                        </div>
                        
                        {/* Swap Interface */}
                        <div className="space-y-4">
                          {/* From Token */}
                          <div className="bg-accent/20 backdrop-blur-sm border border-border/20 rounded-xl p-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm text-muted-foreground">Satıyorsun</span>
                              <span className="text-xs text-muted-foreground">Bakiye: 1,250.45</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                                  <span className="text-xs font-bold text-primary">SOL</span>
                                </div>
                                <div>
                                  <p className="font-semibold text-foreground">Solana</p>
                                  <p className="text-xs text-muted-foreground">SOL</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <input 
                                  type="number" 
                                  placeholder="0.0" 
                                  className="bg-transparent text-right text-xl font-semibold text-foreground placeholder:text-muted-foreground focus:outline-none w-32"
                                />
                                <p className="text-xs text-muted-foreground">≈ $0.00</p>
                              </div>
                            </div>
                          </div>
                          
                          {/* Swap Arrow */}
                          <div className="flex justify-center">
                            <div className="w-10 h-10 rounded-full bg-accent/50 flex items-center justify-center hover:bg-accent/70 transition-colors cursor-pointer">
                              <TrendingUp className="w-5 h-5 text-foreground rotate-90" />
                            </div>
                          </div>
                          
                          {/* To Token */}
                          <div className="bg-accent/20 backdrop-blur-sm border border-border/20 rounded-xl p-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm text-muted-foreground">Alıyorsun</span>
                              <span className="text-xs text-muted-foreground">Bakiye: 0.00</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 rounded-full bg-warning/20 flex items-center justify-center">
                                  <span className="text-xs font-bold text-warning">USDC</span>
                                </div>
                                <div>
                                  <p className="font-semibold text-foreground">USD Coin</p>
                                  <p className="text-xs text-muted-foreground">USDC</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <input 
                                  type="number" 
                                  placeholder="0.0" 
                                  className="bg-transparent text-right text-xl font-semibold text-foreground placeholder:text-muted-foreground focus:outline-none w-32"
                                />
                                <p className="text-xs text-muted-foreground">≈ $0.00</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Best Route Info */}
                        <div className="mt-4 p-3 bg-success/10 border border-success/20 rounded-lg">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <CheckCircle className="w-4 h-4 text-success" />
                              <span className="text-sm font-medium text-success">En İyi Route Bulundu</span>
                            </div>
                            <span className="text-sm text-success font-semibold">%0.25 slippage</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            Jupiter → Raydium → Orca (3 adım)
                          </p>
                        </div>
                        
                        {/* Swap Button */}
                        <Button className="w-full mt-4 h-12 bg-primary hover:bg-primary-hover text-primary-foreground font-semibold rounded-xl">
                          Swap Yap
                        </Button>
                      </div>
                      
                      {/* DEX Comparison */}
                      <div>
                        <h4 className="text-lg font-semibold text-foreground mb-4">DEX Karşılaştırması</h4>
                        <div className="space-y-3">
                          {[
                            { name: "Jupiter", price: "1.2345", slippage: "0.1%", liquidity: "High" },
                            { name: "Raydium", price: "1.2342", slippage: "0.2%", liquidity: "Medium" },
                            { name: "Orca", price: "1.2340", slippage: "0.3%", liquidity: "High" },
                            { name: "Serum", price: "1.2338", slippage: "0.4%", liquidity: "Low" }
                          ].map((dex, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-glass/30 rounded-lg hover:bg-glass/50 transition-colors">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 rounded-full bg-accent/50 flex items-center justify-center">
                                  <span className="text-xs font-bold text-foreground">{dex.name[0]}</span>
                                </div>
                                <div>
                                  <p className="font-medium text-foreground">{dex.name}</p>
                                  <p className="text-xs text-muted-foreground">Likidite: {dex.liquidity}</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="font-semibold text-foreground">{dex.price}</p>
                                <p className="text-xs text-muted-foreground">{dex.slippage} slippage</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="market" className="mt-6">
                <Card className="bg-glass/90 backdrop-blur-md border border-border/30 shadow-lg shadow-black/20">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <BarChart3 className="w-5 h-5 text-primary" />
                      <span>Piyasa Analizi</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      {/* Price Chart */}
                      <div>
                        <h4 className="text-lg font-semibold text-foreground mb-4">Fiyat Grafiği</h4>
                        <div className="h-96 rounded-lg overflow-hidden bg-accent/10 border border-border/20">
                          <TradingViewChart symbol="BITSTAMP:ETHUSD" />
                        </div>
                      </div>
                      
                      {/* Market Stats */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-glass/50 backdrop-blur-sm border border-border/20 rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-muted-foreground">24s Değişim</p>
                              <p className="text-2xl font-bold text-destructive">-12.5%</p>
                            </div>
                            <TrendingUp className="w-8 h-8 text-destructive" />
                          </div>
                        </div>
                        
                        <div className="bg-glass/50 backdrop-blur-sm border border-border/20 rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-muted-foreground">24s Hacim</p>
                              <p className="text-2xl font-bold text-foreground">$2.4M</p>
                            </div>
                            <BarChart3 className="w-8 h-8 text-primary" />
                          </div>
                        </div>
                        
                        <div className="bg-glass/50 backdrop-blur-sm border border-border/20 rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-muted-foreground">Market Cap</p>
                              <p className="text-2xl font-bold text-foreground">$45.2M</p>
                            </div>
                            <Activity className="w-8 h-8 text-success" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="community" className="mt-6">
                <Card className="bg-glass/90 backdrop-blur-md border border-border/30 shadow-lg shadow-black/20">
                  <CardContent className="p-6">
                    <p className="text-muted-foreground">Topluluk analizi içeriği burada olacak...</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="technical" className="mt-6">
                <Card className="bg-glass/90 backdrop-blur-md border border-border/30 shadow-lg shadow-black/20">
                  <CardContent className="p-6">
                    <p className="text-muted-foreground">Teknik analiz içeriği burada olacak...</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* AI Analysis Section */}
            <Card className="bg-glass/90 backdrop-blur-md border border-border/30 shadow-lg shadow-black/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BrainCircuit className="w-5 h-5 text-primary" />
                  <span>AI Analizi</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {llmScores.map((llm, index) => (
                    <div key={index} className="p-4 rounded-lg bg-glass/30 backdrop-blur-sm border border-border/10 hover:bg-glass/50 transition-all duration-300">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-8 h-8 rounded-full bg-accent/50 flex items-center justify-center overflow-hidden">
                          <Image 
                            src={llm.logo} 
                            alt={`${llm.name} logo`}
                            className="object-contain"
                            width={20}
                            height={20}
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-semibold text-foreground">{llm.name}</h4>
                          <p className="text-xs text-muted-foreground">Güven: %{llm.confidence}</p>
                      </div>
                        <span className={`text-lg font-bold ${getScoreColor(llm.score)}`}>
                            {llm.score}
                          </span>
                        </div>
                      
                      <div className="w-full h-2 bg-accent/30 rounded-full overflow-hidden mb-3">
                          <div 
                          className="h-full rounded-full transition-all duration-700" 
                            style={{ 
                              width: `${llm.score}%`, 
                              backgroundColor: llm.color 
                            }}
                          />
                        </div>
                      
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {llm.comment}
                      </p>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

            {/* Score History */}
            <Card className="bg-glass/90 backdrop-blur-md border border-border/30 shadow-lg shadow-black/20">
            <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="w-5 h-5 text-primary" />
                  <span>Risk Skoru Geçmişi</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={scoreHistory}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1B2230" />
                      <XAxis dataKey="date" stroke="#6B7785" />
                      <YAxis domain={[0, 100]} stroke="#6B7785" />
                      <Tooltip
                        formatter={(value) => [`${value} puan`, "Risk Skoru"]}
                        labelFormatter={(label) => `Dönem: ${label}`}
                        contentStyle={{
                          backgroundColor: '#10141A',
                          border: '1px solid #1B2230',
                          borderRadius: '8px',
                          color: '#E6ECF2'
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="score"
                        stroke="#2F80ED"
                        strokeWidth={3}
                        dot={{ fill: "#2F80ED", strokeWidth: 2, r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
        </div>
        </ShellContent>
      </Shell>
    </div>
  );
}