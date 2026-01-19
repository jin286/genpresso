import React, { useState } from "react";
import { motion } from "motion/react";
import { toast } from "sonner@2.0.3";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { useLanguage } from "../../../contexts/LanguageContext";
import { GlassCard } from "../components/GlassCard";
import { 
  GlassTable, 
  GlassTableHeader, 
  GlassTableBody, 
  GlassTableRow, 
  GlassTableHead, 
  GlassTableCell,
  GlassBadge
} from "../../ui/glass-table";
import { GLASS_CARD_STYLE } from "../data";
import { Copy } from "lucide-react";

interface CreditTabProps {
  onOpenDialog: () => void;
}

// Workspace context type for demo
type WorkspaceContext = "personal" | "organization" | "school";
type UserRole = "owner" | "manager" | "member" | "student";

export function CreditTab({ onOpenDialog }: CreditTabProps) {
  const [activeView, setActiveView] = useState<"charge" | "history">("charge");
  const [filterType, setFilterType] = useState<"all" | "charge" | "use">("all");
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const { t } = useLanguage();

  // Demo: workspace context (can be passed from props or global state)
  const [workspaceType] = useState<WorkspaceContext>("personal"); // "personal" | "organization" | "school"
  const [userRole] = useState<UserRole>("member"); // "owner" | "manager" | "member" | "student"
  const [workspaceName] = useState<string>("Seoul High School");
  const [currentBalance] = useState<number>(100); // Demo balance

  const CREDIT_OPTIONS = [300, 500, 1000, 2000, 3000];

  const creditPacks = [
    { amount: 100, price: 1000, pricePerCredit: 10 },
    { amount: 500, price: 5000, pricePerCredit: 10 },
    { amount: 1000, price: 10000, pricePerCredit: 10, popular: true },
    { amount: 2000, price: 20000, pricePerCredit: 10 },
    { amount: 5000, price: 50000, pricePerCredit: 10 },
    { amount: 10000, price: 100000, pricePerCredit: 10 },
  ];

  const calculatePrice = () => {
    if (selectedPackage !== null) {
      const pkg = creditPacks.find(p => p.amount === selectedPackage);
      return pkg?.price || 0;
    }
    if (customAmount) {
      const amount = parseInt(customAmount);
      if (!isNaN(amount) && amount >= 100 && amount <= 10000 && amount % 100 === 0) {
        return amount * 10;
      }
    }
    return 0;
  };

  const historyData = [
    { date: "2025년 12월 17일 17:13", type: "refund", typeLabel: "AI 환불", desc: "AI 사용 취소/환불", amount: 800, balance: 4874, source: "Personal" },
    { date: "2025년 12월 17일 17:12", type: "use", typeLabel: "AI 사용", desc: "AI 기능 사용", amount: -800, balance: 4074, source: "Workspace" },
    { date: "2025년 12월 17일 17:11", type: "use", typeLabel: "AI 사용", desc: "AI 기능 사용", amount: -800, balance: 4874, source: "Personal" },
    { date: "2025년 12월 17일 17:11", type: "use", typeLabel: "AI 사용", desc: "AI 기능 사용", amount: -800, balance: 5674, source: "Workspace" },
    { date: "2025년 12월 17일 17:11", type: "refund", typeLabel: "AI 환불", desc: "AI 사용 취소/환불", amount: 800, balance: 6474, source: "Event" },
    { date: "2025년 12월 17일 17:11", type: "use", typeLabel: "AI 사용", desc: "AI 기능 사용", amount: -80, balance: 5674, source: "Personal" },
    { date: "2025년 12월 17일 17:11", type: "use", typeLabel: "AI 사용", desc: "AI 기능 사용", amount: -800, balance: 5754, source: "Workspace" },
    { date: "2025년 12월 17일 17:10", type: "use", typeLabel: "AI 사용", desc: "AI 기능 사용", amount: -800, balance: 6554, source: "Personal" },
    { date: "2025년 12월 17일 17:08", type: "refund", typeLabel: "AI 환불", desc: "AI 사용 취소/환불", amount: 800, balance: 7354, source: "Event" },
    { date: "2025년 12월 17일 17:07", type: "use", typeLabel: "AI 사용", desc: "AI 기능 사용", amount: -800, balance: 6554, source: "Workspace" },
  ];

  const filteredHistory = historyData.filter(item => {
    if (filterType === "charge") return item.amount > 0;
    if (filterType === "use") return item.amount < 0;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* 크레딧 관리 헤더 */}
      <div className="mb-4">
        <h3 className="font-semibold mb-1">{t('credit.management')}</h3>
        <p className="text-xs text-muted-foreground">{t('credit.managementDescription')}</p>
      </div>

      {/* 탭 시스템 */}
      <div className="flex gap-4 border-b" style={{ borderColor: 'var(--glass-border)' }}>
        <button
          onClick={() => setActiveView("charge")}
          className={`relative pb-2 px-1 transition-colors ${
            activeView === "charge"
              ? 'text-foreground font-medium'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          잔액
          {activeView === "charge" && (
            <motion.div
              layoutId="activeCreditTab"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
        </button>
        <button
          onClick={() => setActiveView("history")}
          className={`relative pb-2 px-1 transition-colors ${
            activeView === "history"
              ? 'text-foreground font-medium'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          내역
          {activeView === "history" && (
            <motion.div
              layoutId="activeCreditTab"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
        </button>
      </div>

      {/* Workspace Context Info Bar (Rule 1) */}
      {activeView === "charge" && (
        <div 
          className="px-4 py-3 rounded-2xl border-[0.5px] border-solid flex items-start gap-3"
          style={{
            ...GLASS_CARD_STYLE,
            backgroundColor: 'var(--agent-message-bg)',
          }}
        >
          <span className="text-base flex-shrink-0">
            {workspaceType === "personal" ? "👤" : "🏫"}
          </span>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-foreground">
              {workspaceType === "personal" 
                ? t('credit.workspacePersonal')
                : workspaceName
              }
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {workspaceType === "personal"
                ? t('credit.workspacePersonalDescription')
                : t('credit.workspaceOrgDescription')
              }
            </p>
          </div>
        </div>
      )}

      {/* 현재 크레딧 */}
      <GlassCard>
        <div>
          <p className="text-xs text-muted-foreground mb-1">{t('credit.currentCredit')}</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-semibold">100</span>
            <span className="text-sm text-muted-foreground">{t('credit.unit')}</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">{t('credit.chargeUnit')}</p>
        </div>
      </GlassCard>

      {activeView === "history" ? (
        /* 충전 내역 */
        <div>
          <div className="mb-4">
            <h3 className="font-semibold mb-1">{t('credit.history')}</h3>
            <p className="text-xs text-muted-foreground">{t('credit.historyDescription')}</p>
          </div>

          {/* 필터 버튼 */}
          <div className="flex gap-2 mb-4">
            <Button
              variant={filterType === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterType("all")}
              className={`h-8 px-4 text-xs border-primary/20 ${
                filterType === "all" 
                  ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                  : "bg-transparent text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              전체
            </Button>
            <Button
              variant={filterType === "charge" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterType("charge")}
              className={`h-8 px-4 text-xs border-primary/20 ${
                filterType === "charge" 
                  ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                  : "bg-transparent text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              충전
            </Button>
            <Button
              variant={filterType === "use" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterType("use")}
              className={`h-8 px-4 text-xs border-primary/20 ${
                filterType === "use" 
                  ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                  : "bg-transparent text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              사용
            </Button>
          </div>

          <GlassTable>
            <GlassTableHeader>
              <GlassTableRow className="hover:bg-transparent">
                <GlassTableHead>날짜</GlassTableHead>
                <GlassTableHead>유형</GlassTableHead>
                <GlassTableHead>내용</GlassTableHead>
                <GlassTableHead className="text-right">금액</GlassTableHead>
                <GlassTableHead className="text-right">잔액</GlassTableHead>
                <GlassTableHead className="text-center">{t('credit.source')}</GlassTableHead>
              </GlassTableRow>
            </GlassTableHeader>
            <GlassTableBody>
              {filteredHistory.map((item, index) => (
                <GlassTableRow key={index}>
                  <GlassTableCell className="font-mono text-muted-foreground group-hover:text-foreground transition-colors text-xs">
                    {item.date}
                  </GlassTableCell>
                  <GlassTableCell>
                    <GlassBadge variant={item.amount > 0 ? "success" : "info"}>
                      {item.typeLabel}
                    </GlassBadge>
                  </GlassTableCell>
                  <GlassTableCell className="text-foreground">
                    {item.desc}
                  </GlassTableCell>
                  <GlassTableCell className={cn(
                    "text-right font-semibold",
                    item.amount > 0 ? 'text-green-500' : 'text-red-500'
                  )}>
                    {item.amount > 0 ? `+${item.amount}` : item.amount}
                  </GlassTableCell>
                  <GlassTableCell className="text-right font-mono text-xs">
                    {item.balance.toLocaleString()}
                  </GlassTableCell>
                  <GlassTableCell className="text-center">
                    <span className={cn(
                      "inline-flex items-center justify-center px-2 py-0.5 rounded-full text-xs font-medium",
                      item.source === "Personal" && "bg-primary/10 text-primary border border-primary/20",
                      item.source === "Workspace" && "bg-secondary/50 text-secondary-foreground border border-secondary",
                      item.source === "Event" && "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                    )}>
                      {item.source === "Personal" ? t('credit.sourcePersonal') : 
                       item.source === "Workspace" ? t('credit.sourceWorkspace') : 
                       t('credit.sourceEvent')}
                    </span>
                  </GlassTableCell>
                </GlassTableRow>
              ))}
            </GlassTableBody>
          </GlassTable>
        </div>
      ) : (
        /* 크레딧 충전 */
        <>
          <div className="space-y-4">
             <div>
               <h3 className="text-lg font-semibold">{t('subscription.creditTopUp')}</h3>
               <p className="text-sm text-muted-foreground">{t('subscription.creditTopUpDescription')}</p>
             </div>
             <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                {CREDIT_OPTIONS.map(amount => (
                  <Button 
                    key={amount} 
                    variant="outline"
                    onClick={() => {
                      setCustomAmount(amount.toString());
                      setSelectedPackage(null);
                    }}
                    className={`h-auto py-3 flex flex-col gap-1 backdrop-blur-sm transition-all duration-200 ${
                      customAmount === amount.toString()
                        ? 'bg-primary/10 border-primary ring-1 ring-primary'
                        : 'bg-primary/5 border-primary/20 hover:bg-primary/10 hover:border-primary/40'
                    }`}
                  >
                    <span className="text-sm font-medium">{amount}{t('credit.unit')}</span>
                    <span className="text-lg font-bold text-primary">₩{(amount * 10).toLocaleString()}</span>
                    <span className="text-[10px] text-muted-foreground">1{t('credit.unit')}당 ₩10</span>
                  </Button>
                ))}
                 <Button 
                   variant="outline" 
                   className="h-auto py-3 flex flex-col gap-1 bg-primary/5 border-primary/20 hover:bg-primary/10 hover:border-primary/40 backdrop-blur-sm transition-all duration-200"
                 >
                    <span className="font-bold text-primary">{t('common.manualInput')}</span>
                    <span className="text-xs text-muted-foreground">{t('subscription.maxAmount', { amount: '10,000' })}</span>
                 </Button>
             </div>

          </div>

          {/* 직접 입력 */}
          <div>
            <h4 className="font-semibold mb-3 text-sm">{t('credit.customAmount')}</h4>
            <div className="flex items-end gap-2">
              <div className="flex-1">
                <Input
                  type="number"
                  placeholder={t('credit.customAmountPlaceholder')}
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setSelectedPackage(null);
                  }}
                  min={100}
                  max={10000}
                  step={100}
                />
              </div>
              <span className="text-sm text-muted-foreground pb-2">{t('credit.unit')}</span>
            </div>
            <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
              <li>• {t('credit.minMaxAmount')}</li>
              <li>• {t('credit.unitAmount')}</li>
              <li>• {t('credit.creditPrice')}</li>
            </ul>
          </div>

          {/* 결제하기 버튼 */}
          <div>
            {/* Rule 2: Conditional Purchase CTA */}
            {workspaceType === "personal" ? (
              <>
                <Button 
                  className="w-full" 
                  size="lg"
                  disabled={calculatePrice() === 0}
                  onClick={() => toast.success(`₩${calculatePrice().toLocaleString()} ${t('credit.payRequested')}`)}
                >
                  ₩{calculatePrice().toLocaleString()} {t('credit.pay')}
                </Button>
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  {t('credit.personalPurchaseHelper')}
                </p>
              </>
            ) : userRole === "owner" ? (
              <>
                <Button 
                  className="w-full" 
                  size="lg"
                  disabled={calculatePrice() === 0}
                  onClick={() => toast.success(`₩${calculatePrice().toLocaleString()} ${t('credit.payRequested')}`)}
                >
                  ₩{calculatePrice().toLocaleString()} {t('credit.pay')}
                </Button>
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  {t('credit.workspacePurchaseHelper')}
                </p>
              </>
            ) : (
              <>
                <Button 
                  className="w-full" 
                  size="lg"
                  disabled
                  variant="outline"
                >
                  ₩{calculatePrice().toLocaleString()} {t('credit.pay')}
                </Button>
                <p className="text-xs text-muted-foreground mt-2 text-center opacity-70">
                  {t('credit.onlyOwnerCanPurchase')}
                </p>
                <Button 
                  className="w-full mt-3" 
                  size="sm"
                  variant="secondary"
                  onClick={() => toast.success(t('credit.copiedToPersonal'))}
                >
                  <Copy className="w-4 h-4 mr-2" />
                  {t('credit.copyToPersonal')}
                </Button>
                <p className="text-xs text-muted-foreground mt-1.5 text-center">
                  {t('credit.copyToPersonalHelper')}
                </p>
              </>
            )}
          </div>

          {/* Rule 3: Zero Credit State (Education-friendly) */}
          {currentBalance === 0 && workspaceType !== "personal" && (
            <div 
              className="px-5 py-4 rounded-2xl border-[0.5px] border-solid"
              style={{
                ...GLASS_CARD_STYLE,
                backgroundColor: 'var(--comment-item-bg)',
                borderColor: 'var(--primary)',
              }}
            >
              <p className="text-sm font-medium text-foreground mb-3">
                {t('credit.workspaceCreditsExhausted')}
              </p>
              <p className="text-xs text-muted-foreground mb-3">
                {t('credit.exhaustedOptions')}
              </p>
              <div className="space-y-2">
                <Button 
                  className="w-full" 
                  size="sm"
                  variant="secondary"
                  onClick={() => toast.success(t('credit.copiedToPersonal'))}
                >
                  <Copy className="w-4 h-4 mr-2" />
                  {t('credit.copyToContinue')}
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  {t('credit.personalCreditSubmission')}
                </p>
              </div>
            </div>
          )}

          {/* 알아두세요 */}
          <div 
            className="px-6 py-4 rounded-2xl border-[0.5px] border-solid"
            style={GLASS_CARD_STYLE}
          >
            <h4 className="font-semibold mb-2 text-sm">{t('settings.subscriptionNotice')}</h4>
            <ul className="space-y-1 text-xs text-muted-foreground">
              <li>• {t('credit.noticeNoRefund')}</li>
              <li>• {t('credit.noticeNoExpiry')}</li>
              <li>• {t('credit.noticePayment')}</li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}