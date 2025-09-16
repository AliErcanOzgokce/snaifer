"use client";

import type React from "react";
import { useState } from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { ArrowLeft, Copy, ExternalLink, Share2, Download, Loader2 } from "lucide-react";

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
  const [tokenName] = useState("Bonk");
  const [tokenSymbol] = useState("BONK");
  const [blockchain] = useState("Solana");
  const [tokenLogo] = useState(
    "https://assets.coingecko.com/coins/images/28600/standard/bonk.jpg?1696527587"
  );

  // Swap state management
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [isSwapping, setIsSwapping] = useState(false);
  const [swapError, setSwapError] = useState("");
  const [walletBalance, setWalletBalance] = useState({
    SOL: 0.0,
    BONK: 0.0,
    USDC: 0.0
  });

  // Enhanced API Response Mock Data for Demo
  const apiResponse = {
    sessionId: "1344aa05-9b5b-4c58-9bab-c4bb7e919d6a",
    tokenId: "27G8MtK7VtTcCHkpASjSDdkWWYfoqT6ggEuKidVJidD4",
    averageScore: 72,
    scores: {
      marketScore: 85,
      securityScore: 78,
      liquidityScore: 92,
      communityScore: 88,
      technicalScore: 65,
      overallScore: 72
    },
    details: [
      { tokenAiScoreDetailTypeId: 1, score: 85, passed: true },
      { tokenAiScoreDetailTypeId: 2, score: 70, passed: true },
      { tokenAiScoreDetailTypeId: 3, score: 80, passed: true },
      { tokenAiScoreDetailTypeId: 4, score: 92, passed: true },
      { tokenAiScoreDetailTypeId: 5, score: 88, passed: true },
      { tokenAiScoreDetailTypeId: 6, score: 65, passed: true },
      { tokenAiScoreDetailTypeId: 7, score: 78, passed: true },
      { tokenAiScoreDetailTypeId: 8, score: 90, passed: true },
      { tokenAiScoreDetailTypeId: 9, score: 75, passed: true }
    ],
    marketData: {
      price: 0.00002345,
      priceChange24h: 12.5,
      volume24h: 24500000,
      marketCap: 1560000000,
      holders: 125000,
      transactions24h: 45000
    },
    securityData: {
      isVerified: true,
      hasAudit: true,
      auditScore: 78,
      contractAge: 365,
      liquidityLocked: true,
      ownershipRenounced: true
    },
    communityData: {
      twitterFollowers: 125000,
      telegramMembers: 45000,
      discordMembers: 32000,
      githubStars: 850,
      socialEngagement: 88,
      developerActivity: 75
    },
    technicalData: {
      contractComplexity: 65,
      codeQuality: 70,
      gasOptimization: 80,
      upgradeability: false,
      proxyContract: false,
      openSource: true
    }
  };

  const overallScore = apiResponse.averageScore;

  // Swap functions
  const handleFromAmountChange = (value: string) => {
    setFromAmount(value);
    if (value && !isNaN(Number(value))) {
      const calculatedAmount = (Number(value) * 0.00002345).toFixed(6);
      setToAmount(calculatedAmount);
    } else {
      setToAmount("");
    }
    setSwapError("");
  };

  const handleSwap = async () => {
    if (!fromAmount || Number(fromAmount) <= 0) {
      setSwapError("Geçerli bir miktar girin");
      return;
    }
    
    if (Number(fromAmount) > walletBalance.SOL) {
      setSwapError("Yetersiz bakiye");
      return;
    }

    setIsSwapping(true);
    setSwapError("");
    
    // Simulate swap
    setTimeout(() => {
      setIsSwapping(false);
      setFromAmount("");
      setToAmount("");
      // Update balances
      setWalletBalance(prev => ({
        ...prev,
        SOL: prev.SOL - Number(fromAmount),
        USDC: prev.USDC + Number(toAmount)
      }));
    }, 2000);
  };

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

  // Enhanced LLM Risk Scores for Demo
  const llmScores: LLMScore[] = [
    {
      name: "Gemini",
      score: 75,
      logo: geminiLogo,
      color: "#4285F4",
      comment: "Yüksek güvenlik skoru: Audit edilmiş kontrat ve güçlü topluluk desteği. Orta risk seviyesi.",
      confidence: 92
    },
    {
      name: "Claude",
      score: 70,
      logo: claudeLogo,
      color: "#7963FF",
      comment: "Teknik altyapı mevcut ancak likidite ve topluluk desteği eksik.",
      confidence: 78
    },
    {
      name: "GPT-4",
      score: 68,
      logo: openaiLogo,
      color: "#10A37F",
      comment: "Güçlü teknik altyapı ve güvenlik önlemleri. Topluluk desteği gelişmekte.",
      confidence: 85
    },
    {
      name: "Grok",
      score: 80,
      logo: grokLogo,
      color: "#FF0000",
      comment: "Meme coin kategorisinde güçlü performans. Yüksek volatilite riski mevcut.",
      confidence: 88
    },
    {
      name: "DeepSeek",
      score: 72,
      logo: deepseekLogo,
      color: "#4A56E2",
      comment: "Solana ekosisteminde popüler token. Likidite ve topluluk metrikleri güçlü.",
      confidence: 90
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
      {/* Raycast Animated Background */}
      {/* <div className="fixed inset-0 z-0">
        <RaycastBackground />
      </div> */}
      
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
                                          <span className="text-xs text-muted-foreground">Bakiye: {walletBalance.SOL.toFixed(4)} SOL</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                          <div className="flex items-center space-x-3">
                                            <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center bg-white/10">
                          <Image 
                                                src="https://assets.coingecko.com/coins/images/4128/standard/solana.png?1696504756"
                                                alt="Solana logo"
                            width={24}
                            height={24}
                                                className="object-contain"
                                                unoptimized
                          />
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
                                              value={fromAmount}
                                              onChange={(e) => handleFromAmountChange(e.target.value)}
                                              className="bg-transparent text-right text-xl font-semibold text-foreground placeholder:text-muted-foreground focus:outline-none w-32"
                                            />
                                            <p className="text-xs text-muted-foreground">≈ ${(Number(fromAmount || 0) * 100).toFixed(2)}</p>
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
                              <span className="text-xs text-muted-foreground">Bakiye: {walletBalance.USDC.toFixed(2)} USDC</span>
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
                                  value={toAmount}
                                  readOnly
                                  className="bg-transparent text-right text-xl font-semibold text-foreground placeholder:text-muted-foreground focus:outline-none w-32"
                                />
                                <p className="text-xs text-muted-foreground">≈ ${(Number(toAmount || 0)).toFixed(2)}</p>
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
                        
                        {/* Error Message */}
                        {swapError && (
                          <div className="mt-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                            <div className="flex items-center space-x-2">
                              <XCircle className="w-4 h-4 text-destructive" />
                              <span className="text-sm text-destructive">{swapError}</span>
                            </div>
                          </div>
                        )}

                        {/* Swap Button */}
                        <Button 
                          onClick={handleSwap}
                          disabled={isSwapping || !fromAmount || Number(fromAmount) <= 0}
                          className="w-full mt-4 h-12 bg-primary hover:bg-primary-hover text-primary-foreground font-semibold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSwapping ? (
                            <div className="flex items-center space-x-2">
                              <Loader2 className="w-4 h-4 animate-spin" />
                              <span>Swapping...</span>
                            </div>
                          ) : (
                            "Swap Yap"
                          )}
                        </Button>
                      </div>
                      
                      {/* DEX Comparison */}
                      <div>
                        <h4 className="text-lg font-semibold text-foreground mb-4">DEX Karşılaştırması</h4>
                        <div className="space-y-3">
                          {[
                            { name: "Jupiter", price: "0.00002345", slippage: "0.1%", liquidity: "High", volume: "$2.4M", isBest: true },
                            { name: "Raydium", price: "0.00002342", slippage: "0.2%", liquidity: "Medium", volume: "$1.8M", isBest: false },
                            { name: "Orca", price: "0.00002340", slippage: "0.3%", liquidity: "High", volume: "$1.2M", isBest: false },
                            { name: "Serum", price: "0.00002338", slippage: "0.4%", liquidity: "Low", volume: "$800K", isBest: false }
                          ].map((dex, index) => (
                            <div key={index} className={`flex items-center justify-between p-3 rounded-lg hover:bg-glass/50 transition-colors ${dex.isBest ? 'bg-success/10 border border-success/20' : 'bg-glass/30'}`}>
                              <div className="flex items-center space-x-3">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${dex.isBest ? 'bg-success/20' : 'bg-accent/50'}`}>
                                  <span className={`text-xs font-bold ${dex.isBest ? 'text-success' : 'text-foreground'}`}>{dex.name[0]}</span>
                                </div>
                                <div>
                                  <div className="flex items-center space-x-2">
                                    <p className="font-medium text-foreground">{dex.name}</p>
                                    {dex.isBest && <Badge className="bg-success/10 text-success border-success/20 text-xs">En İyi</Badge>}
                                  </div>
                                  <p className="text-xs text-muted-foreground">Likidite: {dex.liquidity} • Hacim: {dex.volume}</p>
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
                              <p className={`text-2xl font-bold ${apiResponse.marketData.priceChange24h >= 0 ? 'text-success' : 'text-destructive'}`}>
                                {apiResponse.marketData.priceChange24h >= 0 ? '+' : ''}{apiResponse.marketData.priceChange24h}%
                              </p>
                            </div>
                            <TrendingUp className={`w-8 h-8 ${apiResponse.marketData.priceChange24h >= 0 ? 'text-success' : 'text-destructive'}`} />
                          </div>
                        </div>
                        
                        <div className="bg-glass/50 backdrop-blur-sm border border-border/20 rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-muted-foreground">24s Hacim</p>
                              <p className="text-2xl font-bold text-foreground">${(apiResponse.marketData.volume24h / 1000000).toFixed(1)}M</p>
                            </div>
                            <BarChart3 className="w-8 h-8 text-primary" />
                          </div>
                        </div>
                        
                        <div className="bg-glass/50 backdrop-blur-sm border border-border/20 rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-muted-foreground">Market Cap</p>
                              <p className="text-2xl font-bold text-foreground">${(apiResponse.marketData.marketCap / 1000000).toFixed(1)}M</p>
                            </div>
                            <Activity className="w-8 h-8 text-success" />
                          </div>
                        </div>
                      </div>

                      {/* Additional Market Data */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-glass/50 backdrop-blur-sm border border-border/20 rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-muted-foreground">Token Holders</p>
                              <p className="text-2xl font-bold text-foreground">{apiResponse.marketData.holders.toLocaleString()}</p>
                            </div>
                            <Users className="w-8 h-8 text-primary" />
                          </div>
                        </div>
                        
                        <div className="bg-glass/50 backdrop-blur-sm border border-border/20 rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-muted-foreground">24s İşlemler</p>
                              <p className="text-2xl font-bold text-foreground">{apiResponse.marketData.transactions24h.toLocaleString()}</p>
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
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Users className="w-5 h-5 text-primary" />
                      <span>Topluluk Analizi</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      {/* Social Media Stats */}
                      <div>
                        <h4 className="text-lg font-semibold text-foreground mb-4">Sosyal Medya Metrikleri</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="bg-glass/50 backdrop-blur-sm border border-border/20 rounded-lg p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm text-muted-foreground">Twitter Takipçileri</p>
                                <p className="text-2xl font-bold text-foreground">{apiResponse.communityData.twitterFollowers.toLocaleString()}</p>
                              </div>
                              <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                                <span className="text-blue-500 text-sm">🐦</span>
                              </div>
                            </div>
        </div>

                          <div className="bg-glass/50 backdrop-blur-sm border border-border/20 rounded-lg p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm text-muted-foreground">Telegram Üyeleri</p>
                                <p className="text-2xl font-bold text-foreground">{apiResponse.communityData.telegramMembers.toLocaleString()}</p>
                              </div>
                              <div className="w-8 h-8 rounded-full bg-blue-600/20 flex items-center justify-center">
                                <span className="text-blue-600 text-sm">📱</span>
                              </div>
                            </div>
          </div>

                          <div className="bg-glass/50 backdrop-blur-sm border border-border/20 rounded-lg p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm text-muted-foreground">Discord Üyeleri</p>
                                <p className="text-2xl font-bold text-foreground">{apiResponse.communityData.discordMembers.toLocaleString()}</p>
                              </div>
                              <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                                <span className="text-purple-500 text-sm">💬</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Engagement Metrics */}
                      <div>
                        <h4 className="text-lg font-semibold text-foreground mb-4">Etkileşim Metrikleri</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-glass/50 backdrop-blur-sm border border-border/20 rounded-lg p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm text-muted-foreground">Sosyal Etkileşim</p>
                                <p className="text-2xl font-bold text-success">{apiResponse.communityData.socialEngagement}%</p>
                                <p className="text-xs text-muted-foreground">Yüksek aktivite</p>
                              </div>
                              <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center">
                                <span className="text-success text-sm">📈</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-glass/50 backdrop-blur-sm border border-border/20 rounded-lg p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm text-muted-foreground">Geliştirici Aktivitesi</p>
                                <p className="text-2xl font-bold text-warning">{apiResponse.communityData.developerActivity}%</p>
                                <p className="text-xs text-muted-foreground">Orta seviye</p>
                              </div>
                              <div className="w-8 h-8 rounded-full bg-warning/20 flex items-center justify-center">
                                <span className="text-warning text-sm">👨‍💻</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* GitHub Activity */}
                      <div>
                        <h4 className="text-lg font-semibold text-foreground mb-4">GitHub Aktivitesi</h4>
                        <div className="bg-glass/50 backdrop-blur-sm border border-border/20 rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-muted-foreground">GitHub Stars</p>
                              <p className="text-2xl font-bold text-foreground">{apiResponse.communityData.githubStars.toLocaleString()}</p>
                              <p className="text-xs text-muted-foreground">Açık kaynak proje</p>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-gray-500/20 flex items-center justify-center">
                              <span className="text-gray-500 text-sm">⭐</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Community Health Score */}
                      <div>
                        <h4 className="text-lg font-semibold text-foreground mb-4">Topluluk Sağlık Skoru</h4>
                        <div className="bg-glass/50 backdrop-blur-sm border border-border/20 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-sm text-muted-foreground">Genel Topluluk Skoru</span>
                            <span className="text-2xl font-bold text-success">{apiResponse.scores.communityScore}/100</span>
                          </div>
                          <div className="w-full bg-accent/30 rounded-full h-3 overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-700 bg-gradient-to-r from-success to-success/80"
                              style={{ width: `${apiResponse.scores.communityScore}%` }}
                            />
                          </div>
                          <p className="text-xs text-muted-foreground mt-2">
                            Güçlü topluluk desteği ve aktif sosyal medya varlığı
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="technical" className="mt-6">
                <Card className="bg-glass/90 backdrop-blur-md border border-border/30 shadow-lg shadow-black/20">
            <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Code className="w-5 h-5 text-primary" />
                      <span>Teknik Analiz</span>
              </CardTitle>
            </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      {/* Contract Analysis */}
                      <div>
                        <h4 className="text-lg font-semibold text-foreground mb-4">Kontrat Analizi</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-glass/50 backdrop-blur-sm border border-border/20 rounded-lg p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm text-muted-foreground">Kontrat Karmaşıklığı</p>
                                <p className="text-2xl font-bold text-warning">{apiResponse.technicalData.contractComplexity}/100</p>
                                <p className="text-xs text-muted-foreground">Orta seviye</p>
                              </div>
                              <div className="w-8 h-8 rounded-full bg-warning/20 flex items-center justify-center">
                                <span className="text-warning text-sm">⚙️</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-glass/50 backdrop-blur-sm border border-border/20 rounded-lg p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm text-muted-foreground">Kod Kalitesi</p>
                                <p className="text-2xl font-bold text-success">{apiResponse.technicalData.codeQuality}/100</p>
                                <p className="text-xs text-muted-foreground">İyi</p>
                  </div>
                              <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center">
                                <span className="text-success text-sm">💎</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Security Features */}
                      <div>
                        <h4 className="text-lg font-semibold text-foreground mb-4">Güvenlik Özellikleri</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 bg-glass/30 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <div className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center">
                                <CheckCircle className="w-4 h-4 text-success" />
                  </div>
                              <span className="text-sm font-medium text-foreground">Kontrat Doğrulandı</span>
                            </div>
                            <Badge className="bg-success/10 text-success border-success/20">✓</Badge>
                          </div>
                          
                          <div className="flex items-center justify-between p-3 bg-glass/30 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <div className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center">
                                <CheckCircle className="w-4 h-4 text-success" />
                              </div>
                              <span className="text-sm font-medium text-foreground">Audit Edildi</span>
                            </div>
                            <Badge className="bg-success/10 text-success border-success/20">Skor: {apiResponse.securityData.auditScore}</Badge>
                          </div>
                          
                          <div className="flex items-center justify-between p-3 bg-glass/30 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <div className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center">
                                <CheckCircle className="w-4 h-4 text-success" />
                              </div>
                              <span className="text-sm font-medium text-foreground">Likidite Kilitli</span>
                            </div>
                            <Badge className="bg-success/10 text-success border-success/20">✓</Badge>
                          </div>
                          
                          <div className="flex items-center justify-between p-3 bg-glass/30 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <div className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center">
                                <CheckCircle className="w-4 h-4 text-success" />
                              </div>
                              <span className="text-sm font-medium text-foreground">Sahiplik Devredildi</span>
                            </div>
                            <Badge className="bg-success/10 text-success border-success/20">✓</Badge>
                          </div>
                        </div>
                      </div>

                      {/* Technical Metrics */}
                      <div>
                        <h4 className="text-lg font-semibold text-foreground mb-4">Teknik Metrikler</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-glass/50 backdrop-blur-sm border border-border/20 rounded-lg p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm text-muted-foreground">Gas Optimizasyonu</p>
                                <p className="text-2xl font-bold text-success">{apiResponse.technicalData.gasOptimization}/100</p>
                                <p className="text-xs text-muted-foreground">İyi optimize</p>
                              </div>
                              <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center">
                                <span className="text-success text-sm">⚡</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-glass/50 backdrop-blur-sm border border-border/20 rounded-lg p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm text-muted-foreground">Kontrat Yaşı</p>
                                <p className="text-2xl font-bold text-primary">{apiResponse.securityData.contractAge} gün</p>
                                <p className="text-xs text-muted-foreground">Olgun proje</p>
                              </div>
                              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                                <span className="text-primary text-sm">📅</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Contract Type */}
                      <div>
                        <h4 className="text-lg font-semibold text-foreground mb-4">Kontrat Türü</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 bg-glass/30 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <div className="w-6 h-6 rounded-full bg-warning/20 flex items-center justify-center">
                                <XCircle className="w-4 h-4 text-warning" />
                              </div>
                              <span className="text-sm font-medium text-foreground">Proxy Kontrat</span>
                            </div>
                            <Badge className="bg-warning/10 text-warning border-warning/20">Hayır</Badge>
                          </div>
                          
                          <div className="flex items-center justify-between p-3 bg-glass/30 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <div className="w-6 h-6 rounded-full bg-warning/20 flex items-center justify-center">
                                <XCircle className="w-4 h-4 text-warning" />
                              </div>
                              <span className="text-sm font-medium text-foreground">Güncellenebilir</span>
                            </div>
                            <Badge className="bg-warning/10 text-warning border-warning/20">Hayır</Badge>
                          </div>
                          
                          <div className="flex items-center justify-between p-3 bg-glass/30 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <div className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center">
                                <CheckCircle className="w-4 h-4 text-success" />
                              </div>
                              <span className="text-sm font-medium text-foreground">Açık Kaynak</span>
                            </div>
                            <Badge className="bg-success/10 text-success border-success/20">Evet</Badge>
                          </div>
                        </div>
                      </div>

                      {/* Overall Technical Score */}
                      <div>
                        <h4 className="text-lg font-semibold text-foreground mb-4">Genel Teknik Skor</h4>
                        <div className="bg-glass/50 backdrop-blur-sm border border-border/20 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-sm text-muted-foreground">Teknik Değerlendirme</span>
                            <span className="text-2xl font-bold text-warning">{apiResponse.scores.technicalScore}/100</span>
                          </div>
                          <div className="w-full bg-accent/30 rounded-full h-3 overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-700 bg-gradient-to-r from-warning to-warning/80"
                              style={{ width: `${apiResponse.scores.technicalScore}%` }}
                            />
                          </div>
                          <p className="text-xs text-muted-foreground mt-2">
                            Güvenli kontrat yapısı, iyi kod kalitesi ve güçlü güvenlik önlemleri
                          </p>
                        </div>
                      </div>
                    </div>
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